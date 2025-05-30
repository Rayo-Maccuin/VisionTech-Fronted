"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Filter, ShoppingCart, Star, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import "./Productos.css"

// Importar el servicio del carrito
import { cartService } from "./Carrito"

function Productos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [addingToCart, setAddingToCart] = useState({})

  // Cargar productos del backend
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔄 Cargando productos desde el backend...")
      const response = await fetch("http://localhost:3000/api/products")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("📦 Respuesta del backend:", data)

      if (data.success) {
        console.log(`✅ ${data.products.length} productos cargados`)
        setAllProducts(data.products || [])
      } else {
        setError(data.message || "Error cargando productos")
      }
    } catch (error) {
      console.error("❌ Error cargando productos:", error)
      setError(`Error conectando con el servidor: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Filtrar y ordenar productos
  useEffect(() => {
    let result = [...allProducts]

    if (categoryFilter !== "all") {
      result = result.filter((product) => {
        const category = product.category_name?.toLowerCase()
        if (categoryFilter === "sol") {
          return category?.includes("sol")
        } else if (categoryFilter === "graduadas") {
          return category?.includes("graduadas") || category?.includes("lectura")
        }
        return true
      })
    }

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => 5 - 4) // Ordenar por rating si está disponible
        break
      case "bestseller":
        result.sort((a, b) => (b.name.includes("Wayfarer") ? 1 : 0) - (a.name.includes("Wayfarer") ? 1 : 0))
        break
      default:
        result.sort((a, b) => a.id - b.id)
    }

    setFilteredProducts(result)
  }, [searchTerm, categoryFilter, sortBy, priceRange, allProducts])

  const handleAddToCart = async (product) => {
    try {
      setAddingToCart((prev) => ({ ...prev, [product.id]: true }))

      console.log("🛒 Intentando agregar al carrito:", product.name)

      // Verificar autenticación
      if (!cartService.getToken()) {
        setNotificationMessage("Debes iniciar sesión para agregar productos al carrito")
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 3000)
        return
      }

      const response = await cartService.addToCart(product.id, 1)
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
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }))
      setTimeout(() => setShowNotification(false), 3000)
    }
  }

  const handlePriceRangeChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = Number(e.target.value)
    setPriceRange(newRange)
  }

  const getImageUrl = (images) => {
    if (!images) return "/placeholder.svg"

    try {
      const imageArray = typeof images === "string" ? JSON.parse(images) : images
      if (imageArray && imageArray.length > 0) {
        const imageName = imageArray[0]
        return `/${imageName}`
      }
      return "/placeholder.svg"
    } catch {
      return "/placeholder.svg"
    }
  }

  const isBestseller = (product) => {
    return product.name.includes("Wayfarer") || product.name.includes("Aviador") || product.name.includes("Luxury")
  }

  if (loading) {
    return (
      <div className="productos-page">
        <div className="container">
          <div className="productos-header">
            <h1 className="productos-title">Nuestros Productos</h1>
            <p className="productos-subtitle">Cargando productos...</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <Loader2 size={48} style={{ animation: "spin 1s linear infinite" }} />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="productos-page">
        <div className="container">
          <div className="productos-header">
            <h1 className="productos-title">Error</h1>
            <p className="productos-subtitle">{error}</p>
          </div>
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <button onClick={loadProducts} className="btn btn-primary">
              Reintentar
            </button>
            <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
              <p>Posibles soluciones:</p>
              <ul style={{ textAlign: "left", display: "inline-block" }}>
                <li>Verificar que el backend esté corriendo en puerto 3000</li>
                <li>Ejecutar: npm run dev en la carpeta del backend</li>
                <li>Verificar que MySQL esté activo</li>
                <li>
                  Probar:{" "}
                  <a href="http://localhost:3000/api/health" target="_blank" rel="noopener noreferrer">
                    http://localhost:3000/api/health
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="productos-page">
      <div className="container">
        <div className="productos-header">
          <h1 className="productos-title">Nuestros Productos</h1>
          <p className="productos-subtitle">Descubre nuestra amplia selección de gafas de sol y monturas graduadas</p>
          {allProducts.length > 0 && (
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              Mostrando {filteredProducts.length} de {allProducts.length} productos
            </p>
          )}
        </div>

        <div className="search-bar">
          <div className="search-input-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-toggle" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter size={18} />
            <span>Filtros</span>
            {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        <div className="productos-layout">
          <aside className={`productos-filters ${isFilterOpen ? "open" : ""}`}>
            <div className="filter-section">
              <h3 className="filter-title">Categorías</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryFilter === "all"}
                    onChange={() => setCategoryFilter("all")}
                  />
                  <span>Todos los productos</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryFilter === "sol"}
                    onChange={() => setCategoryFilter("sol")}
                  />
                  <span>Gafas de sol</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryFilter === "graduadas"}
                    onChange={() => setCategoryFilter("graduadas")}
                  />
                  <span>Monturas graduadas</span>
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Precio</h3>
              <div className="price-range">
                <div className="price-inputs">
                  <div className="price-input-group">
                    <label>Min</label>
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(e, 0)}
                    />
                  </div>
                  <div className="price-input-group">
                    <label>Max</label>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(e, 1)}
                    />
                  </div>
                </div>
                <div className="price-slider-container">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="price-slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="price-slider"
                  />
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Ordenar por</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "relevance"}
                    onChange={() => setSortBy("relevance")}
                  />
                  <span>Relevancia</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "price-low"}
                    onChange={() => setSortBy("price-low")}
                  />
                  <span>Precio: Menor a Mayor</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "price-high"}
                    onChange={() => setSortBy("price-high")}
                  />
                  <span>Precio: Mayor a Menor</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="sort" checked={sortBy === "rating"} onChange={() => setSortBy("rating")} />
                  <span>Mejor valorados</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "bestseller"}
                    onChange={() => setSortBy("bestseller")}
                  />
                  <span>Más vendidos</span>
                </label>
              </div>
            </div>
          </aside>

          <div className="productos-grid">
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros filtros o términos de búsqueda.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="producto-card">
                  <div className="producto-image">
                    <img
                      src={getImageUrl(product.images) || "/placeholder.svg"}
                      alt={product.name}
                      onError={(e) => {
                        console.log("❌ Error cargando imagen:", e.target.src)
                        e.target.src = "/placeholder.svg"
                      }}
                      onLoad={() => {
                        console.log("✅ Imagen cargada:", product.name)
                      }}
                    />
                    {isBestseller(product) && <div className="producto-badge bestseller">Más Vendido</div>}
                    <div className="producto-badge category">{product.category_name || "Gafas"}</div>
                    <div className="producto-actions">
                      <Link to={`/producto/${product.id}`} className="action-btn view-btn">
                        Ver Detalles
                      </Link>
                      <button
                        className="action-btn cart-btn"
                        onClick={() => handleAddToCart(product)}
                        disabled={addingToCart[product.id]}
                      >
                        {addingToCart[product.id] ? (
                          <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                        ) : (
                          <ShoppingCart size={16} />
                        )}
                        {addingToCart[product.id] ? "Agregando..." : "Añadir al Carrito"}
                      </button>
                    </div>
                  </div>
                  <div className="producto-info">
                    <h3 className="producto-title">{product.name}</h3>
                    <div className="producto-rating">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <Star key={i} size={16} className={i < 4 ? "star-filled" : "star-empty"} />
                        ))}
                      <span className="rating-count">(4.0)</span>
                    </div>
                    <p className="producto-description">
                      {product.description || `${product.brand} ${product.model}`.trim()}
                    </p>
                    <div className="producto-footer">
                      <span className="producto-price">${Number(product.price).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className={`cart-notification ${showNotification ? "show" : ""}`}>
        <ShoppingCart size={18} />
        <span>{notificationMessage}</span>
      </div>
    </div>
  )
}

export default Productos
