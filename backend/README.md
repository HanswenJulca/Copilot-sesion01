# JWT Authentication API — Backend

A **FastAPI** application that demonstrates JWT-based authentication using **Poetry** for dependency management and **Docker** for deployment.

---

## Features

| Endpoint | Method | Description |
|---|---|---|
| `/auth/login` | `POST` | Authenticate and receive access + refresh tokens |
| `/auth/refresh` | `POST` | Exchange a refresh token for a new token pair |
| `/health` | `GET` | Service health check |
| `/docs` | `GET` | Interactive Swagger UI |
| `/redoc` | `GET` | ReDoc documentation |

- Access token expiry: **300 seconds**
- Refresh token expiry: **3600 seconds**
- Algorithm: **HS256**

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- _Or_ [Python 3.11+](https://www.python.org/) & [Poetry](https://python-poetry.org/docs/#installation) for local development

---

## Quick Start with Docker

From the **repository root**:

```bash
docker compose up --build
```

The API will be available at <http://localhost:8000>.

---

## Local Development (without Docker)

```bash
cd backend

# Install dependencies
poetry install

# Run the server
poetry run uvicorn app.main:app --reload --port 8000
```

---

## Usage

### 1. Obtain tokens

```bash
curl -X POST http://localhost:8000/auth/login \
  -d "username=admin&password=admin123"
```

**Response:**

```json
{
  "access_token": "<JWT>",
  "refresh_token": "<JWT>",
  "token_type": "bearer",
  "expires_in": 300
}
```

### 2. Refresh tokens

```bash
curl -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "<refresh_token_from_step_1>"}'
```

**Response:** same structure as `/auth/login`.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `SECRET_KEY` | `change-me-in-production-use-a-long-random-string` | Secret used to sign JWTs — **change in production** |

Set via `docker-compose.yml` or a `.env` file when running locally.

---

## Running Tests

```bash
cd backend
poetry install
poetry run pytest tests/ -v
```

---

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py        # FastAPI application factory
│   ├── config.py      # Configuration constants
│   ├── security.py    # JWT creation / decoding helpers
│   └── routers.py     # /auth endpoints
├── tests/
│   └── test_auth.py
├── Dockerfile
├── pyproject.toml
└── README.md
```
