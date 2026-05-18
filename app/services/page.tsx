'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { Leaf, Wrench } from 'lucide-react';
import toast from 'react-hot-toast';

type ServiceType = 'orchard-management' | 'landscape-design' | '';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceType>('');
  const [formData, setFormData] = useState({
    type: '',
    landDimensions: '',
    address: '',
    desiredPlants: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.customerName || !formData.customerEmail || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Booking request submitted! Our team will contact you soon.');
    setFormData({
      type: '',
      landDimensions: '',
      address: '',
      desiredPlants: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
    });
    setSelectedService('');
  };

  return (
    <div>
      <PageHeader
        title="Professional Services"
        subtitle="Expert landscaping and orchard management for Bhutanese properties"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Services Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 mb-20"
        >
          {[
            {
              icon: Leaf,
              title: 'Landscape Design & Installation',
              desc: 'Transform your property with professional landscape design and implementation services tailored to your vision.',
              features: [
                'Comprehensive site analysis and planning',
                'Custom landscape design and visualization',
                'Premium plant selection and sourcing',
                'Professional installation by experts',
                'Maintenance plans and ongoing support',
              ],
            },
            {
              icon: Wrench,
              title: 'Orchard Management Services',
              desc: 'Complete orchard management ensuring optimal plant health, productivity, and sustained growth.',
              features: [
                'Detailed soil testing and analysis',
                'Expert planting guidance and support',
                'Irrigation system planning and setup',
                'Integrated pest and disease management',
                'Seasonal monitoring and maintenance',
              ],
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 p-10"
            >
              <service.icon className="w-16 h-16 text-green-700 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{service.desc}</p>
              <ul className="space-y-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-12 border border-green-200"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Book a Service</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            Request a consultation with our expert horticulturists. Fill out the form below and our team will contact you within 24 hours to discuss your landscaping or orchard management needs.
          </p>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
            {/* Service Type */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Select Service Type <span className="text-red-600">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition text-gray-800"
              >
                <option value="">-- Choose a service --</option>
                <option value="landscape-design">Landscape Design & Installation</option>
                <option value="orchard-management">Orchard Management</option>
              </select>
            </div>

            {/* Land Dimensions */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Land Dimensions (length × width)
              </label>
              <input
                type="text"
                name="landDimensions"
                placeholder="e.g., 100m × 50m"
                value={formData.landDimensions}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Property Address <span className="text-red-600">*</span>
              </label>
              <textarea
                name="address"
                placeholder="Enter your complete address (Dzongkhag, Gewog, Village)"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition resize-none"
              ></textarea>
            </div>

            {/* Desired Plants */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Preferences & Special Requirements
              </label>
              <textarea
                name="desiredPlants"
                placeholder="Share your preferences, specific plant types, design style, or any special requirements"
                value={formData.desiredPlants}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition resize-none"
              ></textarea>
            </div>

            {/* Personal Details */}
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Your Contact Information</h3>
              <div className="space-y-5">
                <input
                  type="text"
                  name="customerName"
                  placeholder="Full Name *"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                />
                <input
                  type="email"
                  name="customerEmail"
                  placeholder="Email Address *"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                />
                <input
                  type="tel"
                  name="customerPhone"
                  placeholder="Phone Number (Optional)"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-lg transition text-lg shadow-md"
            >
              Submit Booking Request
            </button>
          </form>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Why Choose Our Services</h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">We combine expertise, quality, and dedication to deliver exceptional landscaping results</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Expert Team', desc: '25+ years of experience in horticulture and professional landscaping.' },
              { title: 'Premium Plants', desc: 'Only the healthiest and highest quality plants for all projects.' },
              { title: 'Custom Design', desc: 'Tailored solutions for your specific property needs and vision.' },
              { title: 'Ongoing Support', desc: 'Comprehensive maintenance guidance and post-project care.' },
              { title: 'Nationwide Service', desc: 'Serving customers across all regions of Bhutan.' },
              { title: 'Affordable Pricing', desc: 'Competitive rates without compromising quality.' },
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition text-center"
              >
                <h3 className="text-lg font-bold text-green-700 mb-3">{reason.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
