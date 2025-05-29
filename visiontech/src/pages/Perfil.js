"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Phone, MapPin, Camera, LogOut, Edit, Save, X } from "lucide-react"
import authService from "../services/authService"
import appointmentService from "../services/appointmentService"
import "./Perfil.css"

function Perfil() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [activeTab, setActiveTab] = useState("profile")
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const currentUser = authService.getCurrentUser()

    if (!currentUser) {
      navigate("/login")
      return
    }

    setUser(currentUser)
    setFormData({
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      address: currentUser.address || "",
    })

    const loadAppointments = async () => {
      try {
        const result = await appointmentService.getUserAppointments(currentUser.id)
        if (result.success) {
          setAppointments(result.appointments)
        }
      } catch (error) {
        console.error("Error al cargar las citas:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAppointments()
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const result = await authService.updateUserProfile(user.id, formData)

      if (result.success) {
        setUser(result.user)
        setSuccess("Perfil actualizado correctamente")
        setEditing(false)
      } else {
        setError(result.message || "Error al actualizar el perfil")
      }
    } catch (error) {
      setError("Ocurrió un error. Inténtalo de nuevo.")
      console.error(error)
    }
  }

  const handleLogout = () => {
    authService.logout()
    navigate("/login")
  }

  const cancelEdit = () => {
    setEditing(false)
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    })
    setError("")
  }

  if (loading) {
    return (
      <div className="perfil-loading">
        <div className="loading-spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    )
  }

  return (
    <div className="perfil-page">
      <div className="container">
        <div className="perfil-header">
          <h1 className="perfil-title">Mi Cuenta</h1>
        </div>

        <div className="perfil-content">
          <div className="perfil-sidebar">
            <div className="user-info">
              <div className="user-avatar">
                {user.profileImage ? (
                  <img src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                ) : (
                  <div className="avatar-placeholder">{user.name.charAt(0).toUpperCase()}</div>
                )}
                <button className="change-avatar-btn">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="user-name">{user.name}</h2>
              <p className="user-role">
                {user.role === "client" ? "Cliente" : user.role === "doctor" ? "Doctor" : "Administrador"}
              </p>
            </div>

            <div className="sidebar-menu">
              <button
                className={`menu-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <User size={20} />
                <span>Mi Perfil</span>
              </button>
              <button
                className={`menu-item ${activeTab === "appointments" ? "active" : ""}`}
                onClick={() => setActiveTab("appointments")}
              >
                <Calendar size={20} />
                <span>Mis Citas</span>
              </button>
              <button className="menu-item logout" onClick={handleLogout}>
                <LogOut size={20} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>


          <div className="perfil-main">
            {activeTab === "profile" && (
              <div className="profile-section">
                <div className="section-header">
                  <h2 className="section-title">Información Personal</h2>
                  {!editing ? (
                    <button className="edit-btn" onClick={() => setEditing(true)}>
                      <Edit size={18} />
                      <span>Editar</span>
                    </button>
                  ) : (
                    <button className="cancel-btn" onClick={cancelEdit}>
                      <X size={18} />
                      <span>Cancelar</span>
                    </button>
                  )}
                </div>

                {success && <div className="success-message">{success}</div>}
                {error && <div className="error-message">{error}</div>}

                {editing ? (
                  <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                      <label htmlFor="name">Nombre Completo</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
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
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Teléfono</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Dirección</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>

                    <button type="submit" className="save-btn">
                      <Save size={18} />
                      <span>Guardar Cambios</span>
                    </button>
                  </form>
                ) : (
                  <div className="profile-info">
                    <div className="info-item">
                      <div className="info-icon">
                        <User size={20} />
                      </div>
                      <div className="info-content">
                        <span className="info-label">Nombre</span>
                        <span className="info-value">{user.name}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-icon">
                        <Mail size={20} />
                      </div>
                      <div className="info-content">
                        <span className="info-label">Correo Electrónico</span>
                        <span className="info-value">{user.email}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-icon">
                        <Phone size={20} />
                      </div>
                      <div className="info-content">
                        <span className="info-label">Teléfono</span>
                        <span className="info-value">{user.phone || "No especificado"}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-icon">
                        <MapPin size={20} />
                      </div>
                      <div className="info-content">
                        <span className="info-label">Dirección</span>
                        <span className="info-value">{user.address || "No especificada"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="appointments-section">
                <div className="section-header">
                  <h2 className="section-title">Mis Citas</h2>
                  <button className="new-appointment-btn" onClick={() => navigate("/citas")}>
                    <Plus size={18} />
                    <span>Nueva Cita</span>
                  </button>
                </div>

                {appointments.length === 0 ? (
                  <div className="no-appointments">
                    <div className="no-data-icon">
                      <Calendar size={40} />
                    </div>
                    <h3>No tienes citas programadas</h3>
                    <p>Agenda tu primera cita con nuestros especialistas.</p>
                    <button className="btn btn-primary" onClick={() => navigate("/citas")}>
                      Agendar Cita
                    </button>
                  </div>
                ) : (
                  <div className="appointments-list">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className={`appointment-card ${appointment.status}`}>
                        <div className="appointment-status">
                          <span className="status-indicator"></span>
                          <span className="status-text">
                            {appointment.status === "confirmed"
                              ? "Confirmada"
                              : appointment.status === "pending"
                                ? "Pendiente"
                                : appointment.status === "cancelled"
                                  ? "Cancelada"
                                  : "Completada"}
                          </span>
                        </div>
                        <div className="appointment-details">
                          <div className="appointment-date">
                            <Calendar size={18} />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="appointment-time">
                            <Clock size={18} />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="appointment-reason">
                            <span className="reason-label">Motivo:</span>
                            <span className="reason-value">
                              {appointment.reason === "examen-visual"
                                ? "Examen Visual"
                                : appointment.reason === "lentes-contacto"
                                  ? "Lentes de Contacto"
                                  : appointment.reason === "problema-vision"
                                    ? "Problema de Visión"
                                    : appointment.reason === "seguimiento"
                                      ? "Consulta de Seguimiento"
                                      : "Otro"}
                            </span>
                          </div>
                        </div>
                        <div className="appointment-actions">
                          {appointment.status === "confirmed" && (
                            <button
                              className="cancel-appointment-btn"
                              onClick={() => {
                                appointmentService
                                  .cancelAppointment(appointment.id, "Cancelado por el usuario")
                                  .then(() => {
                                    appointmentService.getUserAppointments(user.id).then((result) => {
                                      if (result.success) {
                                        setAppointments(result.appointments)
                                      }
                                    })
                                  })
                              }}
                            >
                              Cancelar
                            </button>
                          )}
                          <button
                            className="view-appointment-btn"
                            onClick={() => navigate ("/DetalleCita")}
                          >
                            Ver Detalles
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Calendar(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className || ""}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function Clock(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className || ""}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function Plus(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className || ""}
    >
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  )
}

export default Perfil
