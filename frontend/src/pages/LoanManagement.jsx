import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Loader from '../components/Loader'
import ErrorBanner from '../components/ErrorBanner'
import EmptyState from '../components/EmptyState'
import LoanTable from '../components/LoanTable'
import LoanFormModal from '../components/LoanFormModal'
import { getLoans, updateLoan, deleteLoan } from '../services/loanService'

export default function LoanManagement() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingLoan, setEditingLoan] = useState(null)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')

  const fetchLoans = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getLoans()
      setLoans(Array.isArray(data) ? data : data?.loans ?? [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLoans()
  }, [])

  const getId = (loan) => loan.id ?? loan.loan_id ?? loan._id

  const handleDelete = async (loanId) => {
    if (!window.confirm('Are you sure you want to delete this loan?')) return
    try {
      await deleteLoan(loanId)
      setLoans((prev) => prev.filter((l) => getId(l) !== loanId))
      setNotice('Loan deleted successfully.')
      setTimeout(() => setNotice(''), 2500)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSave = async (formData) => {
    const id = getId(editingLoan)
    setSaving(true)
    try {
      const updated = await updateLoan(id, formData)
      setLoans((prev) =>
        prev.map((l) => (getId(l) === id ? { ...l, ...formData, ...updated } : l))
      )
      setEditingLoan(null)
      setNotice('Loan updated successfully.')
      setTimeout(() => setNotice(''), 2500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page">
      <PageHeader
        title="Loan Management"
        subtitle="View, edit, and act on every loan in your portfolio."
        actions={
          <Link to="/add-loan" className="btn btn-primary">
            + Add Loan
          </Link>
        }
      />

      <ErrorBanner message={error} onRetry={fetchLoans} />
      {notice && <div className="success-banner">✅ {notice}</div>}

      {loading ? (
        <Loader label="Loading loans..." />
      ) : loans.length === 0 ? (
        <EmptyState
          icon="🗂️"
          title="No loans found"
          message="Add your first loan to start tracking and analyzing it here."
          actionLabel="Add Loan"
          actionTo="/add-loan"
        />
      ) : (
        <div className="card">
          <LoanTable loans={loans} onEdit={setEditingLoan} onDelete={handleDelete} />
        </div>
      )}

      <LoanFormModal
        loan={editingLoan}
        onClose={() => setEditingLoan(null)}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  )
}
