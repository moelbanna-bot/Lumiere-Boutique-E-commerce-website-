import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../services/productsService'

function Categories() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '🔌', description: 'Latest gadgets and tech accessories' },
    { id: 'fashion', name: 'Fashion', icon: '👔', description: 'Trendy clothing and accessories' },
    { id: 'home-living', name: 'Home & Living', icon: '🏠', description: 'Beautiful home decor and essentials' },
    { id: 'beauty', name: 'Beauty', icon: '✨', description: 'Skincare and beauty products' },
    { id: 'sports', name: 'Sports', icon: '⚽', description: 'Sports equipment and activewear' },
    { id: 'books', name: 'Books', icon: '📚', description: 'Books and stationery' }
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category.toLowerCase() === selectedCategory)

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>

  return (
    <div className="space-y-8">
      <div className="bg-primary-600 text-white py-12 px-4 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-xl">Explore our curated collection of products</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-3 rounded-full ${selectedCategory === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          All Categories
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full ${selectedCategory === category.id ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {selectedCategory === 'all' && categories.map(category => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{category.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>

      {selectedCategory !== 'all' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              <div className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary-600">${product.price}</span>
                  <button className="btn-primary text-sm">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Categories