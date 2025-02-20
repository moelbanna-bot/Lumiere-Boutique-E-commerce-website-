import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-200 flex items-center gap-2"
          >
            <span className="text-3xl">✨</span>
            <span className="hidden sm:inline font-serif italic">Lumière Boutique</span>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link 
              to="/products" 
              className="text-white/90 hover:text-white hover:transform hover:translate-y-[-2px] transition-all duration-200 font-medium"
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className="text-white/90 hover:text-white hover:transform hover:translate-y-[-2px] transition-all duration-200 font-medium"
            >
              Categories
            </Link>
            <Link 
              to="/deals" 
              className="text-white/90 hover:text-white hover:transform hover:translate-y-[-2px] transition-all duration-200 font-medium"
            >
              Deals
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`relative transition-all duration-300 ${isSearchOpen ? 'w-48' : 'w-8'}`}>
              <input
                type="text"
                placeholder="Search..."
                className={`bg-white/10 text-white placeholder-white/60 rounded-full py-1 px-3 focus:outline-none focus:ring-2 focus:ring-white/50 w-full transition-all duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}
              />
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="absolute right-0 top-0 text-white/90 hover:text-white p-1"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            </div>

            <Link 
              to="/cart" 
              className="relative group"
            >
              <ShoppingCartIcon className="h-6 w-6 text-white/90 group-hover:text-white transition-colors duration-200" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center group-hover:animate-pulse">3</span>
            </Link>

            <Link 
              to="/login" 
              className="hover:bg-white/10 p-2 rounded-full transition-colors duration-200"
            >
              <UserIcon className="h-6 w-6 text-white/90 hover:text-white transition-colors duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar