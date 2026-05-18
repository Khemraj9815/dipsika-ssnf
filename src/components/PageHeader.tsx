'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-green-100 text-lg">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
