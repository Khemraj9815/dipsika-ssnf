# Southern Seedling Nursery - E-Commerce Website

A complete modern e-commerce platform for Southern Seedling Nursery Farm in Bhutan. Built with Next.js, React, TypeScript, and Tailwind CSS.

**Theme:** "Nurturing Nature, Earning Trust"

## 🌿 Features

### Customer Features
- **Product Catalog** - Browse 100+ plant varieties across 5 categories
  - Fruit Trees
  - Ornamental Plants
  - Timber Trees
  - Foliage Plants
  - Lawn Grasses
- **Advanced Search & Filter** - Find plants by name, category, or features
- **Product Details** - View images, pricing, inventory, planting guidelines, maintenance tips
- **Shopping Cart** - Add/remove items, adjust quantities
- **Secure Checkout** - Calculate totals and delivery fees
- **Service Booking** - Online booking for landscape design and orchard management
- **Customer Reviews** - View and read plant reviews
- **24/7 Chatbot** - AI-powered assistant for plant care questions

### Admin Features
- Product inventory management
- Order tracking and management
- Service booking administration
- Customer management
- Sales reporting

### Design Features
- **Green & Earth Tones** - Nature-inspired color scheme
- **Fully Responsive** - Perfect on mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion animations
- **Modern UI** - Clean, minimalist design
- **Fast Performance** - Optimized Next.js with Turbopack

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16.2.6
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **HTTP Client:** Axios

### Development
- **Node.js** & npm
- **ESLint** for code quality
- **Git** for version control

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (optional, for version control)

## 🚀 Getting Started

### 1. Installation

```bash
# Navigate to the project directory
cd southern-seedling-website

# Install dependencies
npm install
```

### 2. Development Server

```bash
# Start the development server
npm run dev
```

The application will be available at:
- **Local:** http://localhost:3000 (or http://localhost:3001 if 3000 is in use)
- **Network:** http://[YOUR_IP]:3000

### 3. Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### 4. Linting & Code Quality

```bash
# Run ESLint
npm run lint

# Fix linting issues automatically
npx eslint --fix
```

## 📁 Project Structure

```
southern-seedling-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── layout-client.tsx        # Client-side layout wrapper
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── contact/
│   │   └── page.tsx             # Contact page
│   ├── products/
│   │   ├── page.tsx             # Products catalog
│   │   └── [id]/
│   │       └── page.tsx         # Product detail page
│   ├── services/
│   │   └── page.tsx             # Services & booking
│   └── cart/
│       └── page.tsx             # Shopping cart
├── src/
│   ├── components/              # React components
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer
│   │   ├── ProductCard.tsx      # Product card component
│   │   ├── PageHeader.tsx       # Page header
│   │   ├── Chatbot.tsx          # 24/7 chatbot
│   │   ├── FAQ.tsx              # FAQ section
│   │   └── index.ts             # Component exports
│   ├── data/
│   │   └── products.ts          # Product database
│   ├── store/
│   │   └── index.ts             # Zustand state management
│   └── types/
│       └── index.ts             # TypeScript types
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── next.config.ts
```

## 🎨 Color Scheme

- **Primary Green:** `#059669` (emerald-600)
- **Dark Green:** `#065f46` (emerald-800)
- **Light Green:** `#ecfdf5` (emerald-50)
- **Earth Brown:** `#92400e` (amber-900)
- **Text:** `#1f2937` (gray-800)
- **Light Background:** `#f9fafb` (gray-50)

## 📦 Key Dependencies

### Production
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Styling
- `zustand` - State management
- `framer-motion` - Animations
- `lucide-react` - Icons
- `react-hot-toast` - Notifications
- `axios` - HTTP client

### Development
- `eslint` - Linting
- `@types/node`, `@types/react` - Type definitions

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment variables (if needed):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Tailwind Configuration

Located in `tailwind.config.ts` - customize colors, fonts, and responsive breakpoints.

### TypeScript Configuration

Located in `tsconfig.json` - manages path aliases and compiler options.

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

All components are fully responsive using Tailwind CSS grid and flexbox.

## 🗂️ Page Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured products and services |
| `/products` | Product catalog with search and filters |
| `/products/[id]` | Individual product details |
| `/cart` | Shopping cart and checkout |
| `/services` | Service booking (landscape design & orchard management) |
| `/about` | Company information and values |
| `/contact` | Contact form and business information |

## 💾 State Management (Zustand)

### Cart Store
- `items` - Cart items array
- `addItem()` - Add item to cart
- `removeItem()` - Remove item from cart
- `updateQuantity()` - Update item quantity
- `clearCart()` - Empty cart
- `getTotal()` - Calculate cart total

### Order Store
- `orders` - Orders array
- `addOrder()` - Create new order
- `getOrders()` - Retrieve customer orders

## 🤖 Chatbot Features

The 24/7 chatbot can help customers with:
- Plant care and maintenance
- Delivery information
- Order tracking
- Payment methods
- Company information

Keywords trigger automated responses. Easily extensible for more features.

## 📊 Product Data Structure

```typescript
interface Product {
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
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t southern-seedling .
docker run -p 3000:3000 southern-seedling
```

### Traditional Server (Nginx)

```bash
# Build the project
npm run build

# Copy .next directory to server
scp -r .next server:/var/www/southern-seedling/

# Start with PM2
pm2 start "npm start" --name southern-seedling
```

## 📈 Performance Optimization

- **Image Optimization:** Next.js automatic image optimization
- **Code Splitting:** Automatic with dynamic imports
- **CSS Optimization:** PurgeCSS with Tailwind
- **Bundle Analysis:** Run `npm run analyze` (if configured)

## 🔐 Security Best Practices

- ✅ HTTPS enforcement (on production)
- ✅ XSS protection with React's built-in escaping
- ✅ CSRF tokens for forms
- ✅ Input validation
- ✅ Secure headers with Next.js
- ✅ Environment variable protection

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Build Errors
```bash
# Clear cache
rm -rf .next node_modules package-lock.json

# Reinstall
npm install

# Rebuild
npm run build
```

### Component Not Found
Ensure proper imports using the `@/` alias path:
```typescript
import Component from '@/components/ComponentName';
```

## 📚 Documentation Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Zustand](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion)

## 👥 Team

- **Dipsika Ghalley**
- **Nikki Ghalley**
- **Tsering Dema**

**Course:** BIM 303  
**Date:** May 2026  
**Institution:** Bhutan

## 📝 License

This project is created for educational purposes. All rights reserved for Southern Seedling Nursery Farm.

## 📞 Support

For issues or questions:
- Email: info@southernseedling.com
- Phone: +975 1234567
- WhatsApp: Available during business hours

---

**Theme:** "Nurturing Nature, Earning Trust"  
**Version:** 1.0.0  
**Last Updated:** May 2026
