'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Thank you! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out anytime."
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10 mb-20"
        >
          {[
            {
              icon: MapPin,
              title: 'Visit Us',
              details: ['Samtenling, Bhur', 'Gelephu, Bhutan'],
            },
            {
              icon: Phone,
              title: 'Call Us',
              details: ['+975 17 123456', '+975 17 654321'],
            },
            {
              icon: Mail,
              title: 'Email Us',
              details: ['info@southernseedling.com', 'support@southernseedling.com'],
            },
          ].map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-xl shadow-md border border-green-200 text-center hover:shadow-lg transition"
            >
              <contact.icon className="w-14 h-14 mx-auto text-green-700 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">{contact.title}</h3>
              <div className="space-y-2">
                {contact.details.map((detail, i) => (
                  <p key={i} className="text-gray-700 font-medium">{detail}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 p-12 rounded-xl shadow-md border border-green-200 mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-10 flex items-center gap-3">
            <Clock className="text-green-700 w-8 h-8" />
            Business Hours
          </h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="font-bold text-gray-900 mb-4 text-lg">Main Nursery (Gelephu)</p>
              <ul className="space-y-2 text-gray-700">
                <li>Monday - Friday: <span className="font-semibold">8:00 AM - 5:00 PM</span></li>
                <li>Saturday: <span className="font-semibold">9:00 AM - 3:00 PM</span></li>
                <li>Sunday: <span className="font-semibold">Closed</span></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-4 text-lg">Online Support</p>
              <ul className="space-y-2 text-gray-700">
                <li>Chat Support: <span className="font-semibold">24/7 Available</span></li>
                <li>Email Response: <span className="font-semibold">Within 24 hours</span></li>
                <li>Chatbot Support: <span className="font-semibold">Round the clock</span></li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-12 border border-green-200"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Get In Touch</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            Have a question or interested in our services? Fill out the form below and we'll get back to you within 24 hours.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email Address <span className="text-red-600">*</span></label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+975 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Message <span className="text-red-600">*</span></label>
              <textarea
                name="message"
                placeholder="Tell us about your inquiry..."
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-lg transition text-lg shadow-md"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
