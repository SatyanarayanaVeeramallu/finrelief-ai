import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddLoan from './pages/AddLoan'
import LoanManagement from './pages/LoanManagement'
import FinancialAnalysis from './pages/FinancialAnalysis'
import AILetter from './pages/AILetter'
import NegotiationStrategy from './pages/NegotiationStrategy'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-loan" element={<AddLoan />} />
          <Route path="/loans" element={<LoanManagement />} />
          <Route path="/analysis" element={<FinancialAnalysis />} />
          <Route path="/analysis/:loanId" element={<FinancialAnalysis />} />
          <Route path="/letter" element={<AILetter />} />
          <Route path="/letter/:loanId" element={<AILetter />} />
          <Route path="/negotiation" element={<NegotiationStrategy />} />
          <Route path="/negotiation/:loanId" element={<NegotiationStrategy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>FinRelief AI © {new Date().getFullYear()} — AI-Powered Debt Relief Platform</p>
      </footer>
    </div>
  )
}
