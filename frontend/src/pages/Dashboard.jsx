import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import Loader from '../components/Loader'
import ErrorBanner from '../components/ErrorBanner'
import Badge, { toneForLevel } from '../components/Badge'
import { getDashboardData } from '../services/dashboardService'

function formatCurrency(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return '—'
  return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await getDashboardData()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const totalLoans = data?.total_loans ?? data?.totalLoans ?? 0
  const totalOutstanding = data?.total_outstanding ?? data?.totalOutstanding ?? 0
  const averageEmi = data?.average_emi ?? data?.averageEmi ?? 0
  const healthSummary =
    data?.financial_health_summary ??
    data?.financial_health ??
    data?.health_summary ??
    'No summary available yet. Add loans to generate insights.'
  const healthStatus = data?.health_status ?? data?.status ?? ''

  return (
    <div className="page">
      <PageHeader
        title="Dashboard"
        subtitle="A live snapshot of your debt portfolio and financial health."
        actions={
          <Link to="/add-loan" className="btn btn-primary">
            + Add Loan
          </Link>
        }
      />

      <ErrorBanner message={error} onRetry={fetchData} />

      {loading ? (
        <Loader label="Loading dashboard..." />
      ) : (
        <>
          <div className="stat-grid">
            <StatCard
              title="Total Loans"
              value={totalLoans}
              icon="📋"
              accent="blue"
              subtitle="Active loan accounts"
            />
            <StatCard
              title="Total Outstanding"
              value={formatCurrency(totalOutstanding)}
              icon="💰"
              accent="red"
              subtitle="Sum across all loans"
            />
            <StatCard
              title="Average EMI"
              value={formatCurrency(averageEmi)}
              icon="📊"
              accent="purple"
              subtitle="Per loan, per month"
            />
            <StatCard
              title="Financial Health"
              value={healthStatus || 'Review'}
              icon="🩺"
              accent="green"
              subtitle="AI-assessed status"
            />
          </div>

          <div className="card summary-card">
            <div className="summary-card-header">
              <h3>Financial Health Summary</h3>
              {healthStatus && <Badge text={healthStatus} tone={toneForLevel(healthStatus)} />}
            </div>
            <p className="summary-text">{healthSummary}</p>
          </div>

          {Array.isArray(data?.loans) && data.loans.length > 0 && (
            <div className="card">
              <h3 className="section-title">Loan Overview</h3>
              <div className="mini-loan-list">
                {data.loans.map((loan, idx) => (
                  <div className="mini-loan-row" key={loan.id ?? loan.loan_id ?? idx}>
                    <span className="mini-loan-name">{loan.loan_name ?? loan.name}</span>
                    <span>{formatCurrency(loan.outstanding_amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!data || totalLoans === 0) && (
            <div className="card empty-state">
              <div className="empty-icon">🚀</div>
              <h3>Let's get started</h3>
              <p>You haven't added any loans yet. Add your first loan to unlock AI analysis.</p>
              <Link to="/add-loan" className="btn btn-primary">
                Add Your First Loan
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}
