import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <img
                src="/logo.png"
                alt="VisionTech Logo"
                className="logo-image-footer"
              />
            </Link>
            <p className="footer-text">
              Ofrecemos la mejor selección de gafas y servicios oftalmológicos de alta calidad.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="footer-link">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="footer-link">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/citas" className="footer-link">
                  Citas
                </Link>
              </li>
              <li>
                <Link to="/carrito" className="footer-link">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Contacto</h3>
            <ul className="footer-contact">
              <li className="contact-item">
                <span className="contact-icon">📞</span>
                <span className="contact-text">+57 3112808028</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">✉️</span>
                <span className="contact-text">VisionTech@gmail.com</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">📍</span>
                <span className="contact-text">Carrera 17 N° 15-28 </span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Síguenos</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61576376606285" target="_blank" className="social-link">
                <span className="social-icon">FACEBOOK ⓕ</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} VisionTech. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

