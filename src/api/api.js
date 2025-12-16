import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const api = axios.create({
  baseURL: 'https://society-maintenance-backend-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 🔐 Attach JWT to every request
api.interceptors.request.use((config) => {
  const auth = useAuthStore()

  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
})

export default api
