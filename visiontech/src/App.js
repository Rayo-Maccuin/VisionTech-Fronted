import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Citas from "./pages/Citas"
import Productos from "./pages/Productos"
import Carrito from "./pages/Carrito"
import DetalleProducto from "./pages/DetalleProducto"
import Servicios from "./pages/Servicios"
import RecuperarPassword from "./pages/RecuperarPassword"
import Perfil from "./pages/Perfil"
import DetalleCita from "./pages/DetalleCita"
import Pago from "./pages/Pago"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/cita/:id" element={<DetalleCita />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/pago" element={<Pago />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/recuperar-password" element={<RecuperarPassword />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App



