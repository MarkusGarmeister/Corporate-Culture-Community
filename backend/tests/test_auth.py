"""
Tests for authentication functions before refactoring.

These tests capture the current behavior of authenticate_user
to enable safe refactoring with separation of concerns.
"""

import pytest
from sqlmodel import Session, create_engine, SQLModel
from sqlmodel.pool import StaticPool
from app.models.data_models import User, RoleEnum
from app.auth import authenticate_user, get_password_hash


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


@pytest.fixture(name="active_user")
def active_user_fixture(session: Session):
    """Create an active test user with known credentials"""
    user = User(
        first_name="Active",
        last_name="User",
        email="active@example.com",
        password=get_password_hash("correct_password"),
        city="Berlin",
        company="Test Corp",
        work_position="Developer",
        linkedin_url="https://linkedin.com/active",
        department="Engineering",
        role=RoleEnum.USER.value,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@pytest.fixture(name="pending_user")
def pending_user_fixture(session: Session):
    """Create a pending test user"""
    user = User(
        first_name="Pending",
        last_name="User",
        email="pending@example.com",
        password=get_password_hash("pending_password"),
        city="Munich",
        company="Test Corp",
        work_position="Developer",
        linkedin_url="https://linkedin.com/pending",
        department="Engineering",
        role=RoleEnum.PENDING.value,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@pytest.fixture(name="admin_user")
def admin_user_fixture(session: Session):
    """Create an admin test user"""
    user = User(
        first_name="Admin",
        last_name="User",
        email="admin@example.com",
        password=get_password_hash("admin_password"),
        city="Hamburg",
        company="Test Corp",
        work_position="Admin",
        linkedin_url="https://linkedin.com/admin",
        department="Management",
        role=RoleEnum.ADMIN.value,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


class TestAuthenticateUser:
    """
    Tests for authenticate_user function capturing current behavior.

    These tests ensure we can refactor safely without breaking functionality.
    """

    def test_authenticate_with_valid_credentials(
        self, session: Session, active_user: User
    ):
        """Test successful authentication with correct email and password"""
        result = authenticate_user("active@example.com", "correct_password", session)

        assert result is not False
        assert isinstance(result, User)
        assert result.email == "active@example.com"
        assert result.id == active_user.id

    def test_authenticate_with_wrong_password(
        self, session: Session, active_user: User
    ):
        """Test authentication fails with incorrect password"""
        result = authenticate_user("active@example.com", "wrong_password", session)

        assert result is False

    def test_authenticate_with_nonexistent_email(self, session: Session):
        """Test authentication fails when email doesn't exist"""
        result = authenticate_user("nonexistent@example.com", "any_password", session)

        assert result is False

    def test_authenticate_pending_user(self, session: Session, pending_user: User):
        """Test authentication fails for users with PENDING role"""
        result = authenticate_user("pending@example.com", "pending_password", session)

        assert result is False

    def test_authenticate_admin_user(self, session: Session, admin_user: User):
        """Test authentication succeeds for admin users"""
        result = authenticate_user("admin@example.com", "admin_password", session)

        assert result is not False
        assert isinstance(result, User)
        assert result.role == RoleEnum.ADMIN.value
        assert result.email == "admin@example.com"

    def test_authenticate_with_empty_password(
        self, session: Session, active_user: User
    ):
        """Test authentication fails with empty password"""
        result = authenticate_user("active@example.com", "", session)

        assert result is False

    def test_authenticate_with_empty_email(self, session: Session):
        """Test authentication fails with empty email"""
        result = authenticate_user("", "any_password", session)

        assert result is False

    def test_authenticate_preserves_user_data(
        self, session: Session, active_user: User
    ):
        """Test that authentication returns complete user object"""
        result = authenticate_user("active@example.com", "correct_password", session)

        assert result is not False
        assert result.first_name == "Active"
        assert result.last_name == "User"
        assert result.city == "Berlin"
        assert result.company == "Test Corp"
        assert result.department == "Engineering"


class TestAuthenticateUserEdgeCases:
    """Edge cases and security considerations"""

    def test_case_sensitive_email(self, session: Session, active_user: User):
        """Test that email comparison is case-sensitive (current behavior)"""
        # Note: This documents current behavior. Consider if this should change.
        result = authenticate_user("ACTIVE@EXAMPLE.COM", "correct_password", session)

        # Current implementation is case-sensitive
        assert result is False

    def test_multiple_users_same_password(self, session: Session):
        """Test authentication distinguishes between users with same password"""
        password = "shared_password"

        user1 = User(
            first_name="User",
            last_name="One",
            email="user1@example.com",
            password=get_password_hash(password),
            city="Berlin",
            company="Test",
            work_position="Dev",
            linkedin_url="https://linkedin.com/1",
            department="Eng",
            role=RoleEnum.USER.value,
        )
        user2 = User(
            first_name="User",
            last_name="Two",
            email="user2@example.com",
            password=get_password_hash(password),
            city="Munich",
            company="Test",
            work_position="Dev",
            linkedin_url="https://linkedin.com/2",
            department="Eng",
            role=RoleEnum.USER.value,
        )

        session.add(user1)
        session.add(user2)
        session.commit()
        session.refresh(user1)
        session.refresh(user2)

        # Each user should authenticate correctly
        result1 = authenticate_user("user1@example.com", password, session)
        result2 = authenticate_user("user2@example.com", password, session)

        assert result1.email == "user1@example.com"
        assert result2.email == "user2@example.com"
        assert result1.id != result2.id

    def test_authenticate_returns_false_not_none(self, session: Session):
        """Test that failed authentication returns False, not None"""
        result = authenticate_user("nonexistent@example.com", "password", session)

        assert result is False
        assert result is not None
        assert type(result) is bool
