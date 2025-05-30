"use client"

import { useState } from "react"
import { Calendar, Users, FileText, Plus, Search, Filter } from "lucide-react"
import FormularioReporteMedico from "./formulario-reporte-medico"
import "./AppMedico.css"

function AppMedico() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [showFormulario, setShowFormulario] = useState(false)
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null)
  const [citas, setCitas] = useState([
    {
      id: 1,
      paciente: "María García",
      fecha: "2024-03-25",
      hora: "09:00",
      tipo: "Examen Visual",
      estado: "completada",
      telefono: "+1234567890",
      email: "maria.garcia@email.com",
      edad: 35,
    },
    {
      id: 2,
      paciente: "Carlos Rodríguez",
      fecha: "2024-03-25",
      hora: "10:30",
      tipo: "Seguimiento",
      estado: "pendiente",
      telefono: "+1234567891",
      email: "carlos.rodriguez@email.com",
      edad: 42,
    },
    {
      id: 3,
      paciente: "Laura Martínez",
      fecha: "2024-03-25",
      hora: "14:00",
      tipo: "Consulta Especializada",
      estado: "confirmada",
      telefono: "+1234567892",
      email: "laura.martinez@email.com",
      edad: 28,
    },
  ])

  const abrirFormularioReporte = (paciente = null) => {
    if (paciente) {
      setPacienteSeleccionado({
        nombre: paciente.paciente,
        email: paciente.email,
        telefono: paciente.telefono,
        edad: paciente.edad,
      })
    } else {
      setPacienteSeleccionado(null)
    }
    setShowFormulario(true)
  }

  const cerrarFormulario = () => {
    setShowFormulario(false)
    setPacienteSeleccionado(null)
  }

  return (
    <div className="app-medico">
      <nav className="medico-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <h2>Panel Médico - VisionTech</h2>
          </div>
          <div className="nav-menu">
            <button
              className={`nav-item ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveSection("dashboard")}
            >
              <Calendar size={20} />
              Dashboard
            </button>
            <button
              className={`nav-item ${activeSection === "citas" ? "active" : ""}`}
              onClick={() => setActiveSection("citas")}
            >
              <Users size={20} />
              Citas del Día
            </button>
            <button
              className={`nav-item ${activeSection === "reportes" ? "active" : ""}`}
              onClick={() => setActiveSection("reportes")}
            >
              <FileText size={20} />
              Generar Reportes
            </button>
          </div>
        </div>
      </nav>

      <main className="medico-main">
        {activeSection === "dashboard" && (
          <div className="dashboard-section">
            <div className="dashboard-header">
              <h1>Dashboard Médico</h1>
              <p>Resumen de actividades del día</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <Calendar size={32} />
                </div>
                <div className="stat-content">
                  <h3>8</h3>
                  <p>Citas Hoy</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <Users size={32} />
                </div>
                <div className="stat-content">
                  <h3>5</h3>
                  <p>Completadas</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FileText size={32} />
                </div>
                <div className="stat-content">
                  <h3>3</h3>
                  <p>Reportes Pendientes</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h2>Acciones Rápidas</h2>
              <div className="actions-grid">
                <button className="action-btn" onClick={() => abrirFormularioReporte()}>
                  <Plus size={24} />
                  <span>Nuevo Reporte</span>
                </button>
                <button className="action-btn" onClick={() => setActiveSection("citas")}>
                  <Calendar size={24} />
                  <span>Ver Citas</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "citas" && (
          <div className="citas-section">
            <div className="section-header">
              <h1>Citas del Día</h1>
              <div className="header-actions">
                <div className="search-box">
                  <Search size={18} />
                  <input type="text" placeholder="Buscar paciente..." />
                </div>
                <button className="filter-btn">
                  <Filter size={18} />
                  Filtrar
                </button>
              </div>
            </div>

            <div className="citas-list">
              {citas.map((cita) => (
                <div key={cita.id} className={`cita-card ${cita.estado}`}>
                  <div className="cita-header">
                    <div className="cita-time">
                      <span className="hora">{cita.hora}</span>
                      <span className="fecha">{cita.fecha}</span>
                    </div>
                    <div className={`estado-badge ${cita.estado}`}>
                      {cita.estado === "completada"
                        ? "Completada"
                        : cita.estado === "pendiente"
                          ? "Pendiente"
                          : "Confirmada"}
                    </div>
                  </div>
                  <div className="cita-content">
                    <h3>{cita.paciente}</h3>
                    <p className="cita-tipo">{cita.tipo}</p>
                    <div className="cita-contacto">
                      <span>{cita.telefono}</span>
                      <span>{cita.email}</span>
                    </div>
                  </div>
                  <div className="cita-actions">
                    {cita.estado === "completada" ? (
                      <button className="btn-reporte" onClick={() => abrirFormularioReporte(cita)}>
                        <FileText size={16} />
                        Generar Reporte
                      </button>
                    ) : (
                      <button className="btn-atender">
                        <Users size={16} />
                        Atender
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "reportes" && (
          <div className="reportes-section">
            <div className="section-header">
              <h1>Generar Reportes Médicos</h1>
              <button className="btn-nuevo-reporte" onClick={() => abrirFormularioReporte()}>
                <Plus size={18} />
                Nuevo Reporte
              </button>
            </div>

            <div className="reportes-info">
              <div className="info-card">
                <h3>¿Cómo generar un reporte?</h3>
                <ol>
                  <li>Selecciona una cita completada o crea un nuevo reporte</li>
                  <li>Completa toda la información médica requerida</li>
                  <li>Revisa los datos antes de guardar</li>
                  <li>El reporte se guardará automáticamente en el historial del paciente</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>

      {showFormulario && <FormularioReporteMedico onClose={cerrarFormulario} pacienteInfo={pacienteSeleccionado} />}
    </div>
  )
}

export default AppMedico
