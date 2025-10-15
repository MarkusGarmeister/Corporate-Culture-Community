# Corporate Culture Community

A full-stack application for building and managing corporate culture communities.

## Project Structure

```
Corporate-Culture-Community/
├── backend/          # FastAPI backend
├── frontend/         # React Admin frontend
├── docker-compose.yml
└── README.md
```

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **Alembic** - Database migrations
- **PostgreSQL** - Primary database

### Frontend
- **React Admin** - Admin UI framework
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (optional)

### Option 1: Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# Backend API: http://localhost:8000
# Frontend: http://localhost:5173
# API Docs: http://localhost:8000/docs
```

### Option 2: Local Development

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Development

### Backend
- API runs on `http://localhost:8000`
- Interactive docs at `http://localhost:8000/docs`
- Alternative docs at `http://localhost:8000/redoc`

### Frontend
- Dev server runs on `http://localhost:5173`
- Auto-reloads on file changes

## Environment Variables

Copy `.env.example` files in both backend and frontend directories and configure as needed.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

[Your License Here]
