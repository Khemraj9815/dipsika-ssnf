'use client';

import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity: 1,
      price: product.price,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200 group h-full flex flex-col">
      {/* Product Image */}
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition duration-300"
        />
        {product.inventory < 10 && product.inventory > 0 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Low Stock
          </div>
        )}
        {product.inventory === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg text-gray-900 hover:text-green-700 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Category */}
        <p className="text-xs text-green-700 font-semibold mt-2 uppercase tracking-wide">
          {product.category.replace('-', ' ')}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews.length} reviews)</span>
        </div>

        {/* Price */}
        <p className="text-3xl font-bold text-green-700 mt-4">Nu. {product.price}</p>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-3 line-clamp-2 flex-grow">{product.description}</p>

        {/* Stock Status */}
        <p className={`text-xs font-semibold mt-3 ${product.inventory > 0 ? 'text-green-700' : 'text-red-600'}`}>
          {product.inventory > 0 ? `✓ ${product.inventory} in stock` : '✕ Out of stock'}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-lg transition text-center text-sm"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.inventory === 0}
            className="flex-1 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
