import React from 'react'
import { useNavigate } from 'react-router-dom'

function formatCurrency(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return value ?? '—'
  return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
}

/**
 * Renders the loans table with action buttons for each row.
 * props: loans, onEdit(loan), onDelete(loanId)
 */
export default function LoanTable({ loans, onEdit, onDelete }) {
  const navigate = useNavigate()

  const getId = (loan) => loan.id ?? loan.loan_id ?? loan._id

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Loan Name</th>
            <th>Outstanding</th>
            <th>EMI</th>
            <th>Monthly Income</th>
            <th>Overdue (months)</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => {
            const id = getId(loan)
            return (
              <tr key={id}>
                <td className="cell-strong">{loan.loan_name ?? loan.name}</td>
                <td>{formatCurrency(loan.outstanding_amount)}</td>
                <td>{formatCurrency(loan.emi)}</td>
                <td>{formatCurrency(loan.monthly_income)}</td>
                <td>
                  <span
                    className={
                      'overdue-pill ' +
                      (Number(loan.overdue_months) > 3 ? 'overdue-high' : 'overdue-low')
                    }
                  >
                    {loan.overdue_months}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => navigate(`/analysis/${id}`)}
                    >
                      Analyze
                    </button>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => navigate(`/letter/${id}`)}
                    >
                      Letter
                    </button>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => navigate(`/negotiation/${id}`)}
                    >
                      Strategy
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={() => onEdit(loan)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
