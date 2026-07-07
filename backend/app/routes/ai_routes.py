from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.models.loan_model import Loan
from app.services.gemini_service import generate_negotiation_letter

router = APIRouter()

@router.get("/generate-letter/{loan_id}")
def generate_letter(
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

    letter = generate_negotiation_letter(
        loan.loan_name,
        loan.outstanding_amount,
        loan.monthly_income,
        loan.emi,
        loan.overdue_months
    )

    return {
        "loan_name": loan.loan_name,
        "letter": letter
    }