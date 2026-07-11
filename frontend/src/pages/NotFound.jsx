import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <div className="card empty-state">
        <div className="empty-icon">🧭</div>
        <h3>Page not found</h3>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
