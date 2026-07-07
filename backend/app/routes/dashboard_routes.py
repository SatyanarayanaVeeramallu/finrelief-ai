from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.models.loan_model import Loan

router = APIRouter()

@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):

    loans = db.query(Loan).all()

    total_loans = len(loans)

    total_outstanding = sum(
        loan.outstanding_amount for loan in loans
    )

    average_emi = (
        sum(loan.emi for loan in loans) / total_loans
        if total_loans > 0 else 0
    )

    return {
        "total_loans": total_loans,
        "total_outstanding": total_outstanding,
        "average_emi": average_emi
    }