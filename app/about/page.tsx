'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { Leaf, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About Southern Seedling Nursery Farm"
        subtitle="25+ Years of Excellence in Horticulture"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 mb-20"
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-xl border border-green-200">
            <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-3">
              <Leaf className="w-8 h-8" />
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              To provide the highest quality plants and professional landscaping services that transform Bhutanese homes, farms, and businesses into beautiful, thriving spaces. We are dedicated to sustainable practices and exceptional customer satisfaction.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-10 rounded-xl border border-blue-200">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-3">
              <Award className="w-8 h-8" />
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              To be Bhutan's most trusted and leading online nursery platform, recognized for premium plant quality, expert landscaping services, and outstanding customer care. Nurturing nature while earning the trust of every customer.
            </p>
          </div>
        </motion.div>

        {/* Company History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Journey</h2>
          <div className="space-y-6">
            {[
              {
                year: '2001',
                title: 'Founded with Passion',
                desc: 'Southern Seedling Nursery Farm was established as a dedicated wholesale and retail nursery in Gelephu, Bhutan. With deep passion for plants and unwavering commitment to quality, we began our mission.',
              },
              {
                year: '2010s',
                title: 'Growth & Expansion',
                desc: 'Over these decades, we expanded operations, opened additional outlets, and served customers across multiple dzongkhags. We became known for supplying over 10 million healthy seedlings with consistent quality.',
              },
              {
                year: '2026',
                title: 'Digital Innovation',
                desc: 'Today, we proudly launch our comprehensive e-commerce platform, making our quality plants and expert services accessible to customers across Bhutan. This marks our evolution while honoring our family-friendly heritage.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md border-l-4 border-green-700 p-8 hover:shadow-lg transition"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-green-700 text-white font-bold text-2xl px-5 py-3 rounded-lg flex-shrink-0 min-w-24">
                    {item.year}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: Leaf, number: '25+', label: 'Years of Experience' },
            { icon: Users, number: '10M+', label: 'Seedlings Supplied' },
            { icon: Award, number: '20', label: 'Dzongkhags Served' },
            { icon: Leaf, number: '100+', label: 'Plant Varieties' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-green-600 to-green-700 text-white p-8 rounded-lg text-center"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">{stat.number}</p>
              <p className="text-green-100">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Quality First',
                desc: 'We are committed to providing only the highest quality plants and services to our customers.',
              },
              {
                title: 'Customer Focus',
                desc: 'Your satisfaction is our priority. We listen to your needs and provide tailored solutions.',
              },
              {
                title: 'Sustainability',
                desc: 'We practice sustainable farming and landscaping to protect our environment for future generations.',
              },
              {
                title: 'Innovation',
                desc: 'We embrace modern technology and innovative practices to improve our services.',
              },
              {
                title: 'Integrity',
                desc: 'We conduct our business with honesty, transparency, and ethical practices.',
              },
              {
                title: 'Community',
                desc: 'We support local communities and contribute to agricultural development in Bhutan.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-green-700 mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
