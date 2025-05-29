"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react"
import "./Carrito.css"

// Servicio para manejar las peticiones del carrito - VERSIÓN MEJORADA
const cartService = {
  // Obtener el token del localStorage
  getToken: () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken") || localStorage.getItem("jwt")
    console.log("🔑 Token obtenido:", token ? `Token encontrado (${token.length} chars)` : "No hay token")
    return token
  },

  // Headers con autenticación
  getHeaders: () => {
    const token = cartService.getToken()
    const headers = {
      "Content-Type": "application/json",
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    console.log("📋 Headers preparados:", {
      hasContentType: !!headers["Content-Type"],
      hasAuth: !!headers.Authorization,
      authLength: headers.Authorization ? headers.Authorization.length : 0,
    })
    return headers
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    const token = cartService.getToken()
    if (!token) return false

    try {
      // Verificar si el token no está expirado (básico)
      const payload = JSON.parse(atob(token.split(".")[1]))
      const now = Date.now() / 1000

      if (payload.exp && payload.exp < now) {
        console.log("🔒 Token expirado")
        localStorage.removeItem("token")
        localStorage.removeItem("authToken")
        localStorage.removeItem("jwt")
        return false
      }

      console.log("✅ Token válido para usuario:", payload.userId)
      return true
    } catch (error) {
      console.log("🔒 Token inválido:", error)
      return false
    }
  },

  // Obtener carrito
  getCart: async () => {
    try {
      console.log("🛒 Obteniendo carrito...")
      const response = await fetch("http://localhost:3000/api/cart", {
        headers: cartService.getHeaders(),
      })

      console.log("📡 Respuesta del servidor:", response.status, response.statusText)

      const data = await response.json()
      console.log("📦 Datos del carrito:", data)

      return data
    } catch (error) {
      console.error("❌ Error obteniendo carrito:", error)
      throw error
    }
  },

  // Agregar al carrito - VERSIÓN MEJORADA
  addToCart: async (productId, quantity = 1, prescriptionDetails = null) => {
    try {
      console.log("➕ === INICIO AGREGAR AL CARRITO (FRONTEND) ===")
      console.log("📦 Parámetros recibidos:", { productId, quantity, prescriptionDetails })
      console.log("📦 Tipos de datos:", {
        productId: typeof productId,
        quantity: typeof quantity,
      })

      // Asegurar que los datos sean del tipo correcto
      const requestData = {
        product_id: Number.parseInt(productId), // Asegurar que sea número
        quantity: Number.parseInt(quantity), // Asegurar que sea número
        prescription_details: prescriptionDetails,
      }

      console.log("📤 Datos a enviar:", requestData)
      console.log("📤 Tipos finales:", {
        product_id: typeof requestData.product_id,
        quantity: typeof requestData.quantity,
      })

      const headers = cartService.getHeaders()
      console.log("📋 Headers finales:", headers)

      const response = await fetch("http://localhost:3000/api/cart/add", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      })

      console.log("📡 Respuesta HTTP:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      })

      const data = await response.json()
      console.log("📦 Respuesta del servidor:", data)

      if (!response.ok) {
        console.error("❌ Error HTTP:", {
          status: response.status,
          data: data,
        })
      }

      console.log("➕ === FIN AGREGAR AL CARRITO (FRONTEND) ===")
      return data
    } catch (error) {
      console.error("❌ Error agregando al carrito:", error)
      throw error
    }
  },

  // Actualizar cantidad
  updateQuantity: async (cartId, quantity) => {
    try {
      console.log("🔄 Actualizando cantidad:", { cartId, quantity })
      const response = await fetch(`http://localhost:3000/api/cart/update/${cartId}`, {
        method: "PUT",
        headers: cartService.getHeaders(),
        body: JSON.stringify({ quantity: Number.parseInt(quantity) }),
      })
      const data = await response.json()
      console.log("📦 Respuesta actualizar:", data)
      return data
    } catch (error) {
      console.error("❌ Error actualizando cantidad:", error)
      throw error
    }
  },

  // Eliminar del carrito
  removeFromCart: async (cartId) => {
    try {
      console.log("🗑️ Eliminando del carrito:", cartId)
      const response = await fetch(`http://localhost:3000/api/cart/remove/${cartId}`, {
        method: "DELETE",
        headers: cartService.getHeaders(),
      })
      const data = await response.json()
      console.log("📦 Respuesta eliminar:", data)
      return data
    } catch (error) {
      console.error("❌ Error eliminando del carrito:", error)
      throw error
    }
  },

  // Limpiar carrito
  clearCart: async () => {
    try {
      console.log("🧹 Limpiando carrito...")
      const response = await fetch("http://localhost:3000/api/cart/clear", {
        method: "DELETE",
        headers: cartService.getHeaders(),
      })
      const data = await response.json()
      console.log("📦 Respuesta limpiar:", data)
      return data
    } catch (error) {
      console.error("❌ Error limpiando carrito:", error)
      throw error
    }
  },
}

