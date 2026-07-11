import api from './api'

// GET /analyze/{loan_id} — financial health analysis for a loan
export const getLoanAnalysis = async (loanId) => {
  const res = await api.get(`/analyze/${loanId}`)
  return res.data
}

// GET /settlement — general settlement recommendations
export const getSettlementOptions = async () => {
  const res = await api.get('/settlement')
  return res.data
}
