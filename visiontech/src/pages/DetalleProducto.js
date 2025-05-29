"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ShoppingCart, Heart, Share2, Star, ChevronRight, Check, ArrowLeft, Plus, Minus, Loader2 } from "lucide-react"
import "./DetalleProducto.css"

// Importar el servicio del carrito
import { cartService } from "./Carrito"

function DetalleProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [relatedProducts, setRelatedProducts] = useState([])
  const [addingToCart, setAddingToCart] = useState(false)

  // Cargar producto del backend
  useEffect(() => {
    if (id) {
      loadProduct()
    }
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔄 Cargando producto ID:", id)
      const response = await fetch(`http://localhost:3000/api/products/${id}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("📦 Respuesta del producto:", data)

      if (data.success) {
        const productData = data.product
        setProduct(productData)

        // Configurar colores por defecto si no existen
        const defaultColors = [
          { name: "Negro", value: "#000000" },
          { name: "Dorado", value: "#FFD700" },
          { name: "Plateado", value: "#C0C0C0" },
        ]
        setSelectedColor(defaultColors[0])

        // Cargar productos relacionados
        loadRelatedProducts(productData.category_id)
      } else {
        setError(data.message || "Producto no encontrado")
      }
    } catch (error) {
      console.error("❌ Error cargando producto:", error)
      setError(`Error conectando con el servidor: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const loadRelatedProducts = async (categoryId) => {
    try {
      const response = await fetch("http://localhost:3000/api/products")
      const data = await response.json()

      if (data.success) {
        const related = data.products
          .filter((p) => p.category_id === categoryId && p.id !== Number.parseInt(id))
          .slice(0, 3)
        setRelatedProducts(related)
      }
    } catch (error) {
      console.error("Error cargando productos relacionados:", error)
    }
  }

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true)

      console.log("🛒 Intentando agregar al carrito:", product.name, "Cantidad:", quantity)

      // Verificar autenticación
      if (!cartService.getToken()) {
        setNotificationMessage("Debes iniciar sesión para agregar productos al carrito")
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 3000)
        return
      }

      const response = await cartService.addToCart(product.id, quantity)
      console.log("📦 Respuesta del carrito:", response)

      if (response.success) {
        setNotificationMessage("¡Producto agregado al carrito!")
        setShowNotification(true)
        // Disparar evento para actualizar contador del carrito
        window.dispatchEvent(new CustomEvent("cartUpdated"))
      } else {
        setNotificationMessage(response.message || "Error agregando al carrito")
        setShowNotification(true)
      }
    } catch (error) {
      console.error("❌ Error agregando al carrito:", error)
      setNotificationMessage("Error conectando con el servidor")
      setShowNotification(true)
    } finally {
      setAddingToCart(false)
      setTimeout(() => setShowNotification(false), 3000)
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, Math.min(product.stock_quantity || 10, quantity + change))
    setQuantity(newQuantity)
  }

  // Función para obtener la URL de la imagen - CORREGIDA
  const getImageUrl = (images, index = 0) => {
    if (!images) return "/placeholder.svg"

    try {
      const imageArray = typeof images === "string" ? JSON.parse(images) : images
      if (imageArray && imageArray.length > index) {
        const imageName = imageArray[index]
        return `/${imageName}` // Esto buscará en public/
      }
      return "/placeholder.svg"
    } catch {
      return "/placeholder.svg"
    }
  }

  // Función para obtener todas las imágenes
  const getAllImages = (images) => {
    if (!images) return ["/placeholder.svg"]

    try {
      const imageArray = typeof images === "string" ? JSON.parse(images) : images
      if (imageArray && imageArray.length > 0) {
        return imageArray.map((img) => `/${img}`) // Cambiar ruta
      }
      return ["/placeholder.svg"]
    } catch {
      return ["/placeholder.svg"]
    }
  }

  // Colores por defecto
  const defaultColors = [
    { name: "Negro", value: "#000000" },
    { name: "Dorado", value: "#FFD700" },
    { name: "Plateado", value: "#C0C0C0" },
  ]

  // Características por defecto
  const getFeatures = (product) => {
    const features = []
    if (product.category_name?.toLowerCase().includes("sol")) {
      features.push("Protección UV 400", "Lentes polarizadas", "Marco ligero")
    } else {
      features.push("Compatible con lentes graduadas", "Marco resistente", "Diseño ergonómico")
    }
    features.push("Incluye estuche", "Garantía de calidad")
    return features
  }

  // Especificaciones por defecto
  const getSpecifications = (product) => {
    return {
      material: product.frame_material || "Acetato",
      dimensiones: "140mm x 50mm x 140mm",
      peso: "25g",
      garantia: "2 años",
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/productos" className="btn btn-primary">
          Ver todos los productos
        </Link>
        <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          <p>Posibles soluciones:</p>
          <ul style={{ textAlign: "left", display: "inline-block" }}>
            <li>Verificar que el backend esté corriendo</li>
            <li>Verificar que el producto existe en la base de datos</li>
            <li>
              Probar:{" "}
              <a href="http://localhost:3000/api/products" target="_blank" rel="noopener noreferrer">
                http://localhost:3000/api/products
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Producto no encontrado</h2>
        <p>Lo sentimos, el producto que buscas no existe o ha sido eliminado.</p>
        <Link to="/productos" className="btn btn-primary">
          Ver todos los productos
        </Link>
      </div>
    )
  }

  const productImages = getAllImages(product.images)
  const features = getFeatures(product)
  const specifications = getSpecifications(product)
  const isBestseller =
    product.name.includes("Wayfarer") || product.name.includes("Aviador") || product.name.includes("Luxury")

  return (
    <div className="detalle-producto-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Inicio</Link>
          <ChevronRight size={14} />
          <Link to="/productos">Productos</Link>
          <ChevronRight size={14} />
          <Link to={`/productos/${product.category_name?.toLowerCase().includes("sol") ? "gafas-sol" : "monturas"}`}>
            {product.category_name?.toLowerCase().includes("sol") ? "Gafas de Sol" : "Monturas"}
          </Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </div>

        <div className="back-to-products">
          <Link to="/productos" className="back-link">
            <ArrowLeft size={16} />
            <span>Volver a productos</span>
          </Link>
        </div>

        <div className="product-detail-container">
          <div className="product-gallery">
            <div className="main-image-container">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="main-image"
                onError={(e) => {
                  console.log("❌ Error cargando imagen:", e.target.src)
                  e.target.src = "/placeholder.svg"
                }}
                onLoad={() => {
                  console.log("✅ Imagen principal cargada")
                }}
              />
              {isBestseller && <div className="product-badge bestseller">Más Vendido</div>}
              <div className="product-badge category">{product.category_name || "Gafas"}</div>
            </div>
            <div className="thumbnail-container">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Vista ${index + 1}`}
                    onError={(e) => {
                      e.target.src = "/placeholder.svg"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-meta">
              <div className="product-rating">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <Star key={i} size={18} className={i < 4 ? "star-filled" : "star-empty"} />
                  ))}
                <span className="rating-text">4.0 (24 reseñas)</span>
              </div>
              <div className="product-stock">
                {(product.stock_quantity || 0) > 0 ? (
                  <span className="in-stock">
                    <Check size={16} />
                    En stock ({product.stock_quantity || 10} disponibles)
                  </span>
                ) : (
                  <span className="out-of-stock">Agotado</span>
                )}
              </div>
            </div>

            <div className="product-price">${Number(product.price).toFixed(2)}</div>

            <div className="product-description">
              <p>{product.description || `${product.brand} ${product.model}`.trim()}</p>
            </div>

            <div className="product-colors">
              <h3>Color:</h3>
              <div className="color-options">
                {defaultColors.map((color) => (
                  <div
                    key={color.name}
                    className={`color-option ${selectedColor?.name === color.name ? "selected" : ""}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                  >
                    {selectedColor?.name === color.name && <Check size={14} color="white" />}
                  </div>
                ))}
              </div>
              <span className="selected-color-name">{selectedColor?.name}</span>
            </div>

            <div className="product-features">
              <h3>Características:</h3>
              <ul className="features-list">
                {features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <Check size={16} className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus size={16} />
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (product.stock_quantity || 10)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={(product.stock_quantity || 0) === 0 || addingToCart}
              >
                {addingToCart ? (
                  <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <ShoppingCart size={18} />
                )}
                {addingToCart ? "Agregando..." : "Añadir al Carrito"}
              </button>

              <button className="wishlist-btn">
                <Heart size={18} />
              </button>

              <button className="share-btn">
                <Share2 size={18} />
              </button>
            </div>

            <div className="product-specifications">
              <h3>Especificaciones:</h3>
              <table className="specifications-table">
                <tbody>
                  {Object.entries(specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-name">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="section-title">Productos Relacionados</h2>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="related-product-card">
                  <Link to={`/producto/${relatedProduct.id}`} className="related-product-link">
                    <div className="related-product-image">
                      <img
                        src={getImageUrl(relatedProduct.images) || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        onError={(e) => {
                          e.target.src = "/placeholder.svg"
                        }}
                      />
                      {(relatedProduct.name.includes("Wayfarer") || relatedProduct.name.includes("Luxury")) && (
                        <div className="product-badge bestseller small">Más Vendido</div>
                      )}
                    </div>
                    <div className="related-product-info">
                      <h3 className="related-product-title">{relatedProduct.name}</h3>
                      <div className="related-product-rating">
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <Star key={i} size={14} className={i < 4 ? "star-filled" : "star-empty"} />
                          ))}
                      </div>
                      <div className="related-product-price">${Number(relatedProduct.price).toFixed(2)}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`cart-notification ${showNotification ? "show" : ""}`}>
        <ShoppingCart size={18} />
        <span>{notificationMessage}</span>
      </div>
    </div>
  )
}

export default DetalleProducto


