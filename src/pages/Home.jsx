import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/productsService'

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getProducts()
        setFeaturedProducts(products.slice(0, 3))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching featured products:', error)
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="space-y-12">
      <div className="bg-primary-600 text-white py-16 px-4 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Lumière Boutique</h1>
          <p className="text-xl mb-8">Discover exquisite pieces for the discerning shopper</p>
          <Link to="/products" className="btn bg-white text-primary-600 hover:bg-gray-100">
            Shop Now
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain hover:scale-105 transition-transform duration-200 p-4" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                  <Link 
                    to={`/products/${product.id}`}
                    className="btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Electronics', 'Fashion', 'Home & Living'].map((category) => (
            <div 
              key={category}
              className="bg-gray-100 rounded-lg p-8 text-center hover:bg-gray-200 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <Link 
                to={`/products?category=${category.toLowerCase()}`}
                className="text-primary-600 hover:text-primary-700"
              >
                Browse {category} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
