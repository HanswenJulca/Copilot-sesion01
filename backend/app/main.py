from fastapi import FastAPI

from app.routers import router as auth_router

app = FastAPI(
    title="JWT Authentication API",
    description="FastAPI application demonstrating JWT-based authentication with token refresh.",
    version="0.1.0",
)

app.include_router(auth_router)


@app.get("/health", tags=["health"], summary="Health check")
def health():
    return {"status": "ok"}
