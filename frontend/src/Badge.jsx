import React, { useEffect, useState } from 'react'

const emptyForm = {
  loan_name: '',
  outstanding_amount: '',
  emi: '',
  monthly_income: '',
  overdue_months: '',
}

/**
 * Modal used to edit an existing loan in the Loan Management page.
 * props: loan (object|null), onClose(), onSave(formData)
 */
export default function LoanFormModal({ loan, onClose, onSave, saving }) {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (loan) {
      setForm({
        loan_name: loan.loan_name ?? loan.name ?? '',
        outstanding_amount: loan.outstanding_amount ?? '',
        emi: loan.emi ?? '',
        monthly_income: loan.monthly_income ?? '',
        overdue_months: loan.overdue_months ?? '',
      })
    }
  }, [loan])

  if (!loan) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      loan_name: form.loan_name,
      outstanding_amount: Number(form.outstanding_amount),
      emi: Number(form.emi),
      monthly_income: Number(form.monthly_income),
      overdue_months: Number(form.overdue_months),
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Loan</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-field">
            <label>Loan Name</label>
            <input
              type="text"
              name="loan_name"
              value={form.loan_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Outstanding Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              name="outstanding_amount"
              value={form.outstanding_amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Monthly EMI (₹)</label>
            <input
              type="number"
              step="0.01"
              name="emi"
              value={form.emi}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Monthly Income (₹)</label>
            <input
              type="number"
              step="0.01"
              name="monthly_income"
              value={form.monthly_income}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Overdue Months</label>
            <input
              type="number"
              name="overdue_months"
              value={form.overdue_months}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
