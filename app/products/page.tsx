'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import PageHeader from '@/components/PageHeader';
import { products } from '@/data/products';
import { Search } from 'lucide-react';

type Category = 'all' | 'fruit-trees' | 'ornamental' | 'timber' | 'foliage' | 'lawn-grasses';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All Products' },
    { value: 'fruit-trees', label: 'Fruit Trees' },
    { value: 'ornamental', label: 'Ornamental Plants' },
    { value: 'timber', label: 'Timber Trees' },
    { value: 'foliage', label: 'Foliage Plants' },
    { value: 'lawn-grasses', label: 'Lawn Grasses' },
  ];

  return (
    <div>
      <PageHeader
        title="Product Catalog"
        subtitle="Browse our complete range of plants and saplings"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="relative">
            <Search className="absolute left-4 top-4 text-gray-400" size={22} />
            <input
              type="text"
              placeholder="Search plants by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
            />
          </div>
        </motion.div>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2.5 rounded-full font-semibold transition border-2 ${
                  selectedCategory === category.value
                    ? 'bg-green-700 text-white border-green-700 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-600 hover:text-green-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 pb-6 border-b border-gray-200"
        >
          <p className="text-gray-600 font-medium">
            Showing <span className="text-green-700 font-bold">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-600 text-lg mb-4">No plants found matching your search.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-green-700 hover:text-green-900 font-bold transition"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
