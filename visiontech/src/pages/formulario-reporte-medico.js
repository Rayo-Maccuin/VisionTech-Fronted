"use client"

import { useState } from "react"
import { User, Calendar, Eye, Stethoscope, Save, X, CheckCircle, AlertCircle, UserCheck } from "lucide-react"
import "./FormularioReporteMedico.css"

function FormularioReporteMedico({ onClose, pacienteInfo = null, onReporteGenerado }) {
  const [formData, setFormData] = useState({
    // Información del paciente
    pacienteNombre: pacienteInfo?.nombre || "",
    pacienteEmail: pacienteInfo?.email || "",
    pacienteTelefono: pacienteInfo?.telefono || "",
    pacienteEdad: pacienteInfo?.edad || "",

    // Información de la cita
    fechaCita: new Date().toISOString().split("T")[0],
    horaCita: new Date().toTimeString().slice(0, 5),
    motivoConsulta: "",
    tipoConsulta: "examen-visual",

    // Examen médico
    agudezaVisualOD: "",
    agudezaVisualOI: "",
    presionIntraocular: "",
    examenFondoOjo: "",
    otrosExamenes: "",

    // Diagnóstico y tratamiento
    diagnosticoPrincipal: "",
    diagnosticoSecundario: "",
    tratamientoPrescrito: "",
    medicamentos: "",
    recomendaciones: "",

    // Seguimiento
    proximaCita: "",
    observacionesGenerales: "",
    doctorNombre: "Dr. Mario Sosa", 
  })

  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const [reporteGenerado, setReporteGenerado] = useState(false)

  const doctores = ["Dr. Mario Sosa", "Dra. María Taborda"]

  const tiposConsulta = [
    { value: "examen-visual", label: "Examen Visual" },
    { value: "seguimiento", label: "Consulta de Seguimiento" },
    { value: "emergencia", label: "Emergencia" },
    { value: "consulta-especializada", label: "Consulta Especializada" },
    { value: "lentes-contacto", label: "Adaptación Lentes de Contacto" },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)


    if (!formData.pacienteNombre || !formData.motivoConsulta || !formData.diagnosticoPrincipal) {
      setNotification({
        show: true,
        message: "Por favor completa todos los campos obligatorios",
        type: "error",
      })
      setLoading(false)
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000)
      return
    }


    setTimeout(() => {
      console.log("Reporte médico generado:", {
        ...formData,
        fechaGeneracion: new Date().toISOString(),
        reporteId: `RPT-${Date.now()}`,
      })


      if (onReporteGenerado) {
        onReporteGenerado(formData)
      }

      setReporteGenerado(true)
      setNotification({
        show: true,
        message: "Reporte médico generado exitosamente",
        type: "success",
      })
      setLoading(false)

      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" })
      }, 3000)
    }, 2000)
  }

  const resetForm = () => {
    setReporteGenerado(false)
    setFormData({
      pacienteNombre: "",
      pacienteEmail: "",
      pacienteTelefono: "",
      pacienteEdad: "",
      fechaCita: new Date().toISOString().split("T")[0],
      horaCita: new Date().toTimeString().slice(0, 5),
      motivoConsulta: "",
      tipoConsulta: "examen-visual",
      agudezaVisualOD: "",
      agudezaVisualOI: "",
      presionIntraocular: "",
      examenFondoOjo: "",
      otrosExamenes: "",
      diagnosticoPrincipal: "",
      diagnosticoSecundario: "",
      tratamientoPrescrito: "",
      medicamentos: "",
      recomendaciones: "",
      proximaCita: "",
      observacionesGenerales: "",
      doctorNombre: "Dr. Mario Sosa",
    })
  }

  if (reporteGenerado) {
    return (
      <div className="reporte-modal-overlay">
        <div className="reporte-modal">
          <div className="reporte-success">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2>¡Reporte Generado Exitosamente!</h2>
            <p>
              El reporte médico ha sido guardado en el historial del paciente y está disponible en la sección de
              reportes.
            </p>
            <div className="reporte-summary">
              <div className="summary-item">
                <strong>Paciente:</strong> {formData.pacienteNombre}
              </div>
              <div className="summary-item">
                <strong>Fecha:</strong> {formData.fechaCita}
              </div>
              <div className="summary-item">
                <strong>Diagnóstico:</strong> {formData.diagnosticoPrincipal}
              </div>
              <div className="summary-item">
                <strong>Doctor:</strong> {formData.doctorNombre}
              </div>
            </div>
            <div className="success-actions">
              <button className="btn-primary" onClick={resetForm}>
                Generar Otro Reporte
              </button>
              <button className="btn-secondary" onClick={onClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="reporte-modal-overlay">
      <div className="reporte-modal">
        <div className="reporte-header">
          <h2>Generar Reporte Médico</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {notification.show && (
          <div className={`notification ${notification.type}`}>
            {notification.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{notification.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="reporte-form">
          {/* Información del Paciente */}
          <div className="form-section">
            <div className="section-title">
              <User size={20} />
              <h3>Información del Paciente</h3>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="pacienteNombre">Nombre Completo *</label>
                <input
                  type="text"
                  id="pacienteNombre"
                  name="pacienteNombre"
                  value={formData.pacienteNombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pacienteEdad">Edad</label>
                <input
                  type="number"
                  id="pacienteEdad"
                  name="pacienteEdad"
                  value={formData.pacienteEdad}
                  onChange={handleInputChange}
                  min="1"
                  max="120"
                />
              </div>
              <div className="form-group">
                <label htmlFor="pacienteEmail">Email</label>
                <input
                  type="email"
                  id="pacienteEmail"
                  name="pacienteEmail"
                  value={formData.pacienteEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pacienteTelefono">Teléfono</label>
                <input
                  type="tel"
                  id="pacienteTelefono"
                  name="pacienteTelefono"
                  value={formData.pacienteTelefono}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Información de la Cita */}
          <div className="form-section">
            <div className="section-title">
              <Calendar size={20} />
              <h3>Información de la Cita</h3>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fechaCita">Fecha de la Cita</label>
                <input
                  type="date"
                  id="fechaCita"
                  name="fechaCita"
                  value={formData.fechaCita}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="horaCita">Hora de la Cita</label>
                <input
                  type="time"
                  id="horaCita"
                  name="horaCita"
                  value={formData.horaCita}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tipoConsulta">Tipo de Consulta</label>
                <select
                  id="tipoConsulta"
                  name="tipoConsulta"
                  value={formData.tipoConsulta}
                  onChange={handleInputChange}
                  required
                >
                  {tiposConsulta.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="doctorNombre">Doctor Responsable</label>
                <select
                  id="doctorNombre"
                  name="doctorNombre"
                  value={formData.doctorNombre}
                  onChange={handleInputChange}
                  required
                >
                  {doctores.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="motivoConsulta">Motivo de la Consulta *</label>
              <textarea
                id="motivoConsulta"
                name="motivoConsulta"
                value={formData.motivoConsulta}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>
          </div>

          {/* Examen Médico */}
          <div className="form-section">
            <div className="section-title">
              <Eye size={20} />
              <h3>Examen Médico</h3>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="agudezaVisualOD">Agudeza Visual OD</label>
                <input
                  type="text"
                  id="agudezaVisualOD"
                  name="agudezaVisualOD"
                  value={formData.agudezaVisualOD}
                  onChange={handleInputChange}
                  placeholder="Ej: 20/20"
                />
              </div>
              <div className="form-group">
                <label htmlFor="agudezaVisualOI">Agudeza Visual OI</label>
                <input
                  type="text"
                  id="agudezaVisualOI"
                  name="agudezaVisualOI"
                  value={formData.agudezaVisualOI}
                  onChange={handleInputChange}
                  placeholder="Ej: 20/25"
                />
              </div>
              <div className="form-group">
                <label htmlFor="presionIntraocular">Presión Intraocular</label>
                <input
                  type="text"
                  id="presionIntraocular"
                  name="presionIntraocular"
                  value={formData.presionIntraocular}
                  onChange={handleInputChange}
                  placeholder="Ej: 15 mmHg"
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="examenFondoOjo">Examen de Fondo de Ojo</label>
              <textarea
                id="examenFondoOjo"
                name="examenFondoOjo"
                value={formData.examenFondoOjo}
                onChange={handleInputChange}
                rows="3"
                placeholder="Descripción del examen de fondo de ojo..."
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="otrosExamenes">Otros Exámenes Realizados</label>
              <textarea
                id="otrosExamenes"
                name="otrosExamenes"
                value={formData.otrosExamenes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Descripción de otros exámenes..."
              />
            </div>
          </div>

          {/* Diagnóstico y Tratamiento */}
          <div className="form-section">
            <div className="section-title">
              <Stethoscope size={20} />
              <h3>Diagnóstico y Tratamiento</h3>
            </div>
            <div className="form-group full-width">
              <label htmlFor="diagnosticoPrincipal">Diagnóstico Principal *</label>
              <textarea
                id="diagnosticoPrincipal"
                name="diagnosticoPrincipal"
                value={formData.diagnosticoPrincipal}
                onChange={handleInputChange}
                rows="3"
                required
                placeholder="Diagnóstico principal del paciente..."
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="diagnosticoSecundario">Diagnóstico Secundario</label>
              <textarea
                id="diagnosticoSecundario"
                name="diagnosticoSecundario"
                value={formData.diagnosticoSecundario}
                onChange={handleInputChange}
                rows="2"
                placeholder="Diagnósticos adicionales..."
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="tratamientoPrescrito">Tratamiento Prescrito</label>
              <textarea
                id="tratamientoPrescrito"
                name="tratamientoPrescrito"
                value={formData.tratamientoPrescrito}
                onChange={handleInputChange}
                rows="3"
                placeholder="Descripción del tratamiento prescrito..."
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="medicamentos">Medicamentos</label>
              <textarea
                id="medicamentos"
                name="medicamentos"
                value={formData.medicamentos}
                onChange={handleInputChange}
                rows="3"
                placeholder="Medicamentos prescritos con dosis y frecuencia..."
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="recomendaciones">Recomendaciones</label>
              <textarea
                id="recomendaciones"
                name="recomendaciones"
                value={formData.recomendaciones}
                onChange={handleInputChange}
                rows="3"
                placeholder="Recomendaciones para el paciente..."
              />
            </div>
          </div>

          {/* Seguimiento */}
          <div className="form-section">
            <div className="section-title">
              <UserCheck size={20} />
              <h3>Seguimiento</h3>
            </div>
            <div className="form-group">
              <label htmlFor="proximaCita">Próxima Cita Recomendada</label>
              <input
                type="date"
                id="proximaCita"
                name="proximaCita"
                value={formData.proximaCita}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="observacionesGenerales">Observaciones Generales</label>
              <textarea
                id="observacionesGenerales"
                name="observacionesGenerales"
                value={formData.observacionesGenerales}
                onChange={handleInputChange}
                rows="4"
                placeholder="Observaciones adicionales sobre la consulta..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Generando Reporte...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Generar Reporte
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormularioReporteMedico

