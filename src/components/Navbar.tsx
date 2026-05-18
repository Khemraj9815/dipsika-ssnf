'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);

  return (
    <nav className="bg-white text-gray-800 shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logo.png" 
              alt="logo" 
              width={52} 
              height={52}
              className="w-12 h-12 object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-green-700 tracking-tight">Southern Seedling Nursery Farm</span>
              {/* <span className="text-xl font-medium text-gray-600 tracking-tight">Nursery Farm</span> */}
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-green-700 transition font-medium">
              Home
            </Link>
            <Link href="/products" className="hover:text-green-700 transition font-medium">
              Shop Plants
            </Link>
            <Link href="/services" className="hover:text-green-700 transition font-medium">
              Services
            </Link>
            <Link href="/about" className="hover:text-green-700 transition font-medium">
              About
            </Link>
            <Link href="/contact" className="hover:text-green-700 transition font-medium">
              Contact
            </Link>
          </div>

          {/* Cart Icon and CTA */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="flex items-center gap-2 hover:text-green-700 transition relative">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200 pt-4">
            <Link href="/" className="block py-2 hover:text-green-700 font-medium">
              Home
            </Link>
            <Link href="/products" className="block py-2 hover:text-green-700 font-medium">
              Shop Plants
            </Link>
            <Link href="/services" className="block py-2 hover:text-green-700 font-medium">
              Services
            </Link>
            <Link href="/about" className="block py-2 hover:text-green-700 font-medium">
              About
            </Link>
            <Link href="/contact" className="block py-2 hover:text-green-700 font-medium">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
