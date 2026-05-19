from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import router as auth_router
from app.calculator import router as calculator_router

app = FastAPI(
    title="JWT Authentication API",
    description="FastAPI application demonstrating JWT-based authentication with token refresh.",
    version="0.1.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(calculator_router)


@app.get("/health", tags=["health"], summary="Health check")
def health():
    return {"status": "ok"}
