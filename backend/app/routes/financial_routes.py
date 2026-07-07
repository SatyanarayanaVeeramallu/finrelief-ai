from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.models.loan_model import Loan
from app.services.financial_engine import analyze_financial_health

router = APIRouter()

@router.get("/analyze/{loan_id}")
def analyze_loan(
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

    analysis = analyze_financial_health(
        monthly_income=loan.monthly_income,
        emi=loan.emi
    )

    return {
        "loan_name": loan.loan_name,
        **analysis
    }