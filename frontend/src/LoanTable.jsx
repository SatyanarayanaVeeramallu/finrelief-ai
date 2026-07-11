import React from 'react'

/**
 * Reusable statistic card for dashboard-style summaries.
 * props: title, value, icon, accent ('blue' | 'green' | 'red' | 'amber' | 'purple'), subtitle
 */
export default function StatCard({ title, value, icon, accent = 'blue', subtitle }) {
  return (
    <div className={`stat-card accent-${accent}`}>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-body">
        <p className="stat-card-title">{title}</p>
        <h3 className="stat-card-value">{value}</h3>
        {subtitle && <p className="stat-card-subtitle">{subtitle}</p>}
      </div>
    </div>
  )
}
