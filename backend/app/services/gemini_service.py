import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

model = genai.GenerativeModel("gemini-2.5-flash")

def generate_negotiation_letter(
    loan_name,
    outstanding_amount,
    monthly_income,
    emi,
    overdue_months
):

    prompt = f"""
    Generate a professional debt settlement negotiation letter.

    Loan Name: {loan_name}
    Outstanding Amount: {outstanding_amount}
    Monthly Income: {monthly_income}
    EMI: {emi}
    Overdue Months: {overdue_months}

    The borrower is requesting debt settlement assistance.
    Create a formal negotiation letter to the lender.
    """

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception:
        return f"""
Dear Sir/Madam,

I am facing financial hardship and request consideration for a settlement on my {loan_name}.

Outstanding Amount: {outstanding_amount}
Monthly Income: {monthly_income}
EMI: {emi}
Overdue Months: {overdue_months}

I would appreciate the opportunity to negotiate a mutually beneficial settlement.

Sincerely,
Borrower
"""