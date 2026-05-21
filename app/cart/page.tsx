'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { Trash2, ShoppingBag, X, Check } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { products } from '@/data/products';
import PageHeader from '@/components/PageHeader';

interface BuyerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dzongkhag: string;
  deliveryOption: 'standard' | 'express';
}

export default function CartPage() {
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dzongkhag: '',
    deliveryOption: 'standard',
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = total > 0 ? Math.round(total * 0.1) : 0;
  const grandTotal = total + deliveryFee;

  const getProductDetails = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!buyerInfo.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!buyerInfo.email.trim() || !buyerInfo.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!buyerInfo.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!buyerInfo.address.trim()) {
      toast.error('Please enter your delivery address');
      return false;
    }
    if (!buyerInfo.dzongkhag) {
      toast.error('Please select your dzongkhag');
      return false;
    }
    return true;
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleConfirmOrder = () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      
      // Show success message with buyer info
      toast.success(
        `Order confirmed!\nWe will contact you at ${buyerInfo.phone} soon.`,
        {
          duration: 4,
        }
      );

      // Close modal and reset after 3 seconds
      setTimeout(() => {
        setShowCheckoutModal(false);
        setOrderPlaced(false);
        clearCart();
        setBuyerInfo({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          dzongkhag: '',
          deliveryOption: 'standard',
        });
      }, 3000);
    }, 1500);
  };

  const handleCloseModal = () => {
    if (!isProcessing) {
      setShowCheckoutModal(false);
    }
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
                onClick={handleCheckoutClick}
                disabled={isProcessing}
                className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg transition mb-4 shadow-md text-lg"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
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

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] z-50 bg-white rounded-2xl shadow-2xl overflow-y-auto"
            >
              <div className="p-8">
                {!orderPlaced ? (
                  <>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
                        <p className="text-gray-600 mt-1">Please provide your delivery information</p>
                      </div>
                      <button
                        onClick={handleCloseModal}
                        disabled={isProcessing}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-green-50 p-6 rounded-lg mb-8 border border-green-200">
                      <div className="flex justify-between mb-4">
                        <span className="text-gray-700 font-medium">Subtotal:</span>
                        <span className="font-semibold">Nu. {total}</span>
                      </div>
                      <div className="flex justify-between mb-4">
                        <span className="text-gray-700 font-medium">Delivery Fee (10%):</span>
                        <span className="font-semibold text-orange-600">Nu. {deliveryFee}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-green-700 pt-4 border-t-2 border-green-300">
                        <span>Total:</span>
                        <span>Nu. {grandTotal}</span>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={buyerInfo.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          disabled={isProcessing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={buyerInfo.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          disabled={isProcessing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={buyerInfo.phone}
                          onChange={handleInputChange}
                          placeholder="+975 xxxxxxxxx"
                          disabled={isProcessing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                        />
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Delivery Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="address"
                          value={buyerInfo.address}
                          onChange={handleInputChange}
                          placeholder="Enter your complete delivery address"
                          disabled={isProcessing}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 resize-none"
                        />
                      </div>

                      {/* Dzongkhag Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Dzongkhag (District) <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="dzongkhag"
                          value={buyerInfo.dzongkhag}
                          onChange={handleInputChange}
                          disabled={isProcessing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                        >
                          <option value="">Select your dzongkhag</option>
                          <option value="thimphu">Thimphu</option>
                          <option value="paro">Paro</option>
                          <option value="punakha">Punakha</option>
                          <option value="wangdue">Wangdue Phodrang</option>
                          <option value="bumthang">Bumthang</option>
                          <option value="trongsa">Trongsa</option>
                          <option value="zhemgang">Zhemgang</option>
                          <option value="mongar">Mongar</option>
                          <option value="lhuentse">Lhuentse</option>
                          <option value="samdrup">Samdrup Jongkhar</option>
                          <option value="trashigang">Trashigang</option>
                          <option value="trashiyangtse">Trashiyangtse</option>
                          <option value="gasa">Gasa</option>
                          <option value="haa">Haa</option>
                          <option value="chhukha">Chhukha</option>
                          <option value="dagana">Dagana</option>
                          <option value="gelephu">Gelephu</option>
                          <option value="sambom">Sambom</option>
                          <option value="sarpang">Sarpang</option>
                          <option value="pemagatshel">Pemagatshel</option>
                        </select>
                      </div>

                      {/* Delivery Option */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                          Delivery Option <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-3">
                          <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition"
                            style={{borderColor: buyerInfo.deliveryOption === 'standard' ? '#15803d' : undefined}}
                          >
                            <input
                              type="radio"
                              name="deliveryOption"
                              value="standard"
                              checked={buyerInfo.deliveryOption === 'standard'}
                              onChange={handleInputChange}
                              disabled={isProcessing}
                              className="w-4 h-4 accent-green-700"
                            />
                            <span className="ml-4 flex-1">
                              <span className="font-semibold text-gray-900">Standard Delivery</span>
                              <p className="text-sm text-gray-600">5-7 days</p>
                            </span>
                          </label>

                          <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition"
                            style={{borderColor: buyerInfo.deliveryOption === 'express' ? '#15803d' : undefined}}
                          >
                            <input
                              type="radio"
                              name="deliveryOption"
                              value="express"
                              checked={buyerInfo.deliveryOption === 'express'}
                              onChange={handleInputChange}
                              disabled={isProcessing}
                              className="w-4 h-4 accent-green-700"
                            />
                            <span className="ml-4 flex-1">
                              <span className="font-semibold text-gray-900">Express Delivery</span>
                              <p className="text-sm text-gray-600">2-3 days (Recommended)</p>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={handleCloseModal}
                        disabled={isProcessing}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmOrder}
                        disabled={isProcessing}
                        className="flex-1 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg transition disabled:bg-gray-400 flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Check size={20} />
                            Confirm Order
                          </>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-10 h-10 text-green-700" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Order Confirmed! ✅</h3>
                    <p className="text-gray-600 mb-6">Thank you for your order, {buyerInfo.fullName}!</p>

                    <div className="bg-green-50 p-6 rounded-lg mb-6 border border-green-200 text-left">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Order Total</p>
                          <p className="text-2xl font-bold text-green-700">Nu. {grandTotal}</p>
                        </div>
                        <div className="pt-3 border-t border-green-300">
                          <p className="text-sm text-gray-600">Delivery to</p>
                          <p className="font-semibold text-gray-900">{buyerInfo.dzongkhag}</p>
                        </div>
                        <div className="pt-3 border-t border-green-300">
                          <p className="text-sm text-gray-600">Delivery Method</p>
                          <p className="font-semibold text-gray-900">
                            {buyerInfo.deliveryOption === 'standard' ? 'Standard (5-7 days)' : 'Express (2-3 days)'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">
                      We will contact you at <span className="font-semibold">{buyerInfo.phone}</span> soon with delivery details.
                    </p>

                    <p className="text-sm text-gray-500">
                      A confirmation email has been sent to <span className="font-semibold">{buyerInfo.email}</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
