import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Loader from '../components/Loader'
import ErrorBanner from '../components/ErrorBanner'
import Badge, { toneForLevel } from '../components/Badge'
import LoanSelector from '../components/LoanSelector'
import { getNegotiationStrategy } from '../services/negotiationService'
import { getLoans } from '../services/loanService'

function formatCurrency(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return value ?? '—'
  return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
}

export default function NegotiationStrategy() {
  const { loanId } = useParams()
  const [strategy, setStrategy] = useState(null)
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        if (loanId) {
          const data = await getNegotiationStrategy(loanId)
          setStrategy(data)
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

  const priority = strategy?.priority
  const recommendedSettlement =
    strategy?.recommended_settlement ?? strategy?.recommendedSettlement
  const recommendedAction = strategy?.recommended_action ?? strategy?.recommendedAction
  const strategyText = strategy?.strategy ?? strategy?.strategy_text ?? strategy?.details

  return (
    <div className="page">
      <PageHeader
        title="Negotiation Strategy"
        subtitle={
          loanId
            ? `AI recommended negotiation approach for loan #${loanId}`
            : 'Select a loan to view its negotiation strategy.'
        }
      />

      <ErrorBanner message={error} />

      {loading ? (
        <Loader label="Building strategy..." />
      ) : !loanId ? (
        <LoanSelector
          loans={loans}
          basePath="/negotiation"
          title="Choose a loan to view its strategy:"
        />
      ) : strategy ? (
        <div className="analysis-grid">
          <div className="card metric-card">
            <p className="metric-label">Priority</p>
            <div className="metric-badge-row">
              <Badge text={priority ?? 'Unknown'} tone={toneForLevel(priority)} />
            </div>
            <p className="metric-hint">How urgently this loan should be negotiated</p>
          </div>

          <div className="card metric-card">
            <p className="metric-label">Recommended Settlement</p>
            <h2 className="metric-value">{formatCurrency(recommendedSettlement)}</h2>
            <p className="metric-hint">Suggested settlement amount</p>
          </div>

          <div className="card metric-card wide">
            <p className="metric-label">Recommended Action</p>
            <p className="recommendation-text">
              {recommendedAction || 'No specific action provided.'}
            </p>
          </div>

          <div className="card metric-card wide">
            <p className="metric-label">Strategy</p>
            <p className="recommendation-text">
              {strategyText || 'No detailed strategy provided for this loan.'}
            </p>
          </div>
        </div>
      ) : (
        <ErrorBanner message="No strategy data returned for this loan." />
      )}
    </div>
  )
}
