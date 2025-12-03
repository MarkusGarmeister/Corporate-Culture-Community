# 🏢 Corporate Culture Community

A web application for corporate community members to share and rate locations for events like venues, catering services, and team activities. Users need admin approval before they can access the platform.

**Live Demo:** https://joinculture.co

---

## ✨ Features

- **👥 User Management**: Registration with admin approval workflow
- **📍 Location Sharing**: Add and discover venues, catering services, event spaces
- **⭐ Rating System**: Rate locations from 1-5 stars with reviews
- **🏢 Department Filtering**: Find locations by department or category
- **🔐 Role-Based Access**: Admin, User, Ambassador, and Pending roles
- **📊 Admin Dashboard**: Approve users, manage roles, moderate content
- **🔍 Search & Filter**: Find locations by city, labels, and departments
- **📧 Email Notifications**: Automated emails for registration and approval

See [THREAT_MODEL.md](./THREAT_MODEL.md) for security analysis.

---

## 🛠️ Tech Stack

### Backend

- **FastAPI** - Modern Python web framework
- **SQLModel** - SQL databases with Python (built on SQLAlchemy + Pydantic)
- **Alembic** - Database migrations
- **PostgreSQL** - Primary database
- **pwdlib** - Password hashing (Argon2)
- **SlowAPI** - Rate limiting
- **aiosmtplib** - Async email sending

### Frontend

- **React 18** - UI library
- **React Admin** - Admin UI framework
- **Vite** - Build tool and dev server
- **Material-UI** - Component library

### Deployment

- **Docker** - Containerization
- **Fly.io** - Cloud hosting

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Node.js 22+
- Poetry ([Installation](https://python-poetry.org/docs/#installation))
- Docker (for PostgreSQL, optional)

---

### 1. Start PostgreSQL

**Option A: Using Docker (Recommended)**

```bash
docker run --name culture-postgres \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=culture_db \
  -p 5432:5432 \
  -d postgres
```

**Option B: Use Local PostgreSQL**

- Make sure PostgreSQL is installed and running
- Create a database: `createdb culture_db`

---

### 2. Backend Setup

```bash
cd backend

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and SMTP settings

# Install dependencies
poetry install

# Run migrations
poetry run alembic upgrade head

# Start backend server
poetry run uvicorn main:app --reload
```

**Backend runs at:** http://localhost:8000
**API Docs:** http://localhost:8000/docs

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs at:** http://localhost:5173

## 🔒 Security Features

- **Authentication**: JWT-based authentication with secure password hashing (pwdlib)
- **Authorization**: Role-based access control (Admin, User, Pending, Ambassador)
- **Rate Limiting**:
  - Login: 5 attempts per minute
  - Registration: 3 attempts per hour
- **Input Sanitization**: XSS prevention on user inputs (utils/sanitization.py)
- **Audit Logging**: Security events tracked with timestamps and user IDs
- **SQL Injection Protection**: SQLModel/SQLAlchemy parameterized queries
- **HTTPS**: All connections encrypted in production

See [THREAT_MODEL_SIMPLE.md](./THREAT_MODEL_SIMPLE.md) for detailed STRIDE threat analysis.

## ✨ Clean Code

**Bad Smells**

- repeated code
- functions too long or too many arguments
- naming of functions or variables is unclear
- code which is not used (also commented)
- comments either not necessary or being used as deodorant

**Principals**

- DRY: Do Not Repeat Yourself
- SRP: Single Responsibility
- Good Naming
- Clear Interface
- Modularity: Cohesion/Coupling
- Encapsulation: hiding implementation

**Tools**

- **Backend**:

  - Pylint
  - Black
  - Pytest

- **Frontend**:
  - ESLint
  - Prettier
  - Vitest

---

## 📄 License

This project is for academic/educational purposes.

---

## 👤 Author

Markus Garmeister

---

## 🙏 Acknowledgments

- Built with [FastAPI](https://fastapi.tiangolo.com/)
- UI powered by [React Admin](https://marmelab.com/react-admin/)
- Database ORM: [SQLModel](https://sqlmodel.tiangolo.com/)
- Password Hashing: [pwdlib](https://github.com/frankie567/pwdlib)
- Rate Limiting: [SlowAPI](https://github.com/laurentS/slowapi)
