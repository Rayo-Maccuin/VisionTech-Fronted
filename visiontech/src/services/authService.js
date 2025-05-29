import apiClient from './apiClient'

const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password })

      if (response && response.success) {
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        return { success: true, user: response.user }
      }

      return { success: false, message: response.message }
    } catch (error) {
      console.error('Error en login:', error.message)
      return { success: false, message: error.message }
    }
  },

  // Registro
  register: async (userData) => {
    try {
      const first_name = userData.name.split(' ')[0] || 'Usuario'
      const last_name = userData.name.split(' ').slice(1).join(' ')
      const payload = {
        email: userData.email,
        password: userData.password,
        first_name,
        last_name: last_name.length >= 2 ? last_name : 'Usuario',
      }
      if (userData.phone && userData.phone.trim().length > 0) {
        payload.phone = userData.phone
      }
      if (userData.address && userData.address.trim().length > 0) {
        payload.address = userData.address
      }

      const response = await apiClient.post('/auth/register', payload)

      if (response && response.success) {
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        return { success: true, user: response.user }
      }

      console.error("Error backend en register:", response || "No data en response")
      return { success: false, message: response.message || "Error desconocido" }
    } catch (error) {
      console.error('Error en register (catch):', error.message)
      return { success: false, message: error.message }
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken')
  },

  // Obtener perfil
  getProfile: async () => {
    try {
      const response = await apiClient.get('/auth/profile')
      if (response && response.success) {
        return { success: true, user: response.user }
      }
      return { success: false, message: response.message || "Error desconocido" }
    } catch (error) {
      console.error('Error en getProfile:', error.message)
      return { success: false, message: error.message }
    }
  }
}

export default authService
