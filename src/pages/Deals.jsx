import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/productsService'

function Deals() {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const products = await getProducts()
        const dealsWithDiscounts = products.slice(0, 6).map(product => ({
          ...product,
          originalPrice: product.price,
          discountPercentage: Math.floor(Math.random() * 30) + 20,
          endsAt: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000)
        }))
        setDeals(dealsWithDiscounts)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountedPrice = originalPrice * (1 - discountPercentage / 100)
    return discountedPrice.toFixed(2)
  }

  const calculateTimeLeft = (endDate) => {
    const total = Date.parse(endDate) - Date.now()
    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((total / 1000 / 60) % 60)

    return `${days}d ${hours}h ${minutes}m`
  }

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-red-600 to-primary-600 text-white py-12 px-4 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Hot Deals & Special Offers</h1>
          <p className="text-xl">Limited time offers on premium products</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {deals.map(deal => {
          const discountedPrice = calculateDiscountedPrice(deal.originalPrice, deal.discountPercentage)
          const timeLeft = calculateTimeLeft(deal.endsAt)

          return (
            <div key={deal.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-200">
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full font-semibold">
                -{deal.discountPercentage}%
              </div>

              <div className="p-4">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-48 object-contain hover:scale-105 transition-transform duration-200"
                />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold line-clamp-2">{deal.name}</h3>
                <p className="text-gray-600">{deal.category}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary-600">${discountedPrice}</span>
                    <span className="text-gray-500 line-through">${deal.originalPrice}</span>
                  </div>
                  <div className="text-sm text-red-600 font-medium">
                    Save ${(deal.originalPrice - discountedPrice).toFixed(2)}
                  </div>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Offer ends in:</p>
                  <p className="text-lg font-semibold text-primary-600">{timeLeft}</p>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/products/${deal.id}`}
                    className="btn-primary flex-1 text-center py-2"
                  >
                    View Details
                  </Link>
                  <button className="btn-secondary flex-1 py-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Never Miss a Deal!</h2>
        <p className="text-gray-600 mb-6">Subscribe to our newsletter and be the first to know about our exclusive offers</p>
        <div className="flex max-w-md mx-auto gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 input"
          />
          <button className="btn-primary whitespace-nowrap">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Deals