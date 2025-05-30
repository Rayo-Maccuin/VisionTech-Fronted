"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import { BarChart3, Share2, HeadphonesIcon, HelpCircle, X, Star, CheckCircle, Users, Award } from "lucide-react"
import SoporteTecnico from "./soporte-tecnico"
import PreguntasFrecuentes from "./preguntas-frecuentes"
import EncuestasSatisfaccion from "./encuestas-satisfaccion"
import CompartirRedes from "./compartir-redes"
import "./Home.css"

function Home() {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (modalType) => {
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const renderModal = () => {
    if (!activeModal) return null

    let ModalComponent
    switch (activeModal) {
      case "soporte":
        ModalComponent = SoporteTecnico
        break
      case "faq":
        ModalComponent = PreguntasFrecuentes
        break
      case "encuestas":
        ModalComponent = EncuestasSatisfaccion
        break
      case "compartir":
        ModalComponent = CompartirRedes
        break
      default:
        return null
    }

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <button className="modal-close" onClick={closeModal}>
            <X size={24} />
          </button>
          <div className="modal-content">
            <ModalComponent />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Tu Visión, Nuestra Pasión</h1>
              <p className="hero-description">
                Más de 15 años cuidando tu salud visual con tecnología de vanguardia y el mejor equipo de especialistas.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">15,000+</span>
                  <span className="stat-label">Pacientes Atendidos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfacción</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Años de Experiencia</span>
                </div>
              </div>
              <div className="hero-buttons">
                <Link to="/productos" className="btn btn-white">
                  Ver Productos
                </Link>
                <Link to="/citas" className="btn btn-secondary">
                  Agendar Cita
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img src="portada.png" alt="Gafas de calidad" className="hero-img" />
              <div className="hero-badge">
                <Award size={24} />
                <span>Certificados ISO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nuestros Servicios Especializados</h2>
            <p className="section-subtitle">
              Ofrecemos atención integral para el cuidado de tu visión con los más altos estándares de calidad
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card featured">
              <div className="service-icon">👁️</div>
              <h3 className="service-title">Exámenes Visuales Completos</h3>
              <p className="service-description">
                Evaluaciones exhaustivas con tecnología de última generación para detectar cualquier problema visual.
              </p>
              <ul className="service-features">
                <li>Refracción computarizada</li>
                <li>Examen de fondo de ojo</li>
                <li>Medición de presión intraocular</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🛍️</div>
              <h3 className="service-title">Gafas Premium</h3>
              <p className="service-description">
                Amplia selección de monturas y lentes de las mejores marcas internacionales.
              </p>
              <ul className="service-features">
                <li>Marcas reconocidas mundialmente</li>
                <li>Lentes con tecnología avanzada</li>
                <li>Garantía extendida</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">📅</div>
              <h3 className="service-title">Atención Personalizada</h3>
              <p className="service-description">
                Citas flexibles y seguimiento continuo para garantizar tu satisfacción.
              </p>
              <ul className="service-features">
                <li>Horarios flexibles</li>
                <li>Seguimiento post-venta</li>
                <li>Atención prioritaria</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Productos Destacados</h2>
            <p className="section-subtitle">
              Descubre nuestra colección exclusiva de gafas diseñadas para cada estilo y necesidad
            </p>
          </div>

          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <img src="retro.png" alt="Gafas Estilo Redondo Retro" />
                <div className="product-badge">Bestseller</div>
              </div>
              <div className="product-info">
                <h3 className="product-title">Gafas Estilo Redondo Retro</h3>
                <div className="product-rating">
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <span>(127 reseñas)</span>
                </div>
                <p className="product-description">
                  Estilo vintage con tecnología moderna. Perfectas para quienes buscan un look clásico y sofisticado.
                </p>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="wayfarer.png" alt="Wayfarer Moderno" />
                <div className="product-badge new">Nuevo</div>
              </div>
              <div className="product-info">
                <h3 className="product-title">Wayfarer Moderno</h3>
                <div className="product-rating">
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <span>(89 reseñas)</span>
                </div>
                <p className="product-description">
                  Diseño contemporáneo con líneas definidas. Ideales para uso diario y ocasiones especiales.
                </p>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="luxury.png" alt="Luxury Rimless Square" />
                <div className="product-badge premium">Premium</div>
              </div>
              <div className="product-info">
                <h3 className="product-title">Luxury Rimless Square</h3>
                <div className="product-rating">
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <span>(156 reseñas)</span>
                </div>
                <p className="product-description">
                  Elegancia sin límites. Diseño minimalista con detalles dorados para el usuario más exigente.
                </p>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="cat.png" alt="Gafas estilo Cat-Eye" />
              </div>
              <div className="product-info">
                <h3 className="product-title">Gafas Cat-Eye Elegantes</h3>
                <div className="product-rating">
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <Star size={16} fill="#ffc107" color="#ffc107" />
                  <span>(203 reseñas)</span>
                </div>
                <p className="product-description">
                  Feminidad y elegancia en cada detalle. Perfectas para resaltar tu personalidad única.
                </p>
              </div>
            </div>
          </div>

          <div className="products-cta">
            <Link to="/productos" className="btn btn-primary">
              Explorar Toda la Colección
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Historias de Éxito</h2>
            <p className="section-subtitle">
              Miles de clientes satisfechos confían en nosotros para el cuidado de su visión
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">
                  "Increíble atención y profesionalismo. El Dr. Mario Sosa me ayudó a encontrar la solución perfecta
                  para mi problema visual. ¡Recomendado al 100%!"
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>MG</span>
                </div>
                <div className="author-info">
                  <h4>María García</h4>
                  <p>Cliente desde 2020</p>
                  <div className="author-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#ffc107" color="#ffc107" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">
                  "La Dra. María Taborda es excepcional. Su diagnóstico fue preciso y el tratamiento ha sido muy
                  efectivo. El equipo es muy amable y profesional."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>CR</span>
                </div>
                <div className="author-info">
                  <h4>Carlos Rodríguez</h4>
                  <p>Cliente desde 2019</p>
                  <div className="author-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#ffc107" color="#ffc107" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">
                  "Excelente servicio desde la primera consulta. Las gafas que compré superaron mis expectativas.
                  Definitivamente volveré para mis próximas revisiones."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>LM</span>
                </div>
                <div className="author-info">
                  <h4>Laura Martínez</h4>
                  <p>Cliente desde 2021</p>
                  <div className="author-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#ffc107" color="#ffc107" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">¿Por Qué Somos Tu Mejor Opción?</h2>
            <p className="section-subtitle">
              Nos diferenciamos por nuestro compromiso con la excelencia y la satisfacción del cliente
            </p>
          </div>

          <div className="why-us-grid">
            <div className="why-us-item">
              <div className="why-us-icon">
                <CheckCircle size={32} />
              </div>
              <div className="why-us-content">
                <h3 className="why-us-title">Garantía de Calidad</h3>
                <p className="why-us-description">
                  Todos nuestros productos cuentan con garantía extendida y certificaciones internacionales de calidad.
                </p>
              </div>
            </div>

            <div className="why-us-item">
              <div className="why-us-icon">
                <Users size={32} />
              </div>
              <div className="why-us-content">
                <h3 className="why-us-title">Equipo Especializado</h3>
                <p className="why-us-description">
                  Nuestros oftalmólogos están certificados y cuentan con años de experiencia en el sector.
                </p>
              </div>
            </div>

            <div className="why-us-item">
              <div className="why-us-icon">
                <Award size={32} />
              </div>
              <div className="why-us-content">
                <h3 className="why-us-title">Reconocimiento</h3>
                <p className="why-us-description">
                  Premiados como la mejor óptica de la región por tres años consecutivos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services Section */}
      <section className="support-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Centro de Atención al Cliente</h2>
            <p className="section-subtitle">Estamos aquí para ayudarte en cada paso de tu experiencia con nosotros</p>
          </div>

          <div className="support-grid">
            <div className="support-card" onClick={() => openModal("soporte")}>
              <div className="support-icon">
                <HeadphonesIcon size={28} />
              </div>
              <div className="support-content">
                <h3>Soporte Técnico</h3>
                <p>Resolvemos tus dudas técnicas y problemas con productos</p>
                <span className="support-link">Solicitar ayuda →</span>
              </div>
            </div>

            <div className="support-card" onClick={() => openModal("faq")}>
              <div className="support-icon">
                <HelpCircle size={28} />
              </div>
              <div className="support-content">
                <h3>Preguntas Frecuentes</h3>
                <p>Encuentra respuestas rápidas a las consultas más comunes</p>
                <span className="support-link">Ver FAQ →</span>
              </div>
            </div>

            <div className="support-card" onClick={() => openModal("encuestas")}>
              <div className="support-icon">
                <BarChart3 size={28} />
              </div>
              <div className="support-content">
                <h3>Comparte tu Experiencia</h3>
                <p>Tu opinión nos ayuda a mejorar nuestros servicios</p>
                <span className="support-link">Dar feedback →</span>
              </div>
            </div>

            <div className="support-card" onClick={() => openModal("compartir")}>
              <div className="support-icon">
                <Share2 size={28} />
              </div>
              <div className="support-content">
                <h3>Comparte con Amigos</h3>
                <p>Recomienda nuestros productos en redes sociales</p>
                <span className="support-link">Compartir →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para Cuidar tu Visión?</h2>
            <p className="cta-description">
              Agenda una cita con nuestros especialistas y descubre por qué somos la opción preferida de miles de
              clientes.
            </p>
            <div className="cta-buttons">
              <Link to="/citas" className="btn btn-white">
                Agendar Cita Ahora
              </Link>
              <Link to="/contacto" className="btn btn-outline">
                Más Información
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal para mostrar los componentes */}
      {renderModal()}
    </div>
  )
}

export default Home



