'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gift, Menu, X, Sparkles, Home, Info } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                GiftGenius
              </span>
              <div className="text-xs text-gray-500 -mt-1">AI-Powered Recommendations</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              href="/find-gift" 
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find Gift</span>
            </Link>
            <Link 
              href="/about" 
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link
              href="/find-gift"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Finding Gifts
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 transition-colors p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link 
                href="/find-gift" 
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="w-4 h-4" />
                <span>Find Gift</span>
              </Link>
              <Link 
                href="/about" 
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
              <Link
                href="/find-gift"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold text-center mt-4 hover:from-purple-600 hover:to-pink-600 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Finding Gifts
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
