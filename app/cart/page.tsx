'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { products } from '@/data/products';
import PageHeader from '@/components/PageHeader';

export default function CartPage() {
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = total > 0 ? Math.round(total * 0.1) : 0;
  const grandTotal = total + deliveryFee;

  const getProductDetails = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setIsCheckingOut(true);
    toast.success('Order placed successfully! We will contact you soon.');
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div>
      <PageHeader title="Shopping Cart" subtitle="Review and manage your plant selections" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">Start adding plants to your cart. Browse our collection of quality plants and enjoy fast delivery across Bhutan.</p>
            <Link
              href="/products"
              className="inline-block bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-lg font-bold transition shadow-lg"
            >
              Explore Plants →
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Cart Items ({cartItems.length})</h2>
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = getProductDetails(item.productId);
                  if (!product) return null;

                  return (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 p-6 flex gap-6"
                    >
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link
                          href={`/products/${product.id}`}
                          className="font-bold text-gray-900 hover:text-green-700 transition text-lg"
                        >
                          {product.name}
                        </Link>
                        <p className="text-green-700 font-semibold text-lg mt-1">Nu. {item.price}</p>
                        <p className="text-gray-600 text-sm mt-2">{product.category}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 transition font-bold"
                          >
                            −
                          </button>
                          <span className="font-bold px-6 py-2 text-center min-w-12">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 transition font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal & Remove */}
                        <div className="text-right min-w-32">
                          <p className="font-bold text-green-700 text-lg">Nu. {item.price * item.quantity}</p>
                          <button
                            onClick={() => {
                              removeItem(item.productId);
                              toast.success('Item removed from cart');
                            }}
                            className="text-red-600 hover:text-red-700 text-xs mt-1 transition inline-flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <button
                onClick={clearCart}
                className="mt-8 text-red-600 hover:text-red-700 font-semibold transition text-sm"
              >
                Clear All Items
              </button>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 h-fit sticky top-28 border border-green-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold">Nu. {total}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Delivery Fee (10%)</span>
                  <span className="font-semibold text-orange-600">Nu. {deliveryFee}</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-green-700 mb-8 bg-white p-4 rounded-lg border-2 border-green-700">
                <span>Total Amount</span>
                <span>Nu. {grandTotal}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg transition mb-4 shadow-md text-lg"
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              <Link
                href="/products"
                className="w-full block text-center bg-white hover:bg-gray-50 text-green-700 font-bold py-3 rounded-lg transition border-2 border-green-700"
              >
                Continue Shopping
              </Link>

              <div className="mt-8 pt-6 border-t border-gray-300 space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Secure checkout with encryption</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Fast delivery across Bhutan</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>24/7 customer support available</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
