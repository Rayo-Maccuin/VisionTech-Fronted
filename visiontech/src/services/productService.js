import apiClient from './apiClient'

const productService = {
  // Obtener todos los productos
  getProducts: async (filters = {}) => {
    try {
      const response = await apiClient.get('/products', { params: filters })
      return { success: true, products: response.products, pagination: response.pagination }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Obtener producto por ID
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`)
      return { success: true, product: response.product }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Obtener categorías
  getCategories: async () => {
    try {
      const response = await apiClient.get('/products/categories/all')
      return { success: true, categories: response.categories }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}

export default productService