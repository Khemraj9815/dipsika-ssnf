'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Browse our product catalog, add items to your cart, and proceed to checkout. Fill in your delivery details and confirm your order.',
  },
  {
    question: 'What is your delivery timeframe?',
    answer: 'Standard delivery takes 5-7 days. Express delivery is available for 2-3 days. Lawn grass orders have faster delivery options.',
  },
  {
    question: 'Do you offer service bookings?',
    answer: 'Yes, we offer landscape design and orchard management services. Use the Services page to book a consultation.',
  },
  {
    question: 'Can I return plants?',
    answer: 'Plants can be returned if damaged during delivery. Please contact us within 24 hours with photos for assessment.',
  },
  {
    question: 'Do you ship nationwide?',
    answer: 'Yes, we deliver to all 20 dzongkhags in Bhutan. Delivery costs vary based on location.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-green-600" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 border-t text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
