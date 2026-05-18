'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, ShoppingBag, Wrench, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import FAQ from '@/components/FAQ';
import { products } from '@/data/products';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative bg-gradient-to-r from-green-700 to-green-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} className="text-5xl font-bold mb-4">Nurturing Nature, Earning Trust</motion.h1>
          <motion.p initial={{ y: 20 }} animate={{ y: 0 }} className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">Welcome to Southern Seedling Nursery Farm</motion.p>
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="flex gap-4 justify-center flex-wrap">
            <Link href="/products" className="bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition">Shop Now</Link>
            <Link href="/services" className="bg-green-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-900 transition border-2 border-white">Book Services</Link>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-4 gap-8">
            {[{ icon: Leaf, title: '25+ Years', desc: 'Experience' }, { icon: ShoppingBag, title: 'Wide Range', desc: 'Plants & more' }, { icon: Wrench, title: 'Expert Services', desc: 'Landscaping' }, { icon: Star, title: 'Quality Assured', desc: 'Best plants' }].map((f, i) => <motion.div key={i} variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg"><f.icon className="w-12 h-12 mx-auto text-green-600 mb-4" /><h3 className="font-bold text-lg mb-2">{f.title}</h3><p className="text-gray-600">{f.desc}</p></motion.div>)}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Featured Plants</h2>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredProducts.map((p) => <motion.div key={p.id} variants={itemVariants}><ProductCard product={p} /></motion.div>)}
        </motion.div>
        <div className="text-center"><Link href="/products" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold">View All</Link></div>
      </section>

      <FAQ />
    </div>
  );
}
