from fastapi import FastAPI
from database import engine, Base
from app.routes.loan_routes import router as loan_router
from app.routes.financial_routes import router as financial_router
from app.routes.settlement_routes import router as settlement_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.strategy_routes import router as strategy_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.ai_routes import router as ai_router

from app.models.loan_model import Loan

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

app.include_router(loan_router)
app.include_router(financial_router)
app.include_router(settlement_router)
app.include_router(dashboard_router)
app.include_router(strategy_router)
app.include_router(ai_router)

@app.get("/")
def home():
    return {
        "message": "FinRelief AI Backend Running Successfully"
    }
