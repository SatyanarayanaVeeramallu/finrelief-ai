import api from './api'

// GET /dashboard — aggregate stats for the dashboard page
export const getDashboardData = async () => {
  const res = await api.get('/dashboard')
  return res.data
}
