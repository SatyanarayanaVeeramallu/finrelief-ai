import api from './api'

// GET /loan — fetch all loans
export const getLoans = async () => {
  const res = await api.get('/loan')
  return res.data
}

// POST /loan — create a new loan
export const addLoan = async (loanData) => {
  const res = await api.post('/loan', loanData)
  return res.data
}

// PUT /loan/{loan_id} — update an existing loan
export const updateLoan = async (loanId, loanData) => {
  const res = await api.put(`/loan/${loanId}`, loanData)
  return res.data
}

// DELETE /loan/{loan_id} — remove a loan
export const deleteLoan = async (loanId) => {
  const res = await api.delete(`/loan/${loanId}`)
  return res.data
}
