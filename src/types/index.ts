// Types for the e-commerce platform

export interface Product {
  id: string;
  name: string;
  category: 'fruit-trees' | 'ornamental' | 'timber' | 'foliage' | 'lawn-grasses';
  price: number;
  image: string;
  description: string;
  inventory: number;
  plantingGuidelines: string;
  maintenanceDetails: string;
  deliveryOptions: string[];
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  customerEmail: string;
  customerName: string;
  deliveryAddress: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface ServiceBooking {
  id: string;
  type: 'orchard-management' | 'landscape-design';
  landDimensions: string;
  address: string;
  desiredPlants: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
}
