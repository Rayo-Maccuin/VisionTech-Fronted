"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, MessageCircle, Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react"

function SoporteTecnico() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    categoria: "",
    prioridad: "media",
    asunto: "",
    descripcion: "",
  })

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    setLoading(true)
    setTimeout(() => {
      const mockTickets = [
        {
          id: "TK-001",
          asunto: "Problema con gafas graduadas",
          estado: "abierto",
          prioridad: "alta",
          fecha: "2024-01-15",
          categoria: "producto",
        },
        {
          id: "TK-002",
          asunto: "Consulta sobre garantía",
          estado: "en_proceso",
          prioridad: "media",
          fecha: "2024-01-14",
          categoria: "garantia",
        },
      ]
      setTickets(mockTickets)
      setLoading(false)
    }, 1000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const newTicket = {
        id: `TK-${String(tickets.length + 1).padStart(3, "0")}`,
        ...formData,
        estado: "abierto",
        fecha: new Date().toISOString().split("T")[0],
      }

      setTickets((prev) => [newTicket, ...prev])
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        categoria: "",
        prioridad: "media",
        asunto: "",
        descripcion: "",
      })
      setShowForm(false)
      setNotification({
        show: true,
        message: `Ticket ${newTicket.id} creado exitosamente. Te contactaremos pronto.`,
        type: "success",
      })
      setLoading(false)

      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" })
      }, 5000)
    }, 2000)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "abierto":
        return "#ff6b6b"
      case "en_proceso":
        return "#ffa726"
      case "resuelto":
        return "#4caf50"
      default:
        return "#666"
    }
  }

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case "alta":
        return "#f44336"
      case "media":
        return "#ff9800"
      case "baja":
        return "#4caf50"
      default:
        return "#666"
    }
  }

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "rgba(230, 230, 230, 0.3)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1e2f5f", marginBottom: "10px" }}>
            Soporte Técnico
          </h1>
          <p style={{ color: "#555", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Estamos aquí para ayudarte. Crea un ticket de soporte y nuestro equipo te contactará.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Phone style={{ width: "40px", height: "40px", color: "#1e2f5f" }} />
            <div>
              <h3 style={{ margin: "0 0 5px 0", color: "#1e2f5f" }}>Teléfono</h3>
              <p style={{ margin: "0 0 3px 0", fontWeight: "500" }}>+57 311 280 8028</p>
              <span style={{ fontSize: "0.85rem", color: "#666" }}>Lun-Vie 8AM-6PM</span>
            </div>
          </div>
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Mail style={{ width: "40px", height: "40px", color: "#1e2f5f" }} />
            <div>
              <h3 style={{ margin: "0 0 5px 0", color: "#1e2f5f" }}>Email</h3>
              <p style={{ margin: "0 0 3px 0", fontWeight: "500" }}>VisionTech@gmail.com</p>
              <span style={{ fontSize: "0.85rem", color: "#666" }}>Respuesta en 24h</span>
            </div>
          </div>
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <MessageCircle style={{ width: "40px", height: "40px", color: "#1e2f5f" }} />
            <div>
              <h3 style={{ margin: "0 0 5px 0", color: "#1e2f5f" }}>Chat en Vivo</h3>
              <p style={{ margin: "0 0 3px 0", fontWeight: "500" }}>Disponible ahora</p>
              <span style={{ fontSize: "0.85rem", color: "#666" }}>Respuesta inmediata</span>
            </div>
          </div>
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Clock style={{ width: "40px", height: "40px", color: "#1e2f5f" }} />
            <div>
              <h3 style={{ margin: "0 0 5px 0", color: "#1e2f5f" }}>Tiempo Promedio</h3>
              <p style={{ margin: "0 0 3px 0", fontWeight: "500" }}>2-4 horas</p>
              <span style={{ fontSize: "0.85rem", color: "#666" }}>Primera respuesta</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "40px" }}>
          <button
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              backgroundColor: "#1e2f5f",
              color: "white",
            }}
            onClick={() => setShowForm(true)}
          >
            Crear Nuevo Ticket
          </button>
          <button
            style={{
              padding: "12px 24px",
              border: "2px solid #1e2f5f",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              backgroundColor: "white",
              color: "#1e2f5f",
            }}
            onClick={loadTickets}
          >
            Actualizar Tickets
          </button>
        </div>

        {showForm && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: "1000",
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                width: "100%",
                maxWidth: "600px",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "25px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <h2 style={{ margin: "0", color: "#1e2f5f" }}>Crear Ticket de Soporte</h2>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#666",
                  }}
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit} style={{ padding: "25px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#1e2f5f" }}>
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#1e2f5f" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#1e2f5f" }}>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#1e2f5f" }}>
                      Categoría *
                    </label>
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="producto">Problema con producto</option>
                      <option value="garantia">Garantía</option>
                      <option value="envio">Envío y entrega</option>
                      <option value="facturacion">Facturación</option>
                      <option value="tecnico">Soporte técnico</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#1e2f5f" }}>
                    Asunto *
                  </label>
                  <input
                    type="text"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#1e2f5f" }}>
                    Descripción del problema *
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      resize: "vertical",
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end", marginTop: "30px" }}>
                  <button
                    type="button"
                    style={{
                      padding: "12px 24px",
                      border: "2px solid #1e2f5f",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      backgroundColor: "white",
                      color: "#1e2f5f",
                    }}
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "12px 24px",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: loading ? "not-allowed" : "pointer",
                      backgroundColor: "#1e2f5f",
                      color: "white",
                      opacity: loading ? "0.6" : "1",
                    }}
                  >
                    {loading ? "Creando..." : "Crear Ticket"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div style={{ marginTop: "50px" }}>
          <h2 style={{ fontSize: "1.8rem", color: "#1e2f5f", marginBottom: "25px", textAlign: "center" }}>
            Mis Tickets de Soporte
          </h2>
          {loading && tickets.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #1e2f5f",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 20px",
                }}
              ></div>
              <p>Cargando tickets...</p>
            </div>
          ) : tickets.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "12px" }}>
              <MessageCircle size={48} style={{ color: "#ccc", marginBottom: "20px" }} />
              <h3 style={{ color: "#1e2f5f", marginBottom: "10px" }}>No tienes tickets de soporte</h3>
              <p style={{ color: "#666" }}>Crea tu primer ticket para obtener ayuda de nuestro equipo.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <div style={{ fontWeight: "700", color: "#1e2f5f", fontSize: "1.1rem" }}>#{ticket.id}</div>
                    <div
                      style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        color: "white",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        textTransform: "capitalize",
                        backgroundColor: getEstadoColor(ticket.estado),
                      }}
                    >
                      {ticket.estado.replace("_", " ")}
                    </div>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", color: "#1e2f5f", marginBottom: "15px", lineHeight: "1.4" }}>
                    {ticket.asunto}
                  </h3>
                  <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.9rem", color: "#666" }}
                    >
                      <Calendar size={16} />
                      <span>{ticket.fecha}</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.9rem", color: "#666" }}
                    >
                      <AlertCircle size={16} />
                      <span style={{ color: getPrioridadColor(ticket.prioridad) }}>{ticket.prioridad}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: "rgba(30, 47, 95, 0.1)",
                      padding: "4px 10px",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      color: "#1e2f5f",
                      textTransform: "capitalize",
                    }}
                  >
                    {ticket.categoria}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {notification.show && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "15px 20px",
            borderRadius: "8px",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: "1001",
            backgroundColor: notification.type === "success" ? "#4caf50" : "#f44336",
          }}
        >
          {notification.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  )
}

export default SoporteTecnico
