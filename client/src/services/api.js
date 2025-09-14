import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: `${API_URL}/api`,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: (email, password) => api.post('/register', { email, password }),
  login: (email, password) => api.post('/login', { email, password }),
  verifyToken: () => api.get('/verify'),
}

export const sessionsAPI = {
  getAll: () => api.get('/sessions'),
  create: (data) => api.post('/sessions', data),
  update: (id, data) => api.patch(`/sessions/${id}`, data),
  delete: (id) => api.delete(`/sessions/${id}`),
}

export default api