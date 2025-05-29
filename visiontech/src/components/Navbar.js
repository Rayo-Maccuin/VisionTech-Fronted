"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import "./Navbar.css"
import authService from "../services/authService"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    window.location.href = "/"
  }

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <img
              src="logo.png"
              alt="VisionTech Logo"
              className="logo-image"
            />
          </Link>

          <nav className="navbar-menu desktop">
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
            <Link to="/productos" className="navbar-link">
              Productos
            </Link>
            <Link to="/servicios" className="navbar-link">
              Servicios
            </Link>
            <Link to="/citas" className="navbar-link">
              Citas
            </Link>
            <Link to="/carrito" className="navbar-link cart-link">
              <ShoppingCart className="cart-icon" />
              <span>Carrito</span>
              <span className="cart-badge">0</span>
            </Link>
            {user ? (
              <div className="user-dropdown">
                <button className="user-dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  {user.profileImage ? (
                    <img src={user.profileImage || "/placeholder.svg"} alt={user.name} className="user-avatar" />
                  ) : (
                    <div className="user-avatar-placeholder">{user.name.charAt(0).toUpperCase()}</div>
                  )}
                  <span className="user-name">{user.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/perfil" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      Mi Perfil
                    </Link>
                    <Link to="/citas" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      Mis Citas
                    </Link>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Iniciar Sesión
              </Link>
            )}
          </nav>

          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <span className="menu-icon">✕</span> : <span className="menu-icon">☰</span>}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="navbar-menu mobile">
            <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Inicio
            </Link>
            <Link to="/productos" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Productos
            </Link>
            <Link to="/servicios" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Servicios
            </Link>
            <Link to="/citas" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Citas
            </Link>
            <Link to="/carrito" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart className="cart-icon" />
              <span>Carrito</span>
              <span className="cart-badge">0</span>
            </Link>
            {user ? (
              <>
                <Link to="/perfil" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  Mi Perfil
                </Link>
                <Link to="/citas" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  Mis Citas
                </Link>
                <button
                  className="navbar-link logout"
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                Iniciar Sesión
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
