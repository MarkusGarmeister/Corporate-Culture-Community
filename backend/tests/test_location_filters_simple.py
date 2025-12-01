"""
Simplified test for location filtering that tests the actual DRY violation.

This test directly validates that filter queries and count queries are consistent,
which is the core issue we want to address in the refactoring.
"""

import pytest
from sqlmodel import Session, create_engine, SQLModel, select, func
from sqlmodel.pool import StaticPool
from app.models.data_models import Location, User, RoleEnum


@pytest.fixture(name="session")
def session_fixture():
    """Create an in-memory SQLite database for testing"""
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


@pytest.fixture(name="test_user")
def test_user_fixture(session: Session):
    """Create a test user"""
    user = User(
        first_name="Test",
        last_name="User",
        email="test@example.com",
        password="hashed_password",
        city="Berlin",
        company="Test Corp",
        work_position="Developer",
        linkedin_url="https://linkedin.com/test",
        department="Engineering",
        role=RoleEnum.USER.value,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@pytest.fixture(name="sample_locations")
def sample_locations_fixture(session: Session, test_user: User):
    """Create sample locations"""
    locations_data = [
        {"name": "Conference Center Berlin", "city": "Berlin", "capacity": 100, "price_range": 3, "status": "active"},
        {"name": "Event Hall Berlin", "city": "Berlin", "capacity": 200, "price_range": 4, "status": "active"},
        {"name": "Meeting Room Munich", "city": "Munich", "capacity": 50, "price_range": 2, "status": "active"},
        {"name": "Inactive Venue Berlin", "city": "Berlin", "capacity": 150, "price_range": 3, "status": "inactive"},
        {"name": "Small Room Hamburg", "city": "Hamburg", "capacity": 30, "price_range": 1, "status": "active"},
    ]

    locations = []
    for loc_data in locations_data:
        # Add required fields
        loc_data.update({
            "address_line_1": "Test Address",
            "address_line_2": "Suite 100",
            "state": "DE",
            "zip_code": "12345",
            "country": "Germany",
            "created_by": test_user.id,
            "final_rating": 0.0,
        })
        location = Location(**loc_data)
        session.add(location)
        locations.append(location)

    session.commit()
    for loc in locations:
        session.refresh(loc)
    return locations


class TestLocationFilterConsistency:
    """
    Test that demonstrates the DRY violation in location.py.

    This test replicates the filtering logic from location.py:60-82
    to verify that data query and count query produce consistent results.
    """

    def test_no_filters_consistency(self, session: Session, sample_locations):
        """Test consistency with no filters"""
        # This simulates the code in location.py:63-87
        query = select(Location)
        count_query = select(func.count()).select_from(Location)

        # Get results
        locations = list(session.exec(query).all())
        total = session.scalar(count_query)

        # CRITICAL: Count must match actual results
        assert len(locations) == total == 5

    def test_city_filter_consistency(self, session: Session, sample_locations):
        """Test that city filter is applied consistently to both queries"""
        city = "Berlin"

        # Simulate location.py:63-72 (data query with filter)
        query = select(Location)
        if city:
            query = query.where(Location.city == city)

        # Simulate location.py:75-83 (count query with filter)
        count_query = select(func.count()).select_from(Location)
        if city:
            count_query = count_query.where(Location.city == city)

        # Get results
        locations = list(session.exec(query).all())
        total = session.scalar(count_query)

        # CRITICAL: If this fails, the filters diverged
        assert len(locations) == 3
        assert total == 3
        assert len(locations) == total, (
            f"DRY VIOLATION: Data query returned {len(locations)} items "
            f"but count query says {total}. Filters are not consistent!"
        )

    def test_multiple_filters_consistency(self, session: Session, sample_locations):
        """Test that multiple filters are applied consistently"""
        city = "Berlin"
        status = "active"
        min_capacity = 100

        # Data query (like location.py:63-72)
        query = select(Location)
        if status:
            query = query.where(Location.status == status)
        if city:
            query = query.where(Location.city == city)
        if min_capacity:
            query = query.where(Location.capacity >= min_capacity)

        # Count query (like location.py:75-83)
        count_query = select(func.count()).select_from(Location)
        if status:
            count_query = count_query.where(Location.status == status)
        if city:
            count_query = count_query.where(Location.city == city)
        if min_capacity:
            count_query = count_query.where(Location.capacity >= min_capacity)

        # Get results
        locations = list(session.exec(query).all())
        total = session.scalar(count_query)

        # Should match: Berlin + active + capacity >= 100 = 2 locations
        assert len(locations) == 2
        assert total == 2
        assert len(locations) == total, (
            "CRITICAL BUG: Combined filters produced different results "
            "for data query vs count query!"
        )

    def test_simulated_dry_violation(self, session: Session, sample_locations):
        """
        This test demonstrates what happens when filters diverge.

        Imagine a developer adds a new filter to the data query
        but forgets to add it to the count query.
        """
        city = "Berlin"

        # Data query with city filter
        query = select(Location)
        query = query.where(Location.city == city)

        # Count query WITHOUT city filter (bug!)
        count_query = select(func.count()).select_from(Location)
        # Oops! Forgot to add: count_query = count_query.where(Location.city == city)

        # Get results
        locations = list(session.exec(query).all())
        total = session.scalar(count_query)

        # This is the bug! Count says 5 but we only got 3
        assert len(locations) == 3
        assert total == 5
        assert len(locations) != total, (
            "This demonstrates the DRY violation: "
            f"API would say 'Showing {len(locations)} of {total}' which is wrong!"
        )
