import os

SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production-use-a-long-random-string")
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS: int = 300
REFRESH_TOKEN_EXPIRE_SECONDS: int = 3600

# ⚠️  Demo credentials — for illustrative purposes ONLY.
# In a real application load these from environment variables or a secrets manager
# and NEVER hard-code credentials in source code.
DEMO_USERNAME: str = os.getenv("DEMO_USERNAME", "admin")
DEMO_PASSWORD: str = os.getenv("DEMO_PASSWORD", "admin123")
