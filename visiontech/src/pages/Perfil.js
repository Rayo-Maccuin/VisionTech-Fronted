"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  LogOut,
  Edit,
  Save,
  X,
  Calendar,
  Clock,
  Plus,
  History,
  FileText,
  Download,
  Eye,
  Search,
  TrendingUp,
  Activity,
} from "lucide-react"
import authService from "../services/authService"
import appointmentService from "../services/appointmentService"
import "./Perfil.css"
import FormularioReporteMedico from "./formulario-reporte-medico"

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

  // Estados para historial y reportes
  const [historialData, setHistorialData] = useState([])
  const [reportes, setReportes] = useState([])
  const [filtroHistorial, setFiltroHistorial] = useState("todos")
  const [busquedaHistorial, setBusquedaHistorial] = useState("")
  const [loadingHistorial, setLoadingHistorial] = useState(false)
  const [loadingReportes, setLoadingReportes] = useState(false)

  const [showFormularioMedico, setShowFormularioMedico] = useState(false)

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

  // Cargar historial del cliente
  const loadHistorial = async () => {
    setLoadingHistorial(true)
    // Simular llamada al backend
    setTimeout(() => {
      const mockHistorial = [
        {
          id: 1,
          fecha: "2024-01-15",
          tipo: "Examen Visual",
          doctor: "Dr. Mario Sosa",
          diagnostico: "Miopía leve en ojo derecho",
          tratamiento: "Lentes correctivos -1.25 D",
          notas: "Paciente refiere mejora en visión lejana. Recomendar revisión en 6 meses.",
          estado: "completado",
        },
        {
          id: 2,
          fecha: "2024-02-20",
          tipo: "Seguimiento",
          doctor: "Dra. María Taborda",
          diagnostico: "Adaptación exitosa a lentes",
          tratamiento: "Continuar con lentes actuales",
          notas: "Paciente satisfecho con corrección visual. Sin molestias.",
          estado: "completado",
        },
        {
          id: 3,
          fecha: "2024-03-10",
          tipo: "Consulta Especializada",
          doctor: "Dr. Mario Sosa",
          diagnostico: "Revisión preventiva",
          tratamiento: "Ninguno requerido",
          notas: "Examen de rutina. Salud ocular excelente.",
          estado: "completado",
        },
        {
          id: 4,
          fecha: "2024-03-25",
          tipo: "Emergencia",
          doctor: "Dra. María Taborda",
          diagnostico: "Irritación ocular leve",
          tratamiento: "Gotas lubricantes",
          notas: "Irritación causada por exposición prolongada a pantallas.",
          estado: "completado",
        },
        {
          id: 5,
          fecha: "2024-04-05",
          tipo: "Examen Visual",
          doctor: "Dr. Mario Sosa",
          diagnostico: "Astigmatismo leve",
          tratamiento: "Lentes con corrección cilíndrica",
          notas: "Primera detección de astigmatismo. Paciente reporta visión borrosa ocasional.",
          estado: "completado",
        },
        {
          id: 6,
          fecha: "2024-04-18",
          tipo: "Seguimiento",
          doctor: "Dra. María Taborda",
          diagnostico: "Evolución favorable",
          tratamiento: "Continuar tratamiento actual",
          notas: "Paciente se adapta bien a nuevos lentes. Sin complicaciones.",
          estado: "completado",
        },
      ]
      setHistorialData(mockHistorial)
      setLoadingHistorial(false)
    }, 1500)
  }

  // Cargar reportes disponibles
  const loadReportes = async () => {
    setLoadingReportes(true)
    // Simular llamada al backend
    setTimeout(() => {
      const mockReportes = [
        {
          id: 1,
          nombre: "Historial Médico Completo",
          descripcion: "Reporte detallado de todas las consultas y tratamientos",
          fechaCreacion: "2024-03-25",
          tipo: "PDF",
          tamaño: "2.3 MB",
          estado: "disponible",
        },
        {
          id: 2,
          nombre: "Evolución Visual 2024",
          descripcion: "Análisis de la evolución de la salud visual durante el año",
          fechaCreacion: "2024-03-20",
          tipo: "PDF",
          tamaño: "1.8 MB",
          estado: "disponible",
        },
        {
          id: 3,
          nombre: "Reporte de Tratamientos",
          descripcion: "Resumen de todos los tratamientos aplicados",
          fechaCreacion: "2024-03-15",
          tipo: "PDF",
          tamaño: "1.2 MB",
          estado: "disponible",
        },
        {
          id: 4,
          nombre: "Análisis Preventivo",
          descripcion: "Recomendaciones para el cuidado preventivo de la visión",
          fechaCreacion: "2024-03-10",
          tipo: "PDF",
          tamaño: "900 KB",
          estado: "generando",
        },
      ]
      setReportes(mockReportes)
      setLoadingReportes(false)
    }, 1200)
  }

  // Función para agregar nuevo reporte al historial y a reportes
  const agregarNuevoReporte = (datosReporte) => {
    const fechaActual = new Date().toISOString().split("T")[0]

    // Agregar al historial médico
    const nuevoHistorial = {
      id: historialData.length + 1,
      fecha: fechaActual,
      tipo: "Reporte Médico Generado",
      doctor: datosReporte.doctorNombre || "Dr. Mario Sosa",
      diagnostico: datosReporte.diagnosticoPrincipal || "Reporte médico completo",
      tratamiento: datosReporte.tratamientoPrescrito || "Según indicaciones médicas",
      notas: `Reporte generado para ${datosReporte.pacienteNombre}. ${datosReporte.observacionesGenerales || "Consulta completada exitosamente."}`,
      estado: "completado",
    }

    // Agregar a reportes disponibles
    const nuevoReporte = {
      id: reportes.length + 1,
      nombre: `Reporte Médico - ${datosReporte.pacienteNombre}`,
      descripcion: `Reporte médico completo generado el ${fechaActual}`,
      fechaCreacion: fechaActual,
      tipo: "PDF",
      tamaño: "1.8 MB",
      estado: "disponible",
    }

    setHistorialData((prev) => [nuevoHistorial, ...prev])
    setReportes((prev) => [nuevoReporte, ...prev])

    setSuccess("Reporte generado exitosamente y agregado al historial")
    setTimeout(() => setSuccess(""), 4000)
  }

  // Generar nuevo reporte
  const generarReporte = async (tipoReporte) => {
    if (tipoReporte === "Historial Completo") {
      setShowFormularioMedico(true)
      return
    }

    setLoadingReportes(true)
    // Simular generación de reporte
    setTimeout(() => {
      const nuevoReporte = {
        id: reportes.length + 1,
        nombre: `Reporte ${tipoReporte}`,
        descripcion: `Reporte personalizado de ${tipoReporte.toLowerCase()}`,
        fechaCreacion: new Date().toISOString().split("T")[0],
        tipo: "PDF",
        tamaño: "1.5 MB",
        estado: "disponible",
      }
      setReportes([nuevoReporte, ...reportes])
      setSuccess(`Reporte "${tipoReporte}" generado exitosamente`)
      setLoadingReportes(false)

      setTimeout(() => setSuccess(""), 3000)
    }, 3000)
  }

  // Descargar reporte
  const descargarReporte = (reporte) => {
    // Simular descarga
    setSuccess(`Descargando "${reporte.nombre}"...`)
    setTimeout(() => setSuccess(""), 2000)
  }

  // Filtrar historial
  const historialFiltrado = historialData.filter((item) => {
    const cumpleFiltro = filtroHistorial === "todos" || item.tipo.toLowerCase().includes(filtroHistorial.toLowerCase())
    const cumpleBusqueda =
      item.diagnostico.toLowerCase().includes(busquedaHistorial.toLowerCase()) ||
      item.doctor.toLowerCase().includes(busquedaHistorial.toLowerCase()) ||
      item.notas.toLowerCase().includes(busquedaHistorial.toLowerCase())
    return cumpleFiltro && cumpleBusqueda
  })

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

  // Cargar datos cuando se cambia de pestaña
  useEffect(() => {
    if (activeTab === "historial" && historialData.length === 0) {
      loadHistorial()
    }
    if (activeTab === "reportes" && reportes.length === 0) {
      loadReportes()
    }
  }, [activeTab])

  if (loading) {
    return (
      <div className="perfil-loading">
        <div className="loading-spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    )
  }

  const cerrarFormularioMedico = () => {
    setShowFormularioMedico(false)
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
              <button
                className={`menu-item ${activeTab === "historial" ? "active" : ""}`}
                onClick={() => setActiveTab("historial")}
              >
                <History size={20} />
                <span>Historial Médico</span>
              </button>
              <button
                className={`menu-item ${activeTab === "reportes" ? "active" : ""}`}
                onClick={() => setActiveTab("reportes")}
              >
                <FileText size={20} />
                <span>Reportes</span>
              </button>
              <button className="menu-item logout" onClick={handleLogout}>
                <LogOut size={20} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>

          <div className="perfil-main">
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}

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
                <div className="section-header-simple">
                  <h2 className="section-title-simple">Mis Citas</h2>
                  <button className="new-cita-btn" onClick={() => navigate("/citas")}>
                    <Plus size={16} />
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
                  <div className="appointments-list-simple">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="appointment-card-simple">
                        <div className="appointment-status-simple">
                          {appointment.status === "completed" || appointment.status === "confirmed"
                            ? "Completada"
                            : appointment.status === "pending"
                              ? "Pendiente"
                              : appointment.status === "cancelled"
                                ? "Cancelada"
                                : "Completada"}
                        </div>

                        <div className="appointment-icons">
                          <div className="appointment-icon">
                            <Calendar size={18} />
                          </div>
                          <div className="appointment-icon">
                            <Clock size={18} />
                          </div>
                        </div>

                        <div className="appointment-motivo">
                          <span className="motivo-label">Motivo:</span>
                          <span className="motivo-value">
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

                        <div className="appointment-divider"></div>

                        {appointment.status === "confirmed" && (
                          <div className="appointment-actions-simple">
                            <button
                              className="cancel-appointment-btn-simple"
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
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "historial" && (
              <div className="historial-section">
                <div className="section-header">
                  <h2 className="section-title">Historial Médico</h2>
                  <div className="historial-stats">
                    <div className="stat-item">
                      <Activity size={16} />
                      <span>{historialData.length} consultas</span>
                    </div>
                  </div>
                </div>

                <div className="historial-filters">
                  <div className="filter-group">
                    <div className="search-box">
                      <Search size={18} />
                      <input
                        type="text"
                        placeholder="Buscar en historial..."
                        value={busquedaHistorial}
                        onChange={(e) => setBusquedaHistorial(e.target.value)}
                      />
                    </div>
                    <select
                      value={filtroHistorial}
                      onChange={(e) => setFiltroHistorial(e.target.value)}
                      className="filter-select"
                    >
                      <option value="todos">Todos los tipos</option>
                      <option value="examen">Examen Visual</option>
                      <option value="seguimiento">Seguimiento</option>
                      <option value="consulta">Consulta Especializada</option>
                      <option value="emergencia">Emergencia</option>
                      <option value="reporte">Reporte Médico</option>
                    </select>
                  </div>
                </div>

                {loadingHistorial ? (
                  <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Cargando historial médico...</p>
                  </div>
                ) : historialFiltrado.length === 0 ? (
                  <div className="no-data">
                    <div className="no-data-icon">
                      <History size={40} />
                    </div>
                    <h3>No se encontraron registros</h3>
                    <p>No hay registros médicos que coincidan con tu búsqueda.</p>
                  </div>
                ) : (
                  <div className="historial-list">
                    {historialFiltrado.map((registro) => (
                      <div key={registro.id} className="historial-card">
                        <div className="historial-header">
                          <div className="historial-date">
                            <Calendar size={18} />
                            <span>{registro.fecha}</span>
                          </div>
                          <div className="historial-type">
                            <span className="type-badge">{registro.tipo}</span>
                          </div>
                        </div>
                        <div className="historial-content">
                          <div className="historial-doctor">
                            <strong>Doctor:</strong> {registro.doctor}
                          </div>
                          <div className="historial-diagnosis">
                            <strong>Diagnóstico:</strong> {registro.diagnostico}
                          </div>
                          <div className="historial-treatment">
                            <strong>Tratamiento:</strong> {registro.tratamiento}
                          </div>
                          <div className="historial-notes">
                            <strong>Notas:</strong> {registro.notas}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "reportes" && (
              <div className="reportes-section">
                <div className="section-header">
                  <h2 className="section-title">Reportes Médicos</h2>
                  <div className="reportes-actions">
                    <button
                      className="generate-report-btn"
                      onClick={() => generarReporte("Historial Completo")}
                      disabled={loadingReportes}
                    >
                      <FileText size={18} />
                      <span>Generar Reporte</span>
                    </button>
                  </div>
                </div>

                <div className="reportes-options">
                  <h3>Generar Nuevos Reportes</h3>
                  <div className="report-types">
                    <button
                      className="report-type-btn"
                      onClick={() => generarReporte("Evolución Visual")}
                      disabled={loadingReportes}
                    >
                      <TrendingUp size={20} />
                      <div>
                        <strong>Evolución Visual</strong>
                        <p>Análisis de cambios en la visión</p>
                      </div>
                    </button>
                    <button
                      className="report-type-btn"
                      onClick={() => generarReporte("Tratamientos")}
                      disabled={loadingReportes}
                    >
                      <Activity size={20} />
                      <div>
                        <strong>Reporte de Tratamientos</strong>
                        <p>Historial de tratamientos aplicados</p>
                      </div>
                    </button>
                    <button
                      className="report-type-btn"
                      onClick={() => generarReporte("Preventivo")}
                      disabled={loadingReportes}
                    >
                      <Eye size={20} />
                      <div>
                        <strong>Análisis Preventivo</strong>
                        <p>Recomendaciones de cuidado</p>
                      </div>
                    </button>
                  </div>
                </div>

                {loadingReportes ? (
                  <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Generando reporte...</p>
                  </div>
                ) : reportes.length === 0 ? (
                  <div className="no-data">
                    <div className="no-data-icon">
                      <FileText size={40} />
                    </div>
                    <h3>No hay reportes disponibles</h3>
                    <p>Genera tu primer reporte médico.</p>
                  </div>
                ) : (
                  <div className="reportes-list">
                    <h3>Reportes Disponibles</h3>
                    {reportes.map((reporte) => (
                      <div key={reporte.id} className="reporte-card">
                        <div className="reporte-icon">
                          <FileText size={24} />
                        </div>
                        <div className="reporte-info">
                          <h4>{reporte.nombre}</h4>
                          <p>{reporte.descripcion}</p>
                          <div className="reporte-meta">
                            <span>Creado: {reporte.fechaCreacion}</span>
                            <span>Tamaño: {reporte.tamaño}</span>
                            <span className={`estado ${reporte.estado}`}>
                              {reporte.estado === "disponible" ? "Disponible" : "Generando..."}
                            </span>
                          </div>
                        </div>
                        <div className="reporte-actions">
                          {reporte.estado === "disponible" ? (
                            <button className="download-btn" onClick={() => descargarReporte(reporte)}>
                              <Download size={16} />
                              Descargar
                            </button>
                          ) : (
                            <div className="generating-indicator">
                              <div className="mini-spinner"></div>
                              Generando...
                            </div>
                          )}
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
      {showFormularioMedico && (
        <FormularioReporteMedico
          onClose={cerrarFormularioMedico}
          pacienteInfo={null}
          onReporteGenerado={agregarNuevoReporte}
        />
      )}
    </div>
  )
}

export default Perfil


