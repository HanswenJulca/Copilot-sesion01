from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/calculator", tags=["calculator"])


class CalculationRequest(BaseModel):
    num1: float
    num2: float
    operation: str


class CalculationResponse(BaseModel):
    result: float
    operation: str
    expression: str


@router.post("/calculate", response_model=CalculationResponse, summary="Perform basic calculation")
def calculate(request: CalculationRequest):
    """
    Perform basic arithmetic operations.

    Supported operations:
    - `add` or `+` - Addition
    - `subtract` or `-` - Subtraction
    - `multiply` or `*` - Multiplication
    - `divide` or `/` - Division
    """
    num1 = request.num1
    num2 = request.num2
    operation = request.operation.lower()

    # Map operation names to symbols
    operation_map = {
        "add": "+",
        "+": "+",
        "subtract": "-",
        "-": "-",
        "multiply": "*",
        "*": "*",
        "divide": "/",
        "/": "/"
    }

    if operation not in operation_map:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid operation. Supported operations: add, subtract, multiply, divide"
        )

    symbol = operation_map[operation]

    try:
        if operation in ["add", "+"]:
            result = num1 + num2
        elif operation in ["subtract", "-"]:
            result = num1 - num2
        elif operation in ["multiply", "*"]:
            result = num1 * num2
        elif operation in ["divide", "/"]:
            if num2 == 0:
                raise HTTPException(
                    status_code=400,
                    detail="Cannot divide by zero"
                )
            result = num1 / num2

        expression = f"{num1} {symbol} {num2} = {result}"
        return CalculationResponse(result=result, operation=symbol, expression=expression)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error performing calculation: {str(e)}"
        )
