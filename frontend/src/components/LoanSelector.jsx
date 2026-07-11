import React from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Shown when a page like /analysis, /letter, /negotiation is opened
 * without a specific loan id — lets the user pick which loan to act on.
 */
export default function LoanSelector({ loans, basePath, title }) {
  const navigate = useNavigate()
  const getId = (loan) => loan.id ?? loan.loan_id ?? loan._id

  return (
    <div className="loan-selector">
      <p className="loan-selector-hint">{title}</p>
      <div className="loan-selector-grid">
        {loans.map((loan) => {
          const id = getId(loan)
          return (
            <button
              key={id}
              className="loan-selector-card"
              onClick={() => navigate(`${basePath}/${id}`)}
            >
              <span className="loan-selector-name">{loan.loan_name ?? loan.name}</span>
              <span className="loan-selector-sub">
                Outstanding: ₹{Number(loan.outstanding_amount).toLocaleString('en-IN')}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
