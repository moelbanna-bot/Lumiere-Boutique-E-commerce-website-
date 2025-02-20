import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/productsService'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <div className="space-y-8 bg-gray-100 p-8 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col max-w-[280px] mx-auto w-full">
            <div className="p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain hover:scale-105 transition-transform duration-200" />
            </div>
            <div className="p-2 flex flex-col flex-1">
              <h3 className="text-base font-medium mb-1 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{product.category}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-base font-semibold text-primary-600">${product.price}</span>
                <Link 
                  to={`/products/${product.id}`}
                  className="btn-primary text-xs px-2 py-1"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products