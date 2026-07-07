from sqlalchemy import Column, Integer, String, Float
from database import Base

class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    loan_name = Column(String, nullable=False)
    outstanding_amount = Column(Float, nullable=False)
    emi = Column(Float, nullable=False)
    monthly_income = Column(Float, nullable=False)
    overdue_months = Column(Integer, nullable=False)