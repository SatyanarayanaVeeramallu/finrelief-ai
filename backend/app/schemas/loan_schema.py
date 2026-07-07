from pydantic import BaseModel

class LoanCreate(BaseModel):
    loan_name: str
    outstanding_amount: float
    emi: float
    monthly_income: float
    overdue_months: int

class LoanResponse(LoanCreate):
    id: int

    class Config:
        from_attributes = True