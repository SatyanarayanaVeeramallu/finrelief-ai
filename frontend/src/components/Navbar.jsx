import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/add-loan', label: 'Add Loan' },
  { to: '/loans', label: 'Loan Management' },
  { to: '/analysis', label: 'Analysis' },
  { to: '/letter', label: 'AI Letter' },
  { to: '/negotiation', label: 'Negotiation Strategy' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="brand-mark">💠</span>
          <span className="brand-text">
            FinRelief <span className="brand-accent">AI</span>
          </span>
        </div>

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                'navbar-link' + (isActive ? ' active' : '')
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
