from fastapi import APIRouter

router = APIRouter()

@router.get("/settlement")
def settlement():

    return {
        "stress_level": "High",
        "recommended_settlement": "40%-60%",
        "status": "Eligible For Negotiation"
    }