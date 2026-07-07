from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.models.loan_model import Loan

router = APIRouter()

@router.get("/negotiation-strategy/{loan_id}")
def negotiation_strategy(
    loan_id: int,
    db: Session = Depends(get_db)
):

    loan = db.query(Loan).filter(
        Loan.id == loan_id
    ).first()

    if not loan:
        return {
            "message": "Loan Not Found"
        }

    emi_ratio = (loan.emi / loan.monthly_income) * 100

    if emi_ratio >= 50:
        priority = "High"
        settlement = "40%-60%"
        action = "Immediate Negotiation"

    elif emi_ratio >= 30:
        priority = "Medium"
        settlement = "20%-40%"
        action = "Settlement Discussion"

    else:
        priority = "Low"
        settlement = "10%-20%"
        action = "Regular Repayment"

    return {
        "loan_name": loan.loan_name,
        "priority": priority,
        "recommended_settlement": settlement,
        "recommended_action": action,
        "strategy": f"Request settlement due to {priority.lower()} debt stress."
    }