"""
Tests for user endpoint database operations before refactoring.

These tests verify the database commit/rollback behavior works correctly
before we refactor to use DatabaseService.safe_commit().
"""

import pytest
from sqlmodel import Session, create_engine, SQLModel
from sqlmodel.pool import StaticPool
from fastapi import HTTPException
from unittest.mock import AsyncMock, patch
from app.models.data_models import User, RoleEnum
from app.routes.user import (
    update_user,
    delete_user,
    set_password,
    update_password,
    approve_user,
)
from app.routes.dto.user import UserUpdateDTO, SetPasswordDTO


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
        password="hashed_password_123",
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


@pytest.fixture(name="admin_user")
def admin_user_fixture(session: Session):
    """Create an admin user"""
    admin = User(
        first_name="Admin",
        last_name="User",
        email="admin@example.com",
        password="hashed_admin_password",
        city="Munich",
        company="Admin Corp",
        work_position="Admin",
        linkedin_url="https://linkedin.com/admin",
        department="Management",
        role=RoleEnum.ADMIN.value,
    )
    session.add(admin)
    session.commit()
    session.refresh(admin)
    return admin


@pytest.fixture(name="pending_user")
def pending_user_fixture(session: Session):
    """Create a pending user"""
    user = User(
        first_name="Pending",
        last_name="User",
        email="pending@example.com",
        password="hashed_password_456",
        city="Hamburg",
        company="Pending Corp",
        work_position="Developer",
        linkedin_url="https://linkedin.com/pending",
        department="Engineering",
        role=RoleEnum.PENDING.value,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


class TestUpdateUser:
    """Tests for update_user endpoint database operations"""

    def test_update_user_success(self, session: Session, test_user: User):
        """Test successful user update commits to database"""
        update_data = UserUpdateDTO(
            first_name="Updated",
            last_name="Name",
            city="Frankfurt",
        )

        result = update_user(
            user_id=test_user.id,
            updated_user=update_data,
            session=session,
            current_user=test_user,
        )

        assert result.first_name == "Updated"
        assert result.last_name == "Name"
        assert result.city == "Frankfurt"
        # Verify it's actually in the database
        db_user = session.get(User, test_user.id)
        assert db_user.first_name == "Updated"

    def test_update_user_not_found_as_admin(self, session: Session, admin_user: User):
        """Test admin updating nonexistent user raises 404"""
        update_data = UserUpdateDTO(first_name="Test")

        with pytest.raises(HTTPException) as exc_info:
            update_user(
                user_id=99999,
                updated_user=update_data,
                session=session,
                current_user=admin_user,  # Admin bypasses permission check
            )

        assert exc_info.value.status_code == 404
        assert exc_info.value.detail == "User not found"

    def test_update_user_permission_denied_non_admin(
        self, session: Session, test_user: User, admin_user: User
    ):
        """Test non-admin cannot update other users"""
        update_data = UserUpdateDTO(first_name="Hacker")

        with pytest.raises(HTTPException) as exc_info:
            update_user(
                user_id=admin_user.id,
                updated_user=update_data,
                session=session,
                current_user=test_user,  # Regular user trying to update admin
            )

        assert exc_info.value.status_code == 403

    def test_update_user_role_requires_admin(self, session: Session, test_user: User):
        """Test changing role requires admin permissions"""
        update_data = UserUpdateDTO(role=RoleEnum.ADMIN.value)

        with pytest.raises(HTTPException) as exc_info:
            update_user(
                user_id=test_user.id,
                updated_user=update_data,
                session=session,
                current_user=test_user,  # Regular user trying to promote self
            )

        assert exc_info.value.status_code == 403
        assert "permission to change user roles" in exc_info.value.detail

    def test_update_user_role_as_admin(
        self, session: Session, test_user: User, admin_user: User
    ):
        """Test admin can successfully change user roles"""
        update_data = UserUpdateDTO(role=RoleEnum.ADMIN.value)

        result = update_user(
            user_id=test_user.id,
            updated_user=update_data,
            session=session,
            current_user=admin_user,
        )

        assert result.role == RoleEnum.ADMIN.value
        # Verify in database
        db_user = session.get(User, test_user.id)
        assert db_user.role == RoleEnum.ADMIN.value


class TestDeleteUser:
    """Tests for delete_user endpoint database operations"""

    def test_delete_user_success(self, session: Session, test_user: User):
        """Test successful user deletion"""
        user_id = test_user.id

        delete_user(
            user_id=user_id,
            session=session,
            current_user=test_user,  # Self-deletion
        )

        # Verify user is deleted from database
        deleted_user = session.get(User, user_id)
        assert deleted_user is None

    def test_delete_user_not_found_as_admin(self, session: Session, admin_user: User):
        """Test admin deleting nonexistent user raises 404"""
        with pytest.raises(HTTPException) as exc_info:
            delete_user(
                user_id=99999,
                session=session,
                current_user=admin_user,  # Admin bypasses permission check
            )

        assert exc_info.value.status_code == 404
        assert exc_info.value.detail == "User not found"

    def test_delete_user_permission_denied(
        self, session: Session, test_user: User, admin_user: User
    ):
        """Test non-admin cannot delete other users"""
        with pytest.raises(HTTPException) as exc_info:
            delete_user(
                user_id=admin_user.id,
                session=session,
                current_user=test_user,
            )

        assert exc_info.value.status_code == 403

    def test_admin_can_delete_other_users(
        self, session: Session, test_user: User, admin_user: User
    ):
        """Test admin can delete other users"""
        user_id = test_user.id

        delete_user(
            user_id=user_id,
            session=session,
            current_user=admin_user,
        )

        # Verify deletion
        deleted_user = session.get(User, user_id)
        assert deleted_user is None


class TestSetPassword:
    """Tests for set_password endpoint database operations"""

    def test_set_password_success(self, session: Session):
        """Test successful password set with valid token"""
        # Create user with reset token
        user = User(
            first_name="Reset",
            last_name="User",
            email="reset@example.com",
            password="old_hashed_password",
            city="Berlin",
            company="Test",
            work_position="Dev",
            linkedin_url="https://linkedin.com",
            department="Eng",
            role=RoleEnum.USER.value,
            password_reset_token="valid_token_123",
        )
        session.add(user)
        session.commit()
        session.refresh(user)

        password_data = SetPasswordDTO(
            token="valid_token_123",
            password="new_secure_password",
        )

        result = set_password(data=password_data, session=session)

        assert result.id == user.id
        # Verify password changed and token cleared
        db_user = session.get(User, user.id)
        assert db_user.password != "old_hashed_password"
        assert db_user.password_reset_token is None

    def test_set_password_invalid_token(self, session: Session):
        """Test set_password with invalid token raises 400"""
        password_data = SetPasswordDTO(
            token="invalid_token_xyz",
            password="new_password",
        )

        with pytest.raises(HTTPException) as exc_info:
            set_password(data=password_data, session=session)

        assert exc_info.value.status_code == 400
        assert exc_info.value.detail == "Invalid or expired token"


class TestUpdatePassword:
    """Tests for update_password endpoint database operations"""

    def test_update_password_success(self, session: Session, test_user: User):
        """Test successful password update for authenticated user"""
        old_password = test_user.password

        result = update_password(
            new_password="brand_new_password",
            session=session,
            current_user=test_user,
        )

        assert result.id == test_user.id
        # Verify password changed in database
        db_user = session.get(User, test_user.id)
        assert db_user.password != old_password


class TestApproveUser:
    """Tests for approve_user endpoint database operations"""

    @pytest.mark.asyncio
    async def test_approve_user_success(
        self, session: Session, pending_user: User, admin_user: User
    ):
        """Test successful user approval by admin"""
        # Mock the email sending
        with patch("app.routes.user.AsyncSMTPClient") as mock_smtp:
            mock_smtp.return_value.__aenter__ = AsyncMock()
            mock_smtp.return_value.__aexit__ = AsyncMock()
            mock_instance = AsyncMock()
            mock_instance.send_message = AsyncMock()
            mock_smtp.return_value.__aenter__.return_value = mock_instance

            result = await approve_user(
                user_id=pending_user.id,
                session=session,
                current_user=admin_user,
            )

            assert result.role == RoleEnum.USER.value
            assert result.password_reset_token is not None  # Token generated
            # Verify in database
            db_user = session.get(User, pending_user.id)
            assert db_user.role == RoleEnum.USER.value

    @pytest.mark.asyncio
    async def test_approve_user_not_found(self, session: Session, admin_user: User):
        """Test approving nonexistent user raises 404"""
        with pytest.raises(HTTPException) as exc_info:
            await approve_user(
                user_id=99999,
                session=session,
                current_user=admin_user,
            )

        assert exc_info.value.status_code == 404
        assert exc_info.value.detail == "User not found"

    @pytest.mark.asyncio
    async def test_approve_user_requires_admin(
        self, session: Session, pending_user: User, test_user: User
    ):
        """Test non-admin cannot approve users"""
        with pytest.raises(HTTPException) as exc_info:
            await approve_user(
                user_id=pending_user.id,
                session=session,
                current_user=test_user,  # Regular user, not admin
            )

        assert exc_info.value.status_code == 403
        assert "Only admin users can approve" in exc_info.value.detail
