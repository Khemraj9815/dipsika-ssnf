'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { products } from '@/data/products';
import { useParams } from 'next/navigation';
import { ShoppingCart, Star, Leaf } from 'lucide-react';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity: 1,
      price: product.price,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-96 bg-gray-200 rounded-lg overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-green-600 font-semibold mb-2">
                {product.category.replace('-', ' ').toUpperCase()}
              </p>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews.length} reviews)</span>
              </div>

              <p className="text-gray-600 text-lg mb-6">{product.description}</p>

              {/* Price & Stock */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-green-600 mb-2">Nu. {product.price}</p>
                <p className={`text-lg font-semibold ${
                  product.inventory > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition mb-6"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {/* Delivery Options */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-gray-800 mb-3">Delivery Options</h3>
                <ul className="space-y-2">
                  {product.deliveryOptions.map((option, index) => (
                    <li key={index} className="text-gray-600 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <div className="border-t">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Leaf className="text-green-600" />
                  Planting Guidelines
                </h3>
                <p className="text-gray-700 leading-relaxed">{product.plantingGuidelines}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Leaf className="text-green-600" />
                  Maintenance Details
                </h3>
                <p className="text-gray-700 leading-relaxed">{product.maintenanceDetails}</p>
              </motion.div>
            </div>
          </div>

          {/* Reviews */}
          {product.reviews.length > 0 && (
            <div className="border-t bg-gray-50 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-gray-800">{review.author}</p>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex text-yellow-400 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
