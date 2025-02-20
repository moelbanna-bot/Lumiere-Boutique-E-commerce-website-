import React from 'react'
import { Link } from 'react-router-dom'

function Cart() {
  const cartItems = [
    {
      id: 1,
      name: 'Premium Headphones',
      price: 199.99,
      quantity: 1,
      image: 'https://placehold.co/300x300'
    }
  ]

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary px-2 py-1">-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button className="btn-secondary px-2 py-1">+</button>
                </div>
                <button className="text-red-600 hover:text-red-700">
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn-primary w-full text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart