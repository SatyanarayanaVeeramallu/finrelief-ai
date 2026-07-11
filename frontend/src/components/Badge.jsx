import React from 'react'

/**
 * Small colored label used for status/risk/priority indicators.
 * tone: 'green' | 'amber' | 'red' | 'blue' | 'gray'
 */
export default function Badge({ text, tone = 'gray' }) {
  return <span className={`badge badge-${tone}`}>{text}</span>
}

// Helper to map common stress/priority words to a badge tone.
export function toneForLevel(level = '') {
  const val = String(level).toLowerCase()
  if (['high', 'critical', 'severe', 'urgent'].some((w) => val.includes(w))) return 'red'
  if (['medium', 'moderate', 'warning'].some((w) => val.includes(w))) return 'amber'
  if (['low', 'good', 'healthy', 'stable'].some((w) => val.includes(w))) return 'green'
  return 'blue'
}
