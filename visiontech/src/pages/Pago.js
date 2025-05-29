"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CreditCard, CheckCircle, ChevronRight, Lock, ArrowLeft, Loader2 } from "lucide-react"
import "./Pago.css"
import authService from "../services/authService"
import { cartService } from "./Carrito" // Importar el servicio del carrito

function Pago() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cartLoading, setCartLoading] = useState(true)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [user, setUser] = useState(null)
  const [cartError, setCartError] = useState(null)
  const [formData, setFormData] = useState({
    // Información de envío
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Información de pago
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [errors, setErrors] = useState({})
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("credit_card")

  // Calcular totales basándose en el carrito real
  const subtotal = cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0)
  const tax = subtotal * 0.16
  const shipping = shippingMethod === "express" ? 150 : shippingMethod === "standard" ? 80 : 0
  const total = subtotal + tax + shipping

  useEffect(() => {
    // Verificar autenticación
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      navigate("/login")
      return
    }

    setUser(currentUser)
    setFormData((prev) => ({
      ...prev,
      fullName: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      address: currentUser.address || "",
    }))

    // Cargar carrito real del usuario
    loadCartItems()
  }, [navigate])

  const loadCartItems = async () => {
    try {
      setCartLoading(true)
      setCartError(null)

      console.log("🛒 Cargando carrito para checkout...")

      // Verificar autenticación
      if (!cartService.isAuthenticated()) {
        setCartError("Debes iniciar sesión para continuar con el pago")
        navigate("/login")
        return
      }

      const response = await cartService.getCart()
      console.log("📦 Respuesta del carrito:", response)

      if (response.success) {
        const items = response.cart.items || []
        setCartItems(items)

        // Si el carrito está vacío, redirigir
        if (items.length === 0) {
          setCartError("Tu carrito está vacío")
          setTimeout(() => {
            navigate("/productos")
          }, 2000)
        }
      } else {
        setCartError(response.message || "Error cargando el carrito")
      }
    } catch (error) {
      console.error("❌ Error cargando carrito:", error)
      setCartError("Error conectando con el servidor")
    } finally {
      setCartLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateShippingForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = "El nombre es requerido"
    if (!formData.email.trim()) newErrors.email = "El correo electrónico es requerido"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Correo electrónico inválido"
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
    if (!formData.address.trim()) newErrors.address = "La dirección es requerida"
    if (!formData.city.trim()) newErrors.city = "La ciudad es requerida"
    if (!formData.state.trim()) newErrors.state = "El estado es requerido"
    if (!formData.zipCode.trim()) newErrors.zipCode = "El código postal es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePaymentForm = () => {
    const newErrors = {}

    if (paymentMethod === "credit_card") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "El número de tarjeta es requerido"
      if (!formData.cardName.trim()) newErrors.cardName = "El nombre en la tarjeta es requerido"
      if (!formData.expiryDate.trim()) newErrors.expiryDate = "La fecha de expiración es requerida"
      if (!formData.cvv.trim()) newErrors.cvv = "El CVV es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateShippingForm()) {
      setStep(2)
      window.scrollTo(0, 0)
    } else if (step === 2 && validatePaymentForm()) {
      processPayment()
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const processPayment = async () => {
    try {
      setLoading(true)

      console.log("💳 Procesando pago...")
      console.log("📦 Items del carrito:", cartItems)
      console.log("💰 Total a pagar:", total)

      // Simular procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Aquí podrías integrar con un procesador de pagos real
      // como Stripe, PayPal, etc.

      // Crear orden en el backend
      const orderData = {
        shipping_address: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        payment_method: paymentMethod,
        shipping_method: shippingMethod,
        notes: `Método de envío: ${shippingMethod}`,
      }

      console.log("📋 Datos de la orden:", orderData)

      // Aquí podrías hacer la llamada al backend para crear la orden
      // const orderResponse = await fetch('http://localhost:3000/api/orders/create', {
      //   method: 'POST',
      //   headers: cartService.getHeaders(),
      //   body: JSON.stringify(orderData)
      // });

      setPaymentSuccess(true)
      console.log("✅ Pago procesado exitosamente")
    } catch (error) {
      console.error("❌ Error procesando pago:", error)
      setErrors({ payment: "Error procesando el pago. Inténtalo nuevamente." })
    } finally {
      setLoading(false)
    }
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value)
    setFormData((prev) => ({ ...prev, cardNumber: formattedValue }))
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value)
    setFormData((prev) => ({ ...prev, expiryDate: formattedValue }))
  }

  // Función para obtener la URL de la imagen
  const getImageUrl = (images) => {
    if (!images) return "/placeholder.svg"

    try {
      const imageArray = typeof images === "string" ? JSON.parse(images) : images
      return imageArray && imageArray.length > 0 ? `/${imageArray[0]}` : "/placeholder.svg"
    } catch {
      return "/placeholder.svg"
    }
  }

  // Mostrar loading mientras se carga el carrito
  if (cartLoading) {
    return (
      <div className="pago-page">
        <div className="container">
          <div className="pago-header">
            <h1 className="pago-title">Finalizar Compra</h1>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4rem 0" }}>
            <div style={{ textAlign: "center" }}>
              <Loader2 size={48} style={{ animation: "spin 1s linear infinite", marginBottom: "1rem" }} />
              <p>Cargando tu carrito...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mostrar error si hay problemas con el carrito
  if (cartError) {
    return (
      <div className="pago-page">
        <div className="container">
          <div className="pago-header">
            <h1 className="pago-title">Error</h1>
          </div>
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <h2 style={{ color: "#e53e3e", marginBottom: "1rem" }}>{cartError}</h2>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <Link to="/carrito" className="btn btn-primary">
                Ver Carrito
              </Link>
              <Link to="/productos" className="btn btn-outline">
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (paymentSuccess) {
    return (
      <div className="pago-page">
        <div className="container">
          <div className="success-container">
            <div className="success-icon">
              <CheckCircle size={40} />
            </div>
            <h2 className="success-title">¡Pago Completado con Éxito!</h2>
            <p className="success-message">
              Tu pedido ha sido procesado correctamente. Hemos enviado un correo electrónico de confirmación a{" "}
              <strong>{formData.email}</strong> con los detalles de tu compra.
            </p>

            <div className="order-details">
              <h3 className="order-details-title">Detalles del Pedido</h3>
              <div className="order-detail-item">
                <span className="detail-label">Número de Orden:</span>
                <span className="detail-value">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="order-detail-item">
                <span className="detail-label">Fecha:</span>
                <span className="detail-value">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="order-detail-item">
                <span className="detail-label">Total:</span>
                <span className="detail-value">${total.toFixed(2)}</span>
              </div>
              <div className="order-detail-item">
                <span className="detail-label">Método de Pago:</span>
                <span className="detail-value">
                  {paymentMethod === "credit_card" ? "Tarjeta de Crédito" : "PayPal"}
                </span>
              </div>
              <div className="order-detail-item">
                <span className="detail-label">Productos:</span>
                <span className="detail-value">{cartItems.length} artículos</span>
              </div>
            </div>

            <div className="success-actions">
              <Link to="/" className="btn btn-primary">
                Volver a la Tienda
              </Link>
              <button className="btn btn-outline" onClick={() => window.print()}>
                Imprimir Recibo
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pago-page">
      <div className="container">
        <div className="pago-header">
          <h1 className="pago-title">Finalizar Compra</h1>
          <p style={{ color: "#666", marginTop: "0.5rem" }}>
            {cartItems.length} {cartItems.length === 1 ? "producto" : "productos"} en tu carrito
          </p>
        </div>

        <div className="checkout-container">
          <div className="checkout-progress">
            <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
              <div className="step-number">1</div>
              <div className="step-label">Información de Envío</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
              <div className="step-number">2</div>
              <div className="step-label">Método de Pago</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
              <div className="step-number">3</div>
              <div className="step-label">Confirmación</div>
            </div>
          </div>

          <div className="checkout-content">
            <div className="checkout-form-container">
              {step === 1 && (
                <div className="checkout-form">
                  <h2 className="form-title">Información de Envío</h2>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName">Nombre Completo</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`form-input ${errors.fullName ? "error" : ""}`}
                      />
                      {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Correo Electrónico</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-input ${errors.email ? "error" : ""}`}
                      />
                      {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Teléfono</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-input ${errors.phone ? "error" : ""}`}
                      />
                      {errors.phone && <div className="error-message">{errors.phone}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Dirección</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`form-input ${errors.address ? "error" : ""}`}
                      />
                      {errors.address && <div className="error-message">{errors.address}</div>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">Ciudad</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`form-input ${errors.city ? "error" : ""}`}
                      />
                      {errors.city && <div className="error-message">{errors.city}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">Estado</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`form-input ${errors.state ? "error" : ""}`}
                      />
                      {errors.state && <div className="error-message">{errors.state}</div>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="zipCode">Código Postal</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`form-input ${errors.zipCode ? "error" : ""}`}
                      />
                      {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
                    </div>

                    <div className="form-group">
                      <label>Método de Envío</label>
                      <div className="shipping-options">
                        <div
                          className={`shipping-option ${shippingMethod === "standard" ? "selected" : ""}`}
                          onClick={() => setShippingMethod("standard")}
                        >
                          <div className="option-radio">
                            <div className="radio-inner"></div>
                          </div>
                          <div className="option-details">
                            <div className="option-name">Estándar</div>
                            <div className="option-description">Entrega en 3-5 días hábiles</div>
                          </div>
                          <div className="option-price">$80.00</div>
                        </div>

                        <div
                          className={`shipping-option ${shippingMethod === "express" ? "selected" : ""}`}
                          onClick={() => setShippingMethod("express")}
                        >
                          <div className="option-radio">
                            <div className="radio-inner"></div>
                          </div>
                          <div className="option-details">
                            <div className="option-name">Express</div>
                            <div className="option-description">Entrega en 1-2 días hábiles</div>
                          </div>
                          <div className="option-price">$150.00</div>
                        </div>

                        <div
                          className={`shipping-option ${shippingMethod === "pickup" ? "selected" : ""}`}
                          onClick={() => setShippingMethod("pickup")}
                        >
                          <div className="option-radio">
                            <div className="radio-inner"></div>
                          </div>
                          <div className="option-details">
                            <div className="option-name">Recoger en Tienda</div>
                            <div className="option-description">Disponible en 24 horas</div>
                          </div>
                          <div className="option-price">Gratis</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <Link to="/carrito" className="btn btn-outline">
                      <ArrowLeft size={16} />
                      Volver al Carrito
                    </Link>
                    <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                      Continuar al Pago
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="checkout-form">
                  <h2 className="form-title">Método de Pago</h2>

                  <div className="payment-methods">
                    <div
                      className={`payment-method ${paymentMethod === "credit_card" ? "selected" : ""}`}
                      onClick={() => setPaymentMethod("credit_card")}
                    >
                      <div className="method-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="method-icon">
                        <CreditCard size={24} />
                      </div>
                      <div className="method-name">Tarjeta de Crédito/Débito</div>
                    </div>

                    <div
                      className={`payment-method ${paymentMethod === "paypal" ? "selected" : ""}`}
                      onClick={() => setPaymentMethod("paypal")}
                    >
                      <div className="method-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="method-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M19.5 8.5H4.5C3.4 8.5 2.5 9.4 2.5 10.5V17.5C2.5 18.6 3.4 19.5 4.5 19.5H19.5C20.6 19.5 21.5 18.6 21.5 17.5V10.5C21.5 9.4 20.6 8.5 19.5 8.5Z"
                            stroke="#0070BA"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 15.5C7 15.5 8 14.5 9.5 14.5C11 14.5 12.5 15.5 12.5 15.5C12.5 15.5 14 14.5 15.5 14.5C17 14.5 18 15.5 18 15.5"
                            stroke="#0070BA"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.5 8.5V6.5C5.5 5.4 6.4 4.5 7.5 4.5H16.5C17.6 4.5 18.5 5.4 18.5 6.5V8.5"
                            stroke="#0070BA"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="method-name">PayPal</div>
                    </div>
                  </div>

                  {paymentMethod === "credit_card" && (
                    <div className="card-details">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="cardNumber">Número de Tarjeta</label>
                          <div className="card-input-container">
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="1234 5678 9012 3456"
                              maxLength="19"
                              className={`form-input ${errors.cardNumber ? "error" : ""}`}
                            />
                            <div className="card-icons">
                              <span className="card-icon visa"></span>
                              <span className="card-icon mastercard"></span>
                              <span className="card-icon amex"></span>
                            </div>
                          </div>
                          {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="cardName">Nombre en la Tarjeta</label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            placeholder="NOMBRE APELLIDO"
                            className={`form-input ${errors.cardName ? "error" : ""}`}
                          />
                          {errors.cardName && <div className="error-message">{errors.cardName}</div>}
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="expiryDate">Fecha de Expiración</label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className={`form-input ${errors.expiryDate ? "error" : ""}`}
                          />
                          {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="cvv">CVV</label>
                          <div className="cvv-container">
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              maxLength="4"
                              className={`form-input ${errors.cvv ? "error" : ""}`}
                            />
                            <div className="cvv-info">
                              <span className="info-icon">?</span>
                              <div className="info-tooltip">
                                El código de seguridad (CVV) es un número de 3 o 4 dígitos que aparece en el reverso de
                                tu tarjeta.
                              </div>
                            </div>
                          </div>
                          {errors.cvv && <div className="error-message">{errors.cvv}</div>}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="paypal-info">
                      <p>
                        Al hacer clic en "Pagar con PayPal", serás redirigido a PayPal para completar tu compra de forma
                        segura.
                      </p>
                    </div>
                  )}

                  {errors.payment && (
                    <div className="error-message" style={{ marginTop: "1rem" }}>
                      {errors.payment}
                    </div>
                  )}

                  <div className="secure-payment-notice">
                    <Lock size={16} />
                    <span>Pago 100% seguro. Tus datos están protegidos con encriptación SSL.</span>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={handlePrevStep}>
                      <ArrowLeft size={16} />
                      Volver a Envío
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleNextStep} disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                          Procesando...
                        </>
                      ) : (
                        <>
                          Realizar Pago
                          <ChevronRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="order-summary">
              <h2 className="summary-title">Resumen del Pedido</h2>

              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.cart_id} className="cart-item">
                    <div className="item-image">
                      <img
                        src={getImageUrl(item.images) || "/placeholder.svg"}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-quantity">Cantidad: {item.quantity}</div>
                      {item.brand && <div className="item-brand">Marca: {item.brand}</div>}
                    </div>
                    <div className="item-price">${(Number(item.price) * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal ({cartItems.length} productos)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Impuestos (16%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Envío</span>
                  <span>
                    {shippingMethod === "pickup" ? "Gratis" : shippingMethod === "express" ? "$150.00" : "$80.00"}
                  </span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="promo-code">
                <input type="text" placeholder="Código promocional" className="promo-input" />
                <button className="promo-button">Aplicar</button>
              </div>

              <div className="summary-footer">
                <div className="secure-checkout">
                  <Lock size={16} />
                  <span>Pago Seguro</span>
                </div>
                <div className="payment-icons">
                  <span className="payment-icon visa"></span>
                  <span className="payment-icon mastercard"></span>
                  <span className="payment-icon amex"></span>
                  <span className="payment-icon paypal"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pago

