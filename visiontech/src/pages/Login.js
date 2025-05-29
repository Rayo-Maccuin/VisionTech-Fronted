"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Glasses, EyeIcon, Stethoscope, Microscope } from "lucide-react"
import "./Login.css"
import authService from "../services/authService"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

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
    setLoading(true)

    try {
      if (isLogin) {
        const result = await authService.login(formData.email, formData.password)

        if (result.success) {
          window.location.href = "/"
        } else {
          setError(result.message || "Error al iniciar sesión")
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Las contraseñas no coinciden")
          setLoading(false)
          return
        }

        const result = await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })

        if (result.success) {
          await authService.login(formData.email, formData.password)
          window.location.href = "/"
        } else {
          setError(result.message || "Error al registrarse")
        }
      }
    } catch (error) {
      setError("Ocurrió un error. Inténtalo de nuevo.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-welcome">
        <div className="welcome-content">
          <h1 className="welcome-title">Bienvenido a VisionTech</h1>
          <p className="welcome-description">
            Especialistas en salud visual y las últimas tendencias en gafas. Agenda tu cita médica y descubre nuestra
            colección exclusiva.
          </p>

          <div className="services-card">
            <h2 className="services-title">Nuestros servicios</h2>
            <ul className="services-list">
              <li className="service-item">
                <EyeIcon className="service-icon" />
                <span>Exámenes visuales completos</span>
              </li>
              <li className="service-item">
                <Glasses className="service-icon" />
                <span>Amplia selección de monturas</span>
              </li>
              <li className="service-item">
                <Microscope className="service-icon" />
                <span>Lentes de contacto especializados</span>
              </li>
              <li className="service-item">
                <Stethoscope className="service-icon" />
                <span>Tratamientos para problemas visuales</span>
              </li>
            </ul>
          </div>

          <div className="decorative-elements">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
            <div className="decorative-icon icon-1">
              <Glasses size={80} />
            </div>
            <div className="decorative-icon icon-2">
              <EyeIcon size={100} />
            </div>
          </div>
        </div>
      </div>

      <div className="login-form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <img
              src="logo.png"
              alt="VisionTech Logo"
              className="login-logo"
            />
            <h2 className="form-title">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>
            <p className="form-subtitle">
              {isLogin
                ? "Ingresa tus credenciales para acceder a tu cuenta"
                : "Completa el formulario para registrarte"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar contraseña
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" name="remember" className="remember-checkbox" />
                <label htmlFor="remember" className="remember-label">
                  Recordarme
                </label>
              </div>
              {isLogin && (
                <Link to="/recuperar-password" className="forgot-password">
                  ¿Olvidaste tu contraseña?
                </Link>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="submit-button btn-primary" disabled={loading}>
              {loading ? "Procesando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
            </button>

            <div className="form-footer">
              <div className="divider">
                <span className="divider-text">{isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}</span>
              </div>
              <button type="button" className="toggle-form" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Regístrate aquí" : "Inicia sesión"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


