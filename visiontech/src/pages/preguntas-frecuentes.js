"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone, Mail } from "lucide-react"

function PreguntasFrecuentes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todas")
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredFaqs, setFilteredFaqs] = useState([])

  // Simular carga de FAQs desde el backend
  useEffect(() => {
    loadFaqs()
  }, [])

  const loadFaqs = async () => {
    setLoading(true)
    // Simular llamada al backend
    setTimeout(() => {
      const mockFaqs = [
        {
          id: 1,
          categoria: "productos",
          pregunta: "¿Qué tipos de gafas ofrecen?",
          respuesta:
            "Ofrecemos una amplia gama de gafas incluyendo gafas de sol, monturas graduadas, lentes de contacto, y gafas especializadas para deportes. Todas nuestras gafas cuentan con la más alta calidad y las últimas tecnologías en óptica.",
          popularidad: 95,
        },
        {
          id: 2,
          categoria: "envios",
          pregunta: "¿Cuánto tiempo tarda el envío?",
          respuesta:
            "Los envíos estándar tardan entre 3-5 días hábiles. Ofrecemos envío express de 1-2 días hábiles por un costo adicional. Los envíos son gratuitos para compras superiores a $100.",
          popularidad: 88,
        },
        {
          id: 3,
          categoria: "garantia",
          pregunta: "¿Qué garantía tienen las gafas?",
          respuesta:
            "Todas nuestras gafas incluyen garantía de 2 años contra defectos de fabricación. Las gafas graduadas incluyen garantía adicional de 6 meses para ajustes de graduación.",
          popularidad: 92,
        },
        {
          id: 4,
          categoria: "productos",
          pregunta: "¿Puedo cambiar los lentes de mis gafas?",
          respuesta:
            "Sí, ofrecemos servicio de cambio de lentes para la mayoría de monturas. Puedes actualizar a lentes antirreflejantes, fotocromáticos, o con filtro de luz azul.",
          popularidad: 75,
        },
        {
          id: 5,
          categoria: "pagos",
          pregunta: "¿Qué métodos de pago aceptan?",
          respuesta:
            "Aceptamos tarjetas de crédito y débito (Visa, MasterCard, American Express), PayPal, transferencias bancarias y pagos en efectivo en nuestras tiendas físicas.",
          popularidad: 80,
        },
        {
          id: 6,
          categoria: "cuidado",
          pregunta: "¿Cómo debo cuidar mis gafas?",
          respuesta:
            "Limpia tus gafas con un paño de microfibra y solución limpiadora específica. Evita usar papel o telas ásperas. Guárdalas en su estuche cuando no las uses y evita dejarlas en lugares con temperaturas extremas.",
          popularidad: 70,
        },
      ]
      setFaqs(mockFaqs)
      setLoading(false)
    }, 1000)
  }

  // Filtrar FAQs
  useEffect(() => {
    let result = [...faqs]

    if (selectedCategory !== "todas") {
      result = result.filter((faq) => faq.categoria === selectedCategory)
    }

    if (searchTerm) {
      result = result.filter(
        (faq) =>
          faq.pregunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.respuesta.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Ordenar por popularidad
    result.sort((a, b) => b.popularidad - a.popularidad)

    setFilteredFaqs(result)
  }, [faqs, selectedCategory, searchTerm])

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  const categories = [
    { id: "todas", name: "Todas las categorías", count: faqs.length },
    { id: "productos", name: "Productos", count: faqs.filter((f) => f.categoria === "productos").length },
    { id: "envios", name: "Envíos", count: faqs.filter((f) => f.categoria === "envios").length },
    { id: "garantia", name: "Garantía", count: faqs.filter((f) => f.categoria === "garantia").length },
    { id: "pagos", name: "Pagos", count: faqs.filter((f) => f.categoria === "pagos").length },
    { id: "cuidado", name: "Cuidado", count: faqs.filter((f) => f.categoria === "cuidado").length },
  ]

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "rgba(230, 230, 230, 0.3)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1e2f5f", marginBottom: "10px" }}>
            Preguntas Frecuentes
          </h1>
          <p style={{ color: "#555", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros productos y servicios
          </p>
        </div>

        <div style={{ marginBottom: "40px", display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "500px" }}>
            <Search
              style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999",
                width: "20px",
                height: "20px",
              }}
            />
            <input
              type="text"
              placeholder="Buscar en preguntas frecuentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "15px 15px 15px 50px",
                border: "1px solid #ddd",
                borderRadius: "25px",
                fontSize: "1rem",
                backgroundColor: "white",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "40px" }}>
          <aside
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              height: "fit-content",
              position: "sticky",
              top: "20px",
            }}
          >
            <h3 style={{ fontSize: "1.2rem", color: "#1e2f5f", marginBottom: "20px", fontWeight: "600" }}>
              Categorías
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "30px" }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 15px",
                    border: "none",
                    background: selectedCategory === category.id ? "#1e2f5f" : "transparent",
                    borderRadius: "8px",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: "0.95rem",
                    color: selectedCategory === category.id ? "white" : "#333",
                  }}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <span style={{ fontSize: "0.8rem", opacity: "0.7" }}>({category.count})</span>
                </button>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
              <h4 style={{ fontSize: "1rem", color: "#1e2f5f", marginBottom: "15px" }}>
                ¿No encuentras lo que buscas?
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  <MessageCircle size={20} />
                  <span>Chat en vivo</span>
                </a>
                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  <Phone size={20} />
                  <span>Llamar soporte</span>
                </a>
                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  <Mail size={20} />
                  <span>Enviar email</span>
                </a>
              </div>
            </div>
          </aside>

          <main
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            }}
          >
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
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
                <p>Cargando preguntas frecuentes...</p>
              </div>
            ) : filteredFaqs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <HelpCircle size={48} style={{ color: "#ccc", marginBottom: "20px" }} />
                <h3 style={{ color: "#1e2f5f", marginBottom: "10px" }}>No se encontraron preguntas</h3>
                <p style={{ color: "#666" }}>
                  Intenta con otros términos de búsqueda o selecciona una categoría diferente.
                </p>
              </div>
            ) : (
              <>
                <div
                  style={{ padding: "20px 25px", borderBottom: "1px solid #eee", fontSize: "0.9rem", color: "#666" }}
                >
                  <p>
                    Mostrando {filteredFaqs.length} pregunta{filteredFaqs.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div style={{ padding: "0" }}>
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} style={{ borderBottom: "1px solid #eee" }}>
                      <button
                        style={{
                          width: "100%",
                          padding: "25px",
                          border: "none",
                          background: "none",
                          textAlign: "left",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          color: "#1e2f5f",
                        }}
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <span>{faq.pregunta}</span>
                        {expandedFaq === faq.id ? (
                          <ChevronUp style={{ width: "20px", height: "20px", flexShrink: "0" }} />
                        ) : (
                          <ChevronDown style={{ width: "20px", height: "20px", flexShrink: "0" }} />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div style={{ padding: "0 25px 25px" }}>
                          <p style={{ color: "#555", lineHeight: "1.6", marginBottom: "15px" }}>{faq.respuesta}</p>
                          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                            <span
                              style={{
                                backgroundColor: "rgba(30, 47, 95, 0.1)",
                                color: "#1e2f5f",
                                padding: "4px 10px",
                                borderRadius: "12px",
                                fontSize: "0.8rem",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {faq.categoria}
                            </span>
                            <span style={{ fontSize: "0.8rem", color: "#666" }}>Popularidad: {faq.popularidad}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default PreguntasFrecuentes
