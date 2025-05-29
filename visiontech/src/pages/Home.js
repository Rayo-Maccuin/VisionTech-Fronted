import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Cuida tu visión con los expertos</h1>
              <p className="hero-description">
                En VisionTech encontrarás las mejores gafas y la atención oftalmológica más profesional.
              </p>
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
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👁️</div>
              <h3 className="feature-title">Exámenes Visuales</h3>
              <p className="feature-description">
                Evaluaciones completas de la salud visual con tecnología de vanguardia.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛍️</div>
              <h3 className="feature-title">Gafas de Calidad</h3>
              <p className="feature-description">Amplia selección de monturas y lentes de las mejores marcas.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">Citas Flexibles</h3>
              <p className="feature-description">Programa tu cita fácilmente según tu disponibilidad.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Productos Destacados</h2>
          <p className="section-description">
            Descubre nuestra selección de gafas de sol y monturas para todos los estilos y necesidades.
          </p>

<div className="products-grid">
  <div className="product-card">
    <div className="product-image">
      <img src="retro.png"/>
    </div>
    <div className="product-info">
      <h3 className="product-title">Gafas Estilo Redondo Retro</h3>
      <div className="product-rating">★★★★★</div>
      <p className="product-description">Las gafas de estilo redondo retro están disponibles en varios modelos, incluyendo opciones de sol y monturas de metal.</p>
      <div className="product-footer">
      </div>
    </div>
  </div>

  <div className="product-card">
    <div className="product-image">
      <img src="wayfarer.png" />
    </div>
    <div className="product-info">
      <h3 className="product-title">Wayfarer Moderno</h3>
      <div className="product-rating">★★★★★</div>
      <p className="product-description">Gafas estilo Wayfarer Moderno con un diseño elegante y versátil. Montura negra mate con líneas definidas, perfectas para un look contemporáneo y sofisticado. Ideales para quienes buscan un equilibrio entre estilo clásico y modernidad.</p>
      <div className="product-footer">
      </div>
    </div>
  </div>

  <div className="product-card">
    <div className="product-image">
      <img src="luxury.png" />
    </div>
    <div className="product-info">
      <h3 className="product-title">Luxury Rimless Square Sunglasses</h3>
      <div className="product-rating">★★★★★</div>
      <p className="product-description">Anteojos de lujo estilo retro urbano sin montura, con diseño cuadrado y detalles metálicos dorados. Lentes oscuros y estructura refinada para un look sofisticado y llamativo.</p>
      <div className="product-footer">
      </div>
    </div>
  </div>

  <div className="product-card">
    <div className="product-image">
      <img src="cat.png" />
    </div>
    <div className="product-info">
      <h3 className="product-title">Gafas estilo Cat-Eye</h3>
      <div className="product-rating">★★★★★</div>
      <p className="product-description">Gafas estilo Cat-Eye con montura negra brillante y lentes oscuros. Un diseño atrevido y femenino que combina elegancia retro con un toque moderno.</p>
      <div className="product-footer">
      </div>
    </div>
  </div>
</div>


          <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-primary">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>

          <div className="testimonials-grid">
            {[
              {
                name: "María García",
                text: "Excelente atención y profesionalismo. Me encantaron mis nuevas gafas y el servicio fue impecable.",
              },
              {
                name: "Carlos Rodríguez",
                text: "El doctor fue muy amable y me explicó todo el proceso. Las gafas que compré son de excelente calidad.",
              },
              {
                name: "Laura Martínez",
                text: "Muy satisfecha con mi experiencia en VisionTech. El sistema de citas online es muy conveniente.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    <span className="avatar-text">👤</span>
                  </div>
                  <div className="testimonial-meta">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <div className="testimonial-rating">{"★".repeat(5)}</div>
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">¿Listo para mejorar tu visión?</h2>
          <p className="cta-description">
            Agenda una cita con nuestros especialistas y descubre la diferencia de VisionTech.
          </p>
          <Link to="/citas" className="btn btn-white">
            Agendar Cita Ahora
          </Link>
        </div>
      </section>

      <section className="why-us-section">
        <div className="container">
          <h2 className="section-title">¿Por Qué Elegirnos?</h2>

          <div className="why-us-grid">
            {[
              {
                icon: "🏆",
                title: "Calidad Garantizada",
                description: "Todos nuestros productos cuentan con garantía y son de las mejores marcas.",
              },
              {
                icon: "👨‍⚕️",
                title: "Equipo Profesional",
                description: "Nuestros oftalmólogos son especialistas certificados con años de experiencia.",
              },
              {
                icon: "⭐",
                title: "Servicio Personalizado",
                description: "Atención individualizada según tus necesidades específicas.",
              },
            ].map((item, index) => (
              <div key={index} className="why-us-item">
                <div className="why-us-icon">{item.icon}</div>
                <div className="why-us-content">
                  <h3 className="why-us-title">{item.title}</h3>
                  <p className="why-us-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
