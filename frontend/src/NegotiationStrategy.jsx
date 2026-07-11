import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ErrorBanner from '../components/ErrorBanner'
import { addLoan } from '../services/loanService'

const initialForm = {
  loan_name: '',
  outstanding_amount: '',
  emi: '',
  monthly_income: '',
  overdue_months: '',
}

export default function AddLoan() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSubmitting(true)
    try {
      await addLoan({
        loan_name: form.loan_name,
        outstanding_amount: Number(form.outstanding_amount),
        emi: Number(form.emi),
        monthly_income: Number(form.monthly_income),
        overdue_months: Number(form.overdue_months),
      })
      setSuccess(true)
      setForm(initialForm)
      setTimeout(() => navigate('/loans'), 900)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page">
      <PageHeader
        title="Add Loan"
        subtitle="Register a new loan to include it in your debt relief analysis."
      />

      <ErrorBanner message={error} />
      {success && (
        <div className="success-banner">
          ✅ Loan added successfully. Redirecting to Loan Management...
        </div>
      )}

      <div className="card form-card">
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-field">
            <label>Loan Name</label>
            <input
              type="text"
              name="loan_name"
              placeholder="e.g. HDFC Personal Loan"
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
              min="0"
              name="outstanding_amount"
              placeholder="e.g. 250000"
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
              min="0"
              name="emi"
              placeholder="e.g. 12500"
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
              min="0"
              name="monthly_income"
              placeholder="e.g. 45000"
              value={form.monthly_income}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Overdue Months</label>
            <input
              type="number"
              min="0"
              name="overdue_months"
              placeholder="e.g. 2"
              value={form.overdue_months}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-footer form-submit-row">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setForm(initialForm)}
              disabled={submitting}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Loan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
