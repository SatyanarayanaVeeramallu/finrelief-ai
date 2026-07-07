from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.models.loan_model import Loan
from app.schemas.loan_schema import LoanCreate

router = APIRouter()

@router.post("/loan")
def create_loan(loan: LoanCreate, db: Session = Depends(get_db)):
    
    new_loan = Loan(
        loan_name=loan.loan_name,
        outstanding_amount=loan.outstanding_amount,
        emi=loan.emi,
        monthly_income=loan.monthly_income,
        overdue_months=loan.overdue_months
    )

    db.add(new_loan)
    db.commit()
    db.refresh(new_loan)

    return {
        "message": "Loan Saved Successfully",
        "loan_id": new_loan.id
    }

@router.get("/loan")
def get_loans(db: Session = Depends(get_db)):
    loans = db.query(Loan).all()
    return loans
@router.put("/loan/{loan_id}")
def update_loan(
    loan_id: int,
    updated_loan: LoanCreate,
    db: Session = Depends(get_db)
):

    loan = db.query(Loan).filter(Loan.id == loan_id).first()

    if not loan:
        return {"message": "Loan Not Found"}

    loan.loan_name = updated_loan.loan_name
    loan.outstanding_amount = updated_loan.outstanding_amount
    loan.emi = updated_loan.emi
    loan.monthly_income = updated_loan.monthly_income
    loan.overdue_months = updated_loan.overdue_months

    db.commit()

    return {"message": "Loan Updated Successfully"}


@router.delete("/loan/{loan_id}")
def delete_loan(
    loan_id: int,
    db: Session = Depends(get_db)
):

    loan = db.query(Loan).filter(Loan.id == loan_id).first()

    if not loan:
        return {"message": "Loan Not Found"}

    db.delete(loan)
    db.commit()

    return {"message": "Loan Deleted Successfully"}