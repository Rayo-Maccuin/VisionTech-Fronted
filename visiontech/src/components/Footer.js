"use client"

import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, Clock, Share2 } from "lucide-react"
import "./Footer.css"

function Footer() {
  const currentYear = new Date().getFullYear()

  const socialNetworks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/profile.php?id=61576376606285",
      color: "#1877f2",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/visiontech",
      color: "#e4405f",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/visiontech",
      color: "#1da1f2",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/visiontech",
      color: "#0077b5",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@visiontech",
      color: "#ff0000",
    },
  ]

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-grid">
            {/* Company Section */}
            <div className="footer-section company-section">
              <Link to="/" className="footer-logo">
                <img src="/logo.png" alt="VisionTech Logo" className="logo-image" />
                <span className="company-name">VisionTech</span>
              </Link>
              <p className="company-description">
                Cuidamos tu salud visual con tecnología de vanguardia y el mejor servicio profesional.
              </p>
              <div className="company-stats">
                <div className="stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Años</span>
                </div>
                <div className="stat">
                  <span className="stat-number">15K+</span>
                  <span className="stat-label">Clientes</span>
                </div>
                <div className="stat">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfacción</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="section-title">Enlaces Rápidos</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/" className="footer-link">
                    Inicio
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
                <li>
                  <Link to="/perfil" className="footer-link">
                    Mi Perfil
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3 className="section-title">Contacto</h3>
              <div className="contact-list">
                <div className="contact-item">
                  <Phone size={16} className="contact-icon" />
                  <span>+57 311 280 8028</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} className="contact-icon" />
                  <span>VisionTech@gmail.com</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} className="contact-icon" />
                  <span>Carrera 17 N° 15-28</span>
                </div>
                <div className="contact-item">
                  <Clock size={16} className="contact-icon" />
                  <span>Lun-Vie 8AM-6PM</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="footer-section">
              <h3 className="section-title">
                <Share2 size={18} className="title-icon" />
                Síguenos
              </h3>
              <p className="social-description">Comparte con tus amigos</p>
              <div className="social-links">
                {socialNetworks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ "--social-color": social.color }}
                      title={social.name}
                    >
                      <IconComponent size={18} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
