"use client"

import { useState, useEffect } from "react"
import { Share2, Facebook, Twitter, Instagram, Linkedin, Copy, Check } from "lucide-react"

function CompartirRedes() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [shareStats, setShareStats] = useState({})
  const [copiedLink, setCopiedLink] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })

  useEffect(() => {
    loadProducts()
    loadShareStats()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: "Gafas Ray-Ban Aviador Clásico",
          price: 159.99,
          image: "/placeholder.svg?height=300&width=300",
          description: "Las icónicas gafas aviador que nunca pasan de moda",
          category: "Gafas de Sol",
        },
        {
          id: 2,
          name: "Monturas Oakley Graduadas",
          price: 199.99,
          image: "/placeholder.svg?height=300&width=300",
          description: "Monturas deportivas de alta calidad para uso diario",
          category: "Monturas Graduadas",
        },
        {
          id: 3,
          name: "Gafas Wayfarer Vintage",
          price: 129.99,
          image: "/placeholder.svg?height=300&width=300",
          description: "Estilo retro con tecnología moderna",
          category: "Gafas de Sol",
        },
      ]
      setProducts(mockProducts)
      setSelectedProduct(mockProducts[0])
      setLoading(false)
    }, 1000)
  }

  const loadShareStats = async () => {

    setTimeout(() => {
      setShareStats({
        totalShares: 2847,
        facebookShares: 1205,
        twitterShares: 892,
        instagramShares: 634,
        linkedinShares: 116,
      })
    }, 1200)
  }

  const generateShareContent = (platform, product) => {
    const baseUrl = "https://opticavision.com"
    const productUrl = `${baseUrl}/producto/${product.id}`

    const content = {
      facebook: {
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
        text: `¡Mira estas increíbles ${product.name}! ${product.description}`,
      },
      twitter: {
        url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`¡Mira estas increíbles ${product.name}! ${product.description}`)}%20${encodeURIComponent(productUrl)}`,
        text: `¡Mira estas increíbles ${product.name}! ${product.description}`,
      },
      instagram: {
        url: productUrl,
        text: `¡Mira estas increíbles ${product.name}! 😎✨\n\n${product.description}\n\n💰 $${product.price}\n\n#OpticaVision #Gafas #Estilo`,
      },
      linkedin: {
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}`,
        text: `Descubre las ${product.name} - ${product.description}`,
      },
    }

    return content[platform]
  }

  const handleShare = async (platform, product) => {
    const shareContent = generateShareContent(platform, product)


    setTimeout(() => {
      console.log(`Compartido en ${platform}:`, {
        productId: product.id,
        platform: platform,
        timestamp: new Date().toISOString(),
      })

      // Actualizar estadísticas 
      setShareStats((prev) => ({
        ...prev,
        totalShares: prev.totalShares + 1,
        [`${platform}Shares`]: (prev[`${platform}Shares`] || 0) + 1,
      }))

      setNotification({
        show: true,
        message: `¡Producto compartido en ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`,
        type: "success",
      })

      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" })
      }, 3000)
    }, 500)

    if (platform !== "instagram") {
      window.open(shareContent.url, "_blank", "width=600,height=400")
    } else {

      try {
        await navigator.clipboard.writeText(shareContent.text)
        setNotification({
          show: true,
          message: "Texto copiado al portapapeles. ¡Pégalo en tu post de Instagram!",
          type: "success",
        })
        setTimeout(() => {
          setNotification({ show: false, message: "", type: "" })
        }, 4000)
      } catch (err) {
        console.error("Error copiando al portapapeles:", err)
      }
    }
  }

  const copyProductLink = async (product) => {
    const productUrl = `https://opticavision.com/producto/${product.id}`

    try {
      await navigator.clipboard.writeText(productUrl)
      setCopiedLink(true)
      setNotification({
        show: true,
        message: "¡Enlace copiado al portapapeles!",
        type: "success",
      })

      setTimeout(() => {
        setCopiedLink(false)
        setNotification({ show: false, message: "", type: "" })
      }, 3000)
    } catch (err) {
      console.error("Error copiando enlace:", err)
      setNotification({
        show: true,
        message: "Error copiando enlace",
        type: "error",
      })
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" })
      }, 3000)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: "40px 20px", backgroundColor: "rgba(230, 230, 230, 0.3)", minHeight: "100vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #1e2f5f",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px",
              }}
            ></div>
            <p>Cargando productos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "rgba(230, 230, 230, 0.3)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1e2f5f", marginBottom: "10px" }}>
            Compartir en Redes Sociales
          </h1>
          <p style={{ color: "#555", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Comparte nuestros productos con tus amigos y seguidores en redes sociales
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Share2 style={{ width: "40px", height: "40px", color: "#1e2f5f" }} />
            <div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1e2f5f", margin: "0 0 5px 0" }}>
                {shareStats.totalShares?.toLocaleString()}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#666", margin: "0" }}>Compartidos totales</p>
            </div>
          </div>
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Facebook style={{ width: "40px", height: "40px", color: "#1877f2" }} />
            <div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1e2f5f", margin: "0 0 5px 0" }}>
                {shareStats.facebookShares?.toLocaleString()}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#666", margin: "0" }}>Facebook</p>
            </div>
          </div>
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Twitter style={{ width: "40px", height: "40px", color: "#1da1f2" }} />
            <div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1e2f5f", margin: "0 0 5px 0" }}>
                {shareStats.twitterShares?.toLocaleString()}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#666", margin: "0" }}>Twitter</p>
            </div>
          </div>
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Instagram style={{ width: "40px", height: "40px", color: "#e4405f" }} />
            <div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1e2f5f", margin: "0 0 5px 0" }}>
                {shareStats.instagramShares?.toLocaleString()}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#666", margin: "0" }}>Instagram</p>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>
          <div>
            <h3 style={{ color: "#1e2f5f", marginBottom: "20px", fontSize: "1.2rem" }}>
              Selecciona un producto para compartir:
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    background: "white",
                    border: selectedProduct?.id === product.id ? "2px solid #1e2f5f" : "2px solid #eee",
                    borderRadius: "12px",
                    padding: "20px",
                    cursor: "pointer",
                    textAlign: "center",
                    backgroundColor: selectedProduct?.id === product.id ? "rgba(30, 47, 95, 0.05)" : "white",
                  }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "15px",
                    }}
                  />
                  <div>
                    <h4 style={{ color: "#1e2f5f", margin: "0 0 8px 0", fontSize: "1rem" }}>{product.name}</h4>
                    <p style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1e2f5f", margin: "0 0 8px 0" }}>
                      ${product.price}
                    </p>
                    <span
                      style={{
                        backgroundColor: "rgba(30, 47, 95, 0.1)",
                        color: "#1e2f5f",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                      }}
                    >
                      {product.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedProduct && (
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", gap: "25px", padding: "30px", borderBottom: "1px solid #eee" }}>
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "12px", flexShrink: "0" }}
                />
                <div>
                  <h2 style={{ color: "#1e2f5f", margin: "0 0 10px 0", fontSize: "1.5rem" }}>{selectedProduct.name}</h2>
                  <p style={{ color: "#666", margin: "0 0 15px 0", lineHeight: "1.6" }}>
                    {selectedProduct.description}
                  </p>
                  <p style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1e2f5f", margin: "0 0 8px 0" }}>
                    ${selectedProduct.price}
                  </p>
                  <span
                    style={{
                      backgroundColor: "rgba(30, 47, 95, 0.1)",
                      color: "#1e2f5f",
                      padding: "4px 10px",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      textTransform: "capitalize",
                    }}
                  >
                    {selectedProduct.category}
                  </span>
                </div>
              </div>

              <div style={{ padding: "30px" }}>
                <h3 style={{ color: "#1e2f5f", marginBottom: "20px", fontSize: "1.2rem" }}>Compartir en:</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "15px",
                    marginBottom: "30px",
                  }}
                >
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "15px 20px",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      color: "white",
                      backgroundColor: "#1877f2",
                    }}
                    onClick={() => handleShare("facebook", selectedProduct)}
                  >
                    <Facebook size={24} />
                    <span>Facebook</span>
                  </button>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "15px 20px",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      color: "white",
                      backgroundColor: "#1da1f2",
                    }}
                    onClick={() => handleShare("twitter", selectedProduct)}
                  >
                    <Twitter size={24} />
                    <span>Twitter</span>
                  </button>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "15px 20px",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      color: "white",
                      background:
                        "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                    }}
                    onClick={() => handleShare("instagram", selectedProduct)}
                  >
                    <Instagram size={24} />
                    <span>Instagram</span>
                  </button>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "15px 20px",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      color: "white",
                      backgroundColor: "#0077b5",
                    }}
                    onClick={() => handleShare("linkedin", selectedProduct)}
                  >
                    <Linkedin size={24} />
                    <span>LinkedIn</span>
                  </button>
                </div>

                <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 20px",
                      border: "2px solid #1e2f5f",
                      background: "white",
                      color: "#1e2f5f",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() => copyProductLink(selectedProduct)}
                  >
                    {copiedLink ? <Check size={20} /> : <Copy size={20} />}
                    <span>{copiedLink ? "Enlace copiado" : "Copiar enlace"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {notification.show && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "15px 20px",
            borderRadius: "8px",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: "1001",
            backgroundColor: notification.type === "success" ? "#4caf50" : "#f44336",
          }}
        >
          <Share2 size={20} />
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  )
}

export default CompartirRedes
