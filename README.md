# Southern Seedling Nursery - E-Commerce Website

A modern, fully-featured e-commerce platform built for Southern Seedling Nursery Farm in Bhutan. This project transforms a traditional family-run nursery business into a digital marketplace accessible nationwide.

## 🌿 Project Overview

**Theme:** "Nurturing Nature, Earning Trust"

This e-commerce platform solves key business challenges:
- **Geographic Limitation**: Customers across all 20 dzongkhags can now shop online
- **Information Inefficiency**: 24/7 digital product catalog with detailed plant information
- **Service Management**: Online booking system for landscaping and orchard management
- **Marketing & Promotion**: Professional digital presence with customer reviews

## ✨ Key Features

### 🛍️ Shopping & Products
- Dynamic product catalog with 100+ plant varieties
- Search and filter by category (Fruit Trees, Ornamental, Timber, Foliage, Lawn Grasses)
- Detailed product pages with pricing, inventory, planting guidelines, and maintenance details
- Customer reviews and ratings system
- Shopping cart with real-time updates
- Secure checkout process

### 📋 Service Booking
- Online booking portal for landscape design services
- Orchard management consultation booking
- Customizable service requests with land dimensions and preferences
- Automated confirmation and follow-up system

### 💬 Customer Support
- 24/7 AI-powered chatbot for plant care questions
- FAQ section covering common queries
- Contact form with business hours
- Live support availability

### 🎨 Design & UX
- Green and earth-tone color scheme representing nature
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Intuitive navigation
- Fast loading times with Next.js optimization

## 🏗️ Project Structure

```
southern-seedling-website/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with metadata
│   ├── layout-client.tsx        # Client-side layout wrapper
│   ├── page.tsx                 # Homepage with hero, featured products
│   ├── products/
│   │   ├── page.tsx            # Products catalog with filters
│   │   └── [id]/
│   │       └── page.tsx        # Individual product detail page
│   ├── services/
│   │   └── page.tsx            # Service booking page
│   ├── cart/
│   │   └── page.tsx            # Shopping cart page
│   ├── about/
│   │   └── page.tsx            # About company page
│   └── contact/
│       └── page.tsx            # Contact form page
├── src/
│   ├── components/              # Reusable React components
│   │   ├── Navbar.tsx          # Navigation bar with cart
│   │   ├── Footer.tsx          # Footer with links
│   │   ├── ProductCard.tsx     # Product display card
│   │   ├── Chatbot.tsx         # AI chatbot widget
│   │   ├── FAQ.tsx             # FAQ section
│   │   └── PageHeader.tsx      # Page header component
│   ├── data/
│   │   └── products.ts         # Product database
│   ├── store/
│   │   └── index.ts            # Zustand state management
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── public/                       # Static assets
└── package.json                  # Dependencies
```

## 🚀 Technology Stack

### Frontend
- **Next.js 16.2.6** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Lucide React** - Icons

### Libraries
- **react-hot-toast** - Notifications
- **axios** - HTTP requests
- **next/image** - Image optimization

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open `http://localhost:3000` in your browser.

## 🎯 Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/products` | Product catalog |
| `/products/[id]` | Product details |
| `/services` | Service booking |
| `/cart` | Shopping cart |
| `/about` | About company |
| `/contact` | Contact form |

## 🎨 Design

- **Primary Color**: Green-700 (#15803d)
- **Responsive**: Mobile, Tablet, Desktop
- **Animations**: Smooth transitions with Framer Motion
- **Accessibility**: WCAG compliant

## 🚀 Deployment

Ready to deploy on Vercel, Netlify, AWS, or any Node.js hosting.

**Deploy to Vercel:**
```bash
npm install -g vercel
vercel
```

See `DEPLOYMENT.md` for detailed instructions.

## 📄 Documentation

- `README.md` - This file
- `DOCUMENTATION.md` - Detailed technical documentation
- `DEPLOYMENT.md` - Deployment guide
- `AGENTS.md` - AI agent configuration

## 📞 Contact

**Southern Seedling Nursery Farm**
- 📍 Samtenling, Bhur, Gelephu, Bhutan
- 📞 +975 17 123456
- 📧 info@southernseedling.com

---

**BIM 303 Project - GROUP 02**
Built with ❤️ for nurturing nature and earning trust

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
