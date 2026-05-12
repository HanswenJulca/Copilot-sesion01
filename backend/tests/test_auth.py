import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def _login(username: str = "admin", password: str = "admin123") -> dict:
    response = client.post(
        "/auth/login",
        data={"username": username, "password": password},
    )
    return response


class TestLogin:
    def test_valid_credentials_returns_tokens(self):
        resp = _login()
        assert resp.status_code == 200
        body = resp.json()
        assert "access_token" in body
        assert "refresh_token" in body
        assert body["token_type"] == "bearer"
        assert body["expires_in"] == 300

    def test_wrong_password_returns_401(self):
        resp = _login(password="wrong")
        assert resp.status_code == 401

    def test_wrong_username_returns_401(self):
        resp = _login(username="hacker")
        assert resp.status_code == 401


class TestRefresh:
    def test_valid_refresh_token_returns_new_tokens(self):
        login_resp = _login()
        refresh_token = login_resp.json()["refresh_token"]

        resp = client.post("/auth/refresh", json={"refresh_token": refresh_token})
        assert resp.status_code == 200
        body = resp.json()
        assert "access_token" in body
        assert "refresh_token" in body

    def test_invalid_refresh_token_returns_401(self):
        resp = client.post("/auth/refresh", json={"refresh_token": "not-a-token"})
        assert resp.status_code == 401

    def test_access_token_cannot_be_used_as_refresh(self):
        login_resp = _login()
        access_token = login_resp.json()["access_token"]

        resp = client.post("/auth/refresh", json={"refresh_token": access_token})
        assert resp.status_code == 401


class TestHealth:
    def test_health_check(self):
        resp = client.get("/health")
        assert resp.status_code == 200
        assert resp.json() == {"status": "ok"}
