import api from './api'

// GET /negotiation-strategy/{loan_id} — AI recommended negotiation strategy
export const getNegotiationStrategy = async (loanId) => {
  const res = await api.get(`/negotiation-strategy/${loanId}`)
  return res.data
}
