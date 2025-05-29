"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Mail, Check } from "lucide-react"
import "./RecuperarPassword.css"

function RecuperarPassword() {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1)
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    
    if (email) {
      setError("")
      setStep(2)
      console.log(`Código de recuperación enviado a ${email}`)
    } else {
      setError("Por favor ingresa tu correo electrónico")
    }
  }

  const handleCodeSubmit = (e) => {
    e.preventDefault()

    if (code.length === 6) {
      setError("")
      setStep(3)
    } else {
      setError("El código debe tener 6 dígitos")
    }
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setError("")
    setSuccess(true)
    console.log("Contraseña cambiada exitosamente")
  }

  return (
    <div className="recuperar-password-page">
      <div className="recuperar-container">
        <div className="recuperar-header">
          <Link to="/login" className="back-link">
            <ArrowLeft size={20} />
            <span>Volver al inicio de sesión</span>
          </Link>
          <img
            src="logo.png"
            alt="VisionTech Logo"
            className="recuperar-logo"
          />
          <h1 className="recuperar-title">Recuperar Contraseña</h1>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">
              <Check size={40} />
            </div>
            <h2>¡Contraseña actualizada!</h2>
            <p>Tu contraseña ha sido cambiada exitosamente.</p>
            <Link to="/login" className="btn btn-primary">
              Iniciar Sesión
            </Link>
          </div>
        ) : (
          <div className="recuperar-steps">
            <div className="steps-indicator">
              <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
              <div className="step-line"></div>
              <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
              <div className="step-line"></div>
              <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
            </div>

            {step === 1 && (
              <div className="step-content">
                <div className="step-icon">
                  <Mail size={30} />
                </div>
                <h2 className="step-title">Ingresa tu correo electrónico</h2>
                <p className="step-description">
                  Te enviaremos un código de verificación para restablecer tu contraseña.
                </p>

                <form onSubmit={handleEmailSubmit} className="recuperar-form">
                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <button type="submit" className="btn btn-primary">
                    Enviar código
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="step-content">
                <h2 className="step-title">Ingresa el código de verificación</h2>
                <p className="step-description">
                  Hemos enviado un código de 6 dígitos a <strong>{email}</strong>
                </p>

                <form onSubmit={handleCodeSubmit} className="recuperar-form">
                  <div className="form-group">
                    <label htmlFor="code">Código de verificación</label>
                    <input
                      type="text"
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                      placeholder="123456"
                      maxLength="6"
                      required
                    />
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                      Atrás
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Verificar
                    </button>
                  </div>

                  <div className="resend-code">
                    ¿No recibiste el código?{" "}
                    <button type="button" className="resend-btn">
                      Reenviar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="step-content">
                <h2 className="step-title">Crea una nueva contraseña</h2>
                <p className="step-description">Tu nueva contraseña debe tener al menos 8 caracteres.</p>

                <form onSubmit={handlePasswordSubmit} className="recuperar-form">
                  <div className="form-group">
                    <label htmlFor="newPassword">Nueva contraseña</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>
                      Atrás
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Cambiar contraseña
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default RecuperarPassword
