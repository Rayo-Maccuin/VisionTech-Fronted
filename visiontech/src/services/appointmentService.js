import apiClient from './apiClient'

const appointmentService = {
  // Crear cita
  createAppointment: async (appointmentData) => {
    try {
      const response = await apiClient.post('/appointments', {
        doctor_id: appointmentData.doctorId || 1, 
        appointment_date: appointmentData.date,
        appointment_time: appointmentData.time,
        reason: appointmentData.reason
      })
      
      return { success: true, appointment: response }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Obtener citas del usuario
  getUserAppointments: async (userId) => {
    try {
      const response = await apiClient.get('/appointments')
      return { success: true, appointments: response.appointments }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Cancelar cita
  cancelAppointment: async (appointmentId, reason) => {
    try {
      const response = await apiClient.patch(`/appointments/${appointmentId}/status`, {
        status: 'cancelled',
        notes: reason
      })
      
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Obtener horarios disponibles
  getAvailableTimeSlots: async (doctorId, date) => {
    try {
      const response = await apiClient.get(`/doctors/${doctorId}/availability?date=${date}`)
      return { success: true, availableSlots: response.available_times }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}

export default appointmentService