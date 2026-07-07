def analyze_financial_health(monthly_income, emi):

    emi_ratio = round((emi / monthly_income) * 100, 2)

    monthly_surplus = monthly_income - emi

    if emi_ratio >= 50:
        stress_level = "High"
        settlement = "40%-60%"
    elif emi_ratio >= 30:
        stress_level = "Medium"
        settlement = "20%-40%"
    else:
        stress_level = "Low"
        settlement = "10%-20%"

    return {
        "emi_ratio": emi_ratio,
        "monthly_surplus": monthly_surplus,
        "stress_level": stress_level,
        "settlement_recommendation": settlement
    }