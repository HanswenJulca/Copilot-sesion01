# Frontend — React + Vite

A clean, professional React single-page application that provides authentication against the FastAPI backend.

## Tech Stack

- **React 18** — UI library
- **Vite** — build tool and dev server (port 3000)
- **React Router v6** — client-side routing
- Plain CSS (inline styles) — no external UI framework

## Project Structure

```
src/
├── App.jsx                  # Root component with routing
├── main.jsx                 # Entry point
├── index.css                # Global reset & base styles
├── pages/
│   ├── Login.jsx            # Login form page
│   └── Welcome.jsx          # Authenticated dashboard page
├── components/
│   └── ProtectedRoute.jsx   # Route guard (redirects to /login if no token)
└── services/
    └── auth.js              # API helpers & sessionStorage utilities
```

## Setup & Running

### Without Docker

```bash
# Install dependencies
cd frontend
npm install

# Start dev server (proxies /auth → http://localhost:8000)
npm run dev
# Open http://localhost:3000

# Production build
npm run build
npm run preview
```

### With Docker (via docker-compose from repo root)

```bash
docker-compose up --build
```

The frontend dev server starts on **port 3000**. The Vite proxy forwards all `/auth/*` requests to the backend at `http://localhost:8000`, avoiding CORS issues during development.

## Authentication Flow

1. User submits the login form → `POST /auth/login` (form-encoded `username` + `password`).
2. On success the backend returns `{ access_token, refresh_token, token_type, expires_in }`.
3. Tokens are stored in **sessionStorage** (cleared automatically when the browser tab closes).
4. `ProtectedRoute` checks for `access_token` in sessionStorage before rendering any guarded page.
5. The username is decoded from the JWT payload (`sub` claim) client-side — no extra API call needed.
6. Logout clears all session keys and redirects to `/login`.

## Available Credentials

| Username | Password   |
|----------|------------|
| admin    | admin123   |

## Routes

| Path       | Description                              |
|------------|------------------------------------------|
| `/login`   | Public — login form                      |
| `/welcome` | Protected — welcome page with logout     |
| `/*`       | Redirects to `/login`                    |
