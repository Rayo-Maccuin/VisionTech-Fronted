"use client"

import { useState, useEffect } from "react"
import { Star, Send, CheckCircle, BarChart3, TrendingUp, Users, MessageSquare } from "lucide-react"

function EncuestasSatisfaccion() {
  const [currentSurvey, setCurrentSurvey] = useState(null)
  const [responses, setResponses] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [surveys, setSurveys] = useState([])
  const [stats, setStats] = useState(null)
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })

  useEffect(() => {
    loadSurveys()
    loadStats()
  }, [])

  const loadSurveys = async () => {
    setLoading(true)
    // Simular llamada al backend
    setTimeout(() => {
      const mockSurveys = [
        {
          id: 1,
          titulo: "Satisfacción con el Producto",
          descripcion: "Ayúdanos a mejorar evaluando tu experiencia con nuestras gafas",
          activa: true,
          preguntas: [
            {
              id: 1,
              tipo: "rating",
              pregunta: "¿Qué tan satisfecho estás con la calidad de tus gafas?",
              requerida: true,
            },
            {
              id: 2,
              tipo: "rating",
              pregunta: "¿Cómo calificarías nuestro servicio al cliente?",
              requerida: true,
            },
            {
              id: 3,
              tipo: "multiple",
              pregunta: "¿Qué aspecto es más importante para ti?",
              opciones: ["Calidad", "Precio", "Diseño", "Comodidad", "Durabilidad"],
              requerida: true,
            },
            {
              id: 4,
              tipo: "texto",
              pregunta: "¿Qué podríamos mejorar en nuestros productos o servicios?",
              requerida: false,
            },
            {
              id: 5,
              tipo: "rating",
              pregunta: "¿Recomendarías nuestros productos a un amigo?",
              requerida: true,
            },
          ],
        },
      ]
      setSurveys(mockSurveys)
      if (mockSurveys.length > 0) {
        setCurrentSurvey(mockSurveys[0])
      }
      setLoading(false)
    }, 1000)
  }

  const loadStats = async () => {
    // Simular carga de estadísticas
    setTimeout(() => {
      setStats({
        totalRespuestas: 1247,
        satisfaccionPromedio: 4.2,
        nps: 68,
        respuestasEsteMes: 156,
      })
    }, 1200)
  }

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validar preguntas requeridas
    const requiredQuestions = currentSurvey.preguntas.filter((q) => q.requerida)
    const missingResponses = requiredQuestions.filter((q) => !responses[q.id])

    if (missingResponses.length > 0) {
      setNotification({
        show: true,
        message: "Por favor completa todas las preguntas requeridas",
        type: "error",
      })
      setLoading(false)
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000)
      return
    }

    // Simular envío al backend
    setTimeout(() => {
      console.log("Enviando respuestas:", {
        surveyId: currentSurvey.id,
        responses: responses,
        timestamp: new Date().toISOString(),
      })

      setSubmitted(true)
      setNotification({
        show: true,
        message: "¡Gracias por tu feedback! Tus respuestas han sido enviadas.",
        type: "success",
      })
      setLoading(false)

      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" })
      }, 5000)
    }, 2000)
  }

  const renderQuestion = (question) => {
    switch (question.tipo) {
      case "rating":
        return (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "15px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: responses[question.id] >= star ? "#ffc107" : "#ddd",
                    padding: "5px",
                  }}
                  onClick={() => handleResponseChange(question.id, star)}
                >
                  <Star size={24} fill={responses[question.id] >= star ? "#ffc107" : "none"} />
                </button>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#666" }}>
              <span>Muy insatisfecho</span>
              <span>Muy satisfecho</span>
            </div>
          </div>
        )

      case "multiple":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {question.opciones.map((opcion) => (
              <label
                key={opcion}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={opcion}
                  checked={responses[question.id] === opcion}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  style={{ width: "18px", height: "18px" }}
                />
                <span>{opcion}</span>
              </label>
            ))}
          </div>
        )

      case "texto":
        return (
          <textarea
            placeholder="Escribe tu respuesta aquí..."
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            rows="4"
            style={{
              width: "100%",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        )

      default:
        return null
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: "40px 20px", backgroundColor: "rgba(230, 230, 230, 0.3)", minHeight: "100vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <CheckCircle size={64} style={{ color: "#4caf50", marginBottom: "20px" }} />
            <h1 style={{ color: "#1e2f5f", marginBottom: "15px", fontSize: "2rem" }}>¡Gracias por tu feedback!</h1>
            <p style={{ color: "#666", marginBottom: "30px", lineHeight: "1.6" }}>
              Tus respuestas han sido enviadas exitosamente. Tu opinión nos ayuda a mejorar continuamente.
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
              <button
                style={{
                  padding: "12px 30px",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  backgroundColor: "#1e2f5f",
                  color: "white",
                }}
                onClick={() => {
                  setSubmitted(false)
                  setResponses({})
                  setCurrentSurvey(surveys[0])
                }}
              >
                Responder otra encuesta
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "rgba(230, 230, 230, 0.3)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1e2f5f", marginBottom: "10px" }}>
            Encuestas de Satisfacción
          </h1>
          <p style={{ color: "#555", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Tu opinión es muy importante para nosotros. Ayúdanos a mejorar nuestros productos y servicios.
          </p>
        </div>

        {stats && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
              <Users style={{ width: "40px", height: "40px", color: "#1e2f5f" }} />
              <div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1e2f5f", margin: "0 0 5px 0" }}>
                  {stats.totalRespuestas.toLocaleString()}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#666", margin: "0" }}>Respuestas totales</p>
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
              <Star style={{ width: "40px", height: "40px", color: "#1e2f5f" }} />
              <div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1e2f5f", margin: "0 0 5px 0" }}>
                  {stats.satisfaccionPromedio}/5
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#666", margin: "0" }}>Satisfacción promedio</p>
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
              <TrendingUp style={{ width: "40px", height: "40px", color: "#1e2f5f" }} />
              <div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1e2f5f", margin: "0 0 5px 0" }}>
                  {stats.nps}%
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#666", margin: "0" }}>Net Promoter Score</p>
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
              <BarChart3 style={{ width: "40px", height: "40px", color: "#1e2f5f" }} />
              <div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1e2f5f", margin: "0 0 5px 0" }}>
                  {stats.respuestasEsteMes}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#666", margin: "0" }}>Respuestas este mes</p>
              </div>
            </div>
          </div>
        )}

        {currentSurvey && (
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "30px",
                borderBottom: "1px solid #eee",
                background: "linear-gradient(135deg, #1e2f5f, #2c4a8c)",
                color: "white",
              }}
            >
              <h2 style={{ margin: "0 0 10px 0", fontSize: "1.5rem" }}>{currentSurvey.titulo}</h2>
              <p style={{ margin: "0 0 20px 0", opacity: "0.9" }}>{currentSurvey.descripcion}</p>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "3px",
                  overflow: "hidden",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    width: `${(Object.keys(responses).length / currentSurvey.preguntas.length) * 100}%`,
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <span style={{ fontSize: "0.9rem", opacity: "0.9" }}>
                {Object.keys(responses).length} de {currentSurvey.preguntas.length} preguntas respondidas
              </span>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "30px" }}>
              {currentSurvey.preguntas.map((question, index) => (
                <div
                  key={question.id}
                  style={{
                    marginBottom: "40px",
                    paddingBottom: "30px",
                    borderBottom: index < currentSurvey.preguntas.length - 1 ? "1px solid #eee" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "15px", marginBottom: "20px" }}>
                    <span
                      style={{
                        backgroundColor: "#1e2f5f",
                        color: "white",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        flexShrink: "0",
                      }}
                    >
                      {index + 1}
                    </span>
                    <h3 style={{ margin: "0", color: "#1e2f5f", fontSize: "1.1rem", lineHeight: "1.4" }}>
                      {question.pregunta}
                      {question.requerida && <span style={{ color: "#f44336", marginLeft: "4px" }}>*</span>}
                    </h3>
                  </div>
                  <div>{renderQuestion(question)}</div>
                </div>
              ))}

              <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "12px 30px",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#1e2f5f",
                    color: "white",
                    opacity: loading ? "0.6" : "1",
                  }}
                >
                  {loading ? (
                    <>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid transparent",
                          borderTop: "2px solid currentColor",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar Respuestas
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
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
          {notification.type === "success" ? <CheckCircle size={20} /> : <MessageSquare size={20} />}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  )
}

export default EncuestasSatisfaccion
