from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt

from app.config import (
    ACCESS_TOKEN_EXPIRE_SECONDS,
    ALGORITHM,
    REFRESH_TOKEN_EXPIRE_SECONDS,
    SECRET_KEY,
)


def _create_token(data: dict, expires_delta: int) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(seconds=expires_delta)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_access_token(username: str) -> str:
    return _create_token(
        {"sub": username, "type": "access"},
        ACCESS_TOKEN_EXPIRE_SECONDS,
    )


def create_refresh_token(username: str) -> str:
    return _create_token(
        {"sub": username, "type": "refresh"},
        REFRESH_TOKEN_EXPIRE_SECONDS,
    )


def decode_token(token: str) -> Optional[dict]:
    """Decode and validate a JWT token. Returns the payload or None if invalid."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
