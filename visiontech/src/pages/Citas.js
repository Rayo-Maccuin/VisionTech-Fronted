"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./Citas.css"
import authService from "../services/authService"
import appointmentService from "../services/appointmentService"

export default function Citas() {
  const [date, setDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  })
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(1) 

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      }))
    }

    // Cargar horarios disponibles
    const loadAvailableTimeSlots = async () => {
      if (date) {
        try {
          const formattedDate = format(date, "yyyy-MM-dd")
          const result = await appointmentService.getAvailableTimeSlots(selectedDoctor, formattedDate)
          if (result.success) {
            setAvailableTimeSlots(result.availableSlots)
          }
        } catch (error) {
          console.error("Error al cargar horarios disponibles:", error)
        }
      }
      setLoading(false)
    }

    loadAvailableTimeSlots()
  }, [date, selectedDoctor])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleNextStep = () => {
    if (step === 1 && date && selectedTime) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Formatear la fecha
      const formattedDate = format(date, "yyyy-MM-dd")

      // Crear objeto de cita
      const appointmentData = {
        patientId: user ? user.id : 0, 
        doctorId: selectedDoctor,
        date: formattedDate,
        time: selectedTime,
        reason: formData.reason,
        status: "pending",
        notes: "Cita agendada a través del sitio web",
      }

      // Enviar la cita
      const result = await appointmentService.createAppointment(appointmentData)

      if (result.success) {
        setIsSubmitted(true)
        // La notificación se envía automáticamente en el servicio
      } else {
        console.error("Error al agendar la cita:", result.message)
      }
    } catch (error) {
      console.error("Error al agendar la cita:", error)
    } finally {
      setLoading(false)
    }
  }

  const isWeekday = (date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  const getReasonText = (reasonCode) => {
    switch (reasonCode) {
      case "examen-visual":
        return "Examen Visual"
      case "lentes-contacto":
        return "Lentes de Contacto"
      case "problema-vision":
        return "Problema de Visión"
      case "seguimiento":
        return "Consulta de Seguimiento"
      default:
        return "Otro"
    }
  }

  if (isSubmitted) {
    return (
      <div className="citas-page">
        <div className="container">
          <div className="confirmation-container">
            <div className="confirmation-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className="confirmation-title">¡Cita Agendada con Éxito!</h2>
            <p className="confirmation-message">
              Hemos recibido tu solicitud de cita para el día{" "}
              <strong>{date && format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}</strong> a las{" "}
              <strong>{selectedTime}</strong>.
            </p>

            <div className="confirmation-details">
              <div className="detail-item">
                <div className="detail-label">Nombre:</div>
                <div className="detail-value">{formData.name}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Email:</div>
                <div className="detail-value">{formData.email}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Teléfono:</div>
                <div className="detail-value">{formData.phone}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Motivo:</div>
                <div className="detail-value">{getReasonText(formData.reason)}</div>
              </div>
            </div>

            <p className="confirmation-message">
              Te enviaremos un correo de confirmación a <strong>{formData.email}</strong> con los detalles de tu cita.
            </p>

            <button
              onClick={() => {
                setIsSubmitted(false)
                setStep(1)
                setDate(null)
                setSelectedTime(null)
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  reason: "",
                })
              }}
              className="btn btn-primary"
            >
              Agendar Otra Cita
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="citas-page">
      <div className="container">
        <div className="citas-header">
          <h1 className="citas-title">Agenda tu Cita</h1>
          <p className="citas-subtitle">Selecciona la fecha y hora que prefieras para tu consulta oftalmológica</p>
        </div>

        <div className="citas-card">
          {/* Progress Steps */}
          <div className="checkout-progress">
            <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
              <div className="step-number">1</div>
              <div className="step-label">Fecha y Hora</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
              <div className="step-number">2</div>
              <div className="step-label">Información Personal</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
              <div className="step-number">3</div>
              <div className="step-label">Confirmación</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="citas-form">
            {/* Step 1: Date and Time Selection */}
            {step === 1 && (
              <div className="form-section">
                <h3 className="form-section-title">Selecciona cuándo quieres tu cita</h3>

                <div className="form-group">
                  <label>Selecciona una fecha</label>
                  <div className="date-picker-container">
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      filterDate={isWeekday}
                      minDate={new Date()}
                      locale={es}
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                      placeholderText="Selecciona una fecha"
                    />
                    <div className="calendar-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                  </div>
                </div>

                {date && (
                  <div className="time-slots-container">
                    <label>Selecciona una hora</label>
                    {loading ? (
                      <div className="loader-container">
                        <div className="loader"></div>
                      </div>
                    ) : (
                      <div className="time-slots">
                        {availableTimeSlots.length > 0 ? (
                          availableTimeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                              onClick={() => handleTimeSelect(time)}
                            >
                              <span className="clock-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                              </span>
                              {time}
                            </button>
                          ))
                        ) : (
                          <p className="no-slots-message">
                            No hay horarios disponibles para esta fecha. Por favor, selecciona otra fecha.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="form-actions">
                  <div></div> {/* Espacio vacío para alinear el botón a la derecha */}
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!date || !selectedTime}
                    className="btn btn-primary"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {step === 2 && (
              <div className="form-section">
                <h3 className="form-section-title">Completa tu información personal</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nombre Completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reason">Motivo de la Consulta</label>
                    <select
                      id="reason"
                      name="reason"
                      className="form-control"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="examen-visual">Examen Visual</option>
                      <option value="lentes-contacto">Lentes de Contacto</option>
                      <option value="problema-vision">Problema de Visión</option>
                      <option value="seguimiento">Consulta de Seguimiento</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={handlePrevStep} className="btn btn-secondary">
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!formData.name || !formData.email || !formData.phone || !formData.reason}
                    className="btn btn-primary"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="form-section">
                <h3 className="form-section-title">Confirma tu cita</h3>

                <div className="appointment-summary">
                  <h3 className="summary-title">Resumen de tu Cita</h3>

                  <div className="summary-item">
                    <span className="summary-label">Fecha:</span>
                    <span className="summary-value">
                      {date && format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Hora:</span>
                    <span className="summary-value">{selectedTime}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Nombre:</span>
                    <span className="summary-value">{formData.name}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Correo:</span>
                    <span className="summary-value">{formData.email}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Teléfono:</span>
                    <span className="summary-value">{formData.phone}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Motivo:</span>
                    <span className="summary-value">{getReasonText(formData.reason)}</span>
                  </div>
                </div>

                <div className="terms-notice">
                  <p>Al confirmar, aceptas nuestros términos y condiciones para la programación de citas.</p>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={handlePrevStep} className="btn btn-secondary">
                    Atrás
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Procesando..." : "Confirmar Cita"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

