import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestCalculator:
    def test_addition(self):
        resp = client.post(
            "/calculator/calculate",
            json={"num1": 5, "num2": 3, "operation": "add"}
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["result"] == 8
        assert body["operation"] == "+"
        assert "5" in body["expression"]
        assert "3" in body["expression"]
        assert "8" in body["expression"]

    def test_subtraction(self):
        resp = client.post(
            "/calculator/calculate",
            json={"num1": 10, "num2": 4, "operation": "subtract"}
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["result"] == 6
        assert body["operation"] == "-"

    def test_multiplication(self):
        resp = client.post(
            "/calculator/calculate",
            json={"num1": 6, "num2": 7, "operation": "multiply"}
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["result"] == 42
        assert body["operation"] == "*"

    def test_division(self):
        resp = client.post(
            "/calculator/calculate",
            json={"num1": 20, "num2": 4, "operation": "divide"}
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["result"] == 5
        assert body["operation"] == "/"

    def test_division_by_zero(self):
        resp = client.post(
            "/calculator/calculate",
            json={"num1": 10, "num2": 0, "operation": "divide"}
        )
        assert resp.status_code == 400
        assert "Cannot divide by zero" in resp.json()["detail"]

    def test_invalid_operation(self):
        resp = client.post(
            "/calculator/calculate",
            json={"num1": 5, "num2": 3, "operation": "power"}
        )
        assert resp.status_code == 400
        assert "Invalid operation" in resp.json()["detail"]

    def test_operation_with_symbols(self):
        resp = client.post(
            "/calculator/calculate",
            json={"num1": 15, "num2": 5, "operation": "+"}
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["result"] == 20

    def test_negative_numbers(self):
        resp = client.post(
            "/calculator/calculate",
            json={"num1": -5, "num2": 3, "operation": "add"}
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["result"] == -2

    def test_decimal_numbers(self):
        resp = client.post(
            "/calculator/calculate",
            json={"num1": 5.5, "num2": 2.5, "operation": "multiply"}
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["result"] == 13.75
