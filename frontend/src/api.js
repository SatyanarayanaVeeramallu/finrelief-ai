import api from './api'

// GET /generate-letter/{loan_id} — AI generated negotiation letter
export const generateLetter = async (loanId) => {
  const res = await api.get(`/generate-letter/${loanId}`)
  return res.data
}
