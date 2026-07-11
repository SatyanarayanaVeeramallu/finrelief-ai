import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Loader from '../components/Loader'
import ErrorBanner from '../components/ErrorBanner'
import Badge, { toneForLevel } from '../components/Badge'
import LoanSelector from '../components/LoanSelector'
import { getLoanAnalysis } from '../services/analysisService'
import { getLoans } from '../services/loanService'

function formatCurrency(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return value ?? '—'
  return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
}

function formatPercent(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return value ?? '—'
  // Handle both 0-1 ratios and already-percentage values
  const pct = num <= 1 ? num * 100 : num
  return `${pct.toFixed(1)}%`
}

export default function FinancialAnalysis() {
  const { loanId } = useParams()
  const [analysis, setAnalysis] = useState(null)
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        if (loanId) {
          const data = await getLoanAnalysis(loanId)
          setAnalysis(data)
        } else {
          const data = await getLoans()
          setLoans(Array.isArray(data) ? data : data?.loans ?? [])
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [loanId])

  const emiRatio = analysis?.emi_ratio ?? analysis?.emiRatio
  const monthlySurplus = analysis?.monthly_surplus ?? analysis?.monthlySurplus
  const stressLevel = analysis?.stress_level ?? analysis?.stressLevel ?? analysis?.risk_level
  const settlementRecommendation =
    analysis?.settlement_recommendation ??
    analysis?.settlementRecommendation ??
    analysis?.recommendation

  return (
    <div className="page">
      <PageHeader
        title="Financial Analysis"
        subtitle={
          loanId
            ? `Detailed financial health breakdown for loan #${loanId}`
            : 'Select a loan to view its financial analysis.'
        }
      />

      <ErrorBanner message={error} />

      {loading ? (
        <Loader label="Analyzing loan..." />
      ) : !loanId ? (
        <LoanSelector loans={loans} basePath="/analysis" title="Choose a loan to analyze:" />
      ) : analysis ? (
        <div className="analysis-grid">
          <div className="card metric-card">
            <p className="metric-label">EMI Ratio</p>
            <h2 className="metric-value">{formatPercent(emiRatio)}</h2>
            <p className="metric-hint">Share of income going toward EMI payments</p>
          </div>

          <div className="card metric-card">
            <p className="metric-label">Monthly Surplus</p>
            <h2 className="metric-value">{formatCurrency(monthlySurplus)}</h2>
            <p className="metric-hint">Income remaining after EMI obligations</p>
          </div>

          <div className="card metric-card">
            <p className="metric-label">Stress Level</p>
            <div className="metric-badge-row">
              <Badge text={stressLevel ?? 'Unknown'} tone={toneForLevel(stressLevel)} />
            </div>
            <p className="metric-hint">AI-assessed repayment stress indicator</p>
          </div>

          <div className="card metric-card wide">
            <p className="metric-label">Settlement Recommendation</p>
            <p className="recommendation-text">
              {settlementRecommendation || 'No specific recommendation available for this loan.'}
            </p>
          </div>
        </div>
      ) : (
        <ErrorBanner message="No analysis data returned for this loan." />
      )}
    </div>
  )
}
