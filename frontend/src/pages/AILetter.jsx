import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Loader from '../components/Loader'
import ErrorBanner from '../components/ErrorBanner'
import LoanSelector from '../components/LoanSelector'
import { generateLetter } from '../services/letterService'
import { getLoans } from '../services/loanService'

export default function AILetter() {
  const { loanId } = useParams()
  const [letter, setLetter] = useState('')
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      setCopied(false)
      try {
        if (loanId) {
          const data = await generateLetter(loanId)
          const text =
            typeof data === 'string'
              ? data
              : data?.letter ?? data?.generated_letter ?? data?.content ?? JSON.stringify(data)
          setLetter(text)
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Could not copy to clipboard.')
    }
  }

  return (
    <div className="page">
      <PageHeader
        title="AI Negotiation Letter"
        subtitle={
          loanId
            ? `AI-drafted negotiation letter for loan #${loanId}`
            : 'Select a loan to generate its negotiation letter.'
        }
      />

      <ErrorBanner message={error} />

      {loading ? (
        <Loader label="Generating letter..." />
      ) : !loanId ? (
        <LoanSelector loans={loans} basePath="/letter" title="Choose a loan to generate a letter for:" />
      ) : (
        <div className="card letter-card">
          <div className="letter-toolbar">
            <span className="letter-toolbar-title">Generated Document</span>
            <button className="btn btn-sm btn-primary" onClick={handleCopy} disabled={!letter}>
              {copied ? '✅ Copied' : '📋 Copy Letter'}
            </button>
          </div>
          <div className="letter-document">
            <pre className="letter-text">{letter || 'No letter content returned.'}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
