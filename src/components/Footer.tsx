'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600 mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="/ssnf-logo.webp" 
                alt="SSNF Logo" 
                width={40} 
                height={40}
                className="w-10 h-10"
              />
              <div>
                <h3 className="text-gray-900 font-bold text-sm">Southern Seedling</h3>
                <p className="text-xs text-gray-500">Nursery Farm</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Quality plants and professional landscaping services for Bhutan.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="hover:text-green-700 transition">All Plants</Link></li>
              <li><Link href="/products?category=fruit-trees" className="hover:text-green-700 transition">Fruit Trees</Link></li>
              <li><Link href="/products?category=ornamental" className="hover:text-green-700 transition">Ornamental</Link></li>
              <li><Link href="/products?category=timber" className="hover:text-green-700 transition">Timber Trees</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-green-700 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-green-700 transition">About Us</Link></li>
              <li><Link href="/services" className="hover:text-green-700 transition">Services</Link></li>
              <li><Link href="/contact" className="hover:text-green-700 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-green-700 transition">Landscape Design</Link></li>
              <li><Link href="/services" className="hover:text-green-700 transition">Orchard Management</Link></li>
              <li><Link href="/services" className="hover:text-green-700 transition">Plant Consultation</Link></li>
              <li><Link href="/contact" className="hover:text-green-700 transition">Book Now</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-700 mt-1">📍</span>
                <span>Samtenling, Bhur, Gelephu</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700">📞</span>
                <a href="tel:+975" className="hover:text-green-700 transition">+975 1234567</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700">✉️</span>
                <a href="mailto:info@southernseedling.com" className="hover:text-green-700 transition">info@southernseedling.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-green-50 rounded-lg p-6 mb-12 border border-green-200">
          <h3 className="text-gray-900 font-bold mb-2">Subscribe to Our Newsletter</h3>
          <p className="text-sm text-gray-600 mb-4">Get the latest plant care tips and exclusive offers delivered to your inbox.</p>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded transition font-medium whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2026 Southern Seedling Nursery Farm. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-green-700 transition">Privacy Policy</a>
              <a href="#" className="hover:text-green-700 transition">Terms of Service</a>
              <a href="#" className="hover:text-green-700 transition">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
