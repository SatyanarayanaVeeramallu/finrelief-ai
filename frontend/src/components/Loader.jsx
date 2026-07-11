import React from 'react'

export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="loader-wrap">
      <div className="loader-spinner" />
      <p className="loader-label">{label}</p>
    </div>
  )
}