function Carrito() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updating, setUpdating] = useState({})
  const [debugInfo, setDebugInfo] = useState({})

  // Cargar carrito al montar el componente
  useEffect(() => {
    // Debug: mostrar información de autenticación
    const token = cartService.getToken()
    const isAuth = cartService.isAuthenticated()

    setDebugInfo({
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      isAuthenticated: isAuth,
      localStorage: {
        token: !!localStorage.getItem("token"),
        authToken: !!localStorage.getItem("authToken"),
        jwt: !!localStorage.getItem("jwt"),
      },
    })

    console.log("🔍 Debug Info:", {
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      isAuthenticated: isAuth,
      localStorage: {
        token: !!localStorage.getItem("token"),
        authToken: !!localStorage.getItem("authToken"),
        jwt: !!localStorage.getItem("jwt"),
      },
    })

    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      setError(null)

      // Verificar autenticación
      if (!cartService.isAuthenticated()) {
        setError("Debes iniciar sesión para ver tu carrito")
        setLoading(false)
        return
      }

      const response = await cartService.getCart()

      if (response.success) {
        setCartItems(response.cart.items || [])
      } else {
        // Si el error es de autenticación, limpiar tokens
        if (response.message && (response.message.includes("Token") || response.message.includes("autenticación"))) {
          localStorage.removeItem("token")
          localStorage.removeItem("authToken")
          localStorage.removeItem("jwt")
          setError("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.")
        } else {
          setError(response.message || "Error cargando el carrito")
        }
      }
    } catch (error) {
      console.error("❌ Error cargando carrito:", error)
      setError("Error conectando con el servidor")
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (cartId, change) => {
    try {
      setUpdating((prev) => ({ ...prev, [cartId]: true }))

      const currentItem = cartItems.find((item) => item.cart_id === cartId)
      if (!currentItem) return

      const newQuantity = Math.max(1, currentItem.quantity + change)

      const response = await cartService.updateQuantity(cartId, newQuantity)

      if (response.success) {
        setCartItems((prevItems) =>
          prevItems.map((item) => (item.cart_id === cartId ? { ...item, quantity: newQuantity } : item)),
        )
      } else {
        setError(response.message || "Error actualizando cantidad")
        setTimeout(() => setError(null), 3000)
      }
    } catch (error) {
      console.error("❌ Error actualizando cantidad:", error)
      setError("Error actualizando cantidad")
      setTimeout(() => setError(null), 3000)
    } finally {
      setUpdating((prev) => ({ ...prev, [cartId]: false }))
    }
  }

  const removeItem = async (cartId) => {
    try {
      setUpdating((prev) => ({ ...prev, [cartId]: true }))

      const response = await cartService.removeFromCart(cartId)

      if (response.success) {
        setCartItems((prevItems) => prevItems.filter((item) => item.cart_id !== cartId))
      } else {
        setError(response.message || "Error eliminando producto")
        setTimeout(() => setError(null), 3000)
      }
    } catch (error) {
      console.error("❌ Error eliminando producto:", error)
      setError("Error eliminando producto")
      setTimeout(() => setError(null), 3000)
    } finally {
      setUpdating((prev) => ({ ...prev, [cartId]: false }))
    }
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

  // Función para forzar recarga del carrito
  const forceReload = () => {
    loadCart()
  }

  // Calcular totales
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.16
  const total = subtotal + tax

  const isCartEmpty = cartItems.length === 0

  const handleCheckout = () => {
    if (isCartEmpty) return
    navigate("/pago")
  }

  // Mostrar loading
  if (loading) {
    return (
      <div className="carrito-page">
        <div className="container">
          <div className="carrito-header">
            <h1 className="carrito-title">Tu Carrito de Compras</h1>
            <p className="carrito-subtitle">Cargando tu carrito...</p>
          </div>
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <Loader2 size={80} style={{ animation: "spin 1s linear infinite" }} />
            </div>
            <h2>Cargando...</h2>
            <p>Obteniendo los productos de tu carrito.</p>
          </div>
        </div>
      </div>
    )
  }

  // Mostrar error de autenticación
  if (error && (error.includes("iniciar sesión") || error.includes("sesión ha expirado"))) {
    return (
      <div className="carrito-page">
        <div className="container">
          <div className="carrito-header">
            <h1 className="carrito-title">Tu Carrito de Compras</h1>
            <p className="carrito-subtitle">Necesitas iniciar sesión</p>
          </div>

          {/* Debug info - remover en producción */}
          <div
            style={{
              background: "#f0f0f0",
              padding: "1rem",
              margin: "1rem 0",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontFamily: "monospace",
            }}
          >
            <h4>🔍 Información de Debug:</h4>
            <p>Token en localStorage: {debugInfo.hasToken ? "✅ Sí" : "❌ No"}</p>
            <p>Longitud del token: {debugInfo.tokenLength}</p>
            <p>Token válido: {debugInfo.isAuthenticated ? "✅ Sí" : "❌ No"}</p>
            <p>localStorage.token: {debugInfo.localStorage?.token ? "✅" : "❌"}</p>
            <p>localStorage.authToken: {debugInfo.localStorage?.authToken ? "✅" : "❌"}</p>
            <p>localStorage.jwt: {debugInfo.localStorage?.jwt ? "✅" : "❌"}</p>
            <button
              onClick={forceReload}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              🔄 Reintentar
            </button>
          </div>

          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={80} />
            </div>
            <h2>{error}</h2>
            <p>Debes estar autenticado para acceder a tu carrito de compras.</p>
            <Link to="/login" className="btn btn-primary">
              Iniciar Sesión
            </Link>
            <button onClick={forceReload} className="btn btn-primary" style={{ marginLeft: "1rem" }}>
              Reintentar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="carrito-page">
      <div className="container">
        <div className="carrito-header">
          <h1 className="carrito-title">Tu Carrito de Compras</h1>
          <p className="carrito-subtitle">
            {isCartEmpty
              ? "Tu carrito está vacío"
              : `Tienes ${cartItems.length} ${cartItems.length === 1 ? "producto" : "productos"} en tu carrito`}
          </p>
          {error && <div style={{ color: "#e53e3e", marginTop: "0.5rem", fontSize: "0.9rem" }}>{error}</div>}
        </div>

        {isCartEmpty ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={80} />
            </div>
            <h2>Tu carrito está vacío</h2>
            <p>Parece que aún no has añadido productos a tu carrito.</p>
            <Link to="/productos" className="btn btn-primary">
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="carrito-content">
            <div className="carrito-items">
              <div className="carrito-table-header">
                <div className="header-producto">Producto</div>
                <div className="header-precio">Precio</div>
                <div className="header-cantidad">Cantidad</div>
                <div className="header-total">Total</div>
                <div className="header-acciones"></div>
              </div>

              {cartItems.map((item) => (
                <div key={item.cart_id} className="carrito-item">
                  <div className="item-producto">
                    <img
                      src={getImageUrl(item.images) || "/placeholder.svg"}
                      alt={item.name}
                      className="item-image"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg"
                      }}
                    />
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-category">
                        {item.brand && `${item.brand} - `}
                        {item.category_name || "Gafas"}
                      </p>
                      {item.model && (
                        <p className="item-category" style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                          Modelo: {item.model}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="item-precio">${Number(item.price).toFixed(2)}</div>
                  <div className="item-cantidad">
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.cart_id, -1)}
                        disabled={updating[item.cart_id] || item.quantity <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        {updating[item.cart_id] ? (
                          <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                        ) : (
                          <Minus size={16} />
                        )}
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.cart_id, 1)}
                        disabled={updating[item.cart_id]}
                        aria-label="Aumentar cantidad"
                      >
                        {updating[item.cart_id] ? (
                          <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                        ) : (
                          <Plus size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="item-total">${(Number(item.price) * item.quantity).toFixed(2)}</div>
                  <div className="item-acciones">
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.cart_id)}
                      disabled={updating[item.cart_id]}
                      aria-label="Eliminar producto"
                    >
                      {updating[item.cart_id] ? (
                        <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carrito-summary">
              <h2 className="summary-title">Resumen del Pedido</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Impuestos (16%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span>Calculado en el checkout</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary checkout-btn" onClick={handleCheckout} disabled={isCartEmpty}>
                Proceder al Pago
              </button>
              <Link to="/productos" className="continue-shopping">
                <ArrowLeft size={16} />
                <span>Continuar Comprando</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Exportar también el servicio para usarlo en otros componentes
export { cartService }
export default Carrito

