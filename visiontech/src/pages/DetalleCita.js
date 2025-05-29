"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./DetalleCita.css"

function DetalleCita() {
  const { id } = useParams()
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadAppointmentDetails()
  }, [id])

  const loadAppointmentDetails = async () => {
    try {
      setLoading(true)
      setError(null)

      // Llamar directamente al backend para obtener la cita específica
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (result.success) {
        setAppointment(result.appointment)
      } else {
        setError(result.message || "Error al cargar la cita")
      }
    } catch (error) {
      console.error("Error al cargar los detalles de la cita:", error)
      setError("Error al cargar los detalles de la cita")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Cargando detalles de la cita...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  if (!appointment) {
    return <div className="no-appointment">Cita no encontrada.</div>
  }

  return (
    <div className="appointment-details-container">
      <h2>Detalle de la Cita</h2>
      <div className="appointment-details">
        <div className="details-section">
          <h3>Información de la Cita</h3>
          <div className="info-item">
            <div className="info-label">Fecha:</div>
            <div className="info-value">{appointment.appointment_date}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Hora:</div>
            <div className="info-value">{appointment.appointment_time}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Motivo:</div>
            <div className="info-value">{appointment.reason}</div>
          </div>
        </div>

        <div className="details-section">
          <h3>Información del Paciente</h3>
          <div className="info-item">
            <div className="info-label">Nombre:</div>
            <div className="info-value">{appointment.patient_name}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Email:</div>
            <div className="info-value">{appointment.patient_email}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Teléfono:</div>
            <div className="info-value">{appointment.patient_phone}</div>
          </div>
        </div>

        <div className="details-section">
          <h3>Información del Doctor</h3>
          <div className="info-item">
            <div className="info-label">Nombre:</div>
            <div className="info-value">{appointment.doctor_name || "Dr. Mario Sosa"}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Especialidad:</div>
            <div className="info-value">{appointment.specialization || "Oftalmólogo especialista en Córnea"}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleCita

