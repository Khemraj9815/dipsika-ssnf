'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { ChatMessage } from '@/types';

async function getChatbotResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || 'Sorry, I couldn\'t generate a response. Please try again.';
  } catch (error) {
    console.error('Chatbot API error:', error);
    return 'Sorry, I encountered an error. Please try again or contact us at info@southernseedling.com';
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      message: 'Hello! 🌿 How can I help you today? Ask me about plants, delivery, or our services.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    const userInput = input;
    setInput('');

    try {
      // Get response from API
      const botResponse = await getChatbotResponse(userInput);

      // Add bot response after a brief delay for better UX
      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          message: botResponse,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      setIsLoading(false);
      
      // Show error message
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: 'Sorry, I encountered an error. Please try again or contact us at info@southernseedling.com',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white rounded-full p-4 shadow-2xl transition transform hover:scale-110 z-40 flex items-center justify-center w-14 h-14"
        title="Open Chat"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full sm:w-96 bg-white rounded-xl shadow-2xl flex flex-col z-40 max-h-[600px] border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-green-600 text-white px-4 py-4 rounded-t-xl flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse"></div>
              <div>
                <h3 className="font-bold text-lg">Plant Assistant</h3>
                <p className="text-xs text-green-100">Always here to help 🌿</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-800 p-2 rounded-full transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2.5 rounded-lg shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-green-700 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg rounded-bl-none px-4 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 flex gap-2 bg-white rounded-b-xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white rounded-lg px-4 py-2 transition flex items-center justify-center transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
              title="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
