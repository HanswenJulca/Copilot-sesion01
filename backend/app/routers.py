from fastapi import APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends
from pydantic import BaseModel

from app.config import ACCESS_TOKEN_EXPIRE_SECONDS, DEMO_PASSWORD, DEMO_USERNAME
from app.security import create_access_token, create_refresh_token, decode_token

router = APIRouter(prefix="/auth", tags=["auth"])


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS


class RefreshRequest(BaseModel):
    refresh_token: str


@router.post("/login", response_model=TokenResponse, summary="Obtain JWT tokens")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Authenticate with **username** and **password**.

    - username: `admin`
    - password: `admin123`

    Returns an access token (valid 300 s) and a refresh token (valid 3600 s).
    """
    if form_data.username != DEMO_USERNAME or form_data.password != DEMO_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(form_data.username)
    refresh_token = create_refresh_token(form_data.username)
    return TokenResponse(access_token=access_token, refresh_token=refresh_token)


@router.post("/refresh", response_model=TokenResponse, summary="Refresh access token")
def refresh(body: RefreshRequest):
    """
    Exchange a valid **refresh token** for a new pair of tokens.
    """
    payload = decode_token(body.refresh_token)
    if payload is None or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    username: str = payload.get("sub", "")
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: missing subject claim",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(username)
    new_refresh_token = create_refresh_token(username)
    return TokenResponse(access_token=access_token, refresh_token=new_refresh_token)
