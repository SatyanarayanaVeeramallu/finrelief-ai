import React from 'react'

export default function ErrorBanner({ message, onRetry }) {
  if (!message) return null
  return (
    <div className="error-banner">
      <span className="error-icon">⚠️</span>
      <span className="error-text">{message}</span>
      {onRetry && (
        <button className="btn btn-ghost btn-sm" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}
