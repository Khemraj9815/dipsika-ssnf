# Southern Seedling E-Commerce - Technical Documentation

## Architecture Overview

This document provides detailed technical information about the Southern Seedling E-Commerce website architecture, implementation, and best practices.

## Frontend Architecture

### Next.js App Router Structure

The application uses Next.js 16+ with the App Router (not Pages Router):

```
app/
├── layout.tsx              # Root layout component
├── layout-client.tsx       # Client-side wrapper for interactive components
├── page.tsx                # Root page (homepage)
├── products/
│   ├── page.tsx           # Product listing with filters
│   └── [id]/page.tsx      # Dynamic product detail routes
├── services/page.tsx       # Service booking page
├── cart/page.tsx           # Shopping cart page
├── about/page.tsx          # About page
└── contact/page.tsx        # Contact page
```

### Client vs Server Components

**Server Components (Default):**
- Metadata generation
- Direct database access (future)
- Server-side authentication checks
- Static pages

**Client Components (`'use client'`):**
- Interactive components (ProductCard, Navbar, Cart)
- Use of hooks (useState, useEffect)
- Event handlers
- Client-side state management

### State Management with Zustand

Zustand is used for lightweight, performant state management:

```typescript
// Store definition
const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set(...),
  removeItem: (id) => set(...),
  // ...
}));

// Usage in components
const items = useCartStore(state => state.items);
const addItem = useCartStore(state => state.addItem);
```

**Benefits:**
- No provider boilerplate
- Minimal bundle size
- Excellent performance
- TypeScript support
- Persists to localStorage (can be added)

## Component Architecture

### Layout Components

**LayoutClient.tsx**
- Wraps all pages with Navbar, Footer, Chatbot
- Handles toast notifications
- Manages global client-side state

**Navbar.tsx**
- Responsive navigation with mobile hamburger menu
- Shopping cart badge with item count
- Links to main pages
- Green gradient styling

**Footer.tsx**
- Contact information
- Quick links
- Newsletter subscription (stub)
- Social links

### Page Components

**ProductCard.tsx**
```typescript
interface ProductCardProps {
  product: Product;
}
```
- Reusable component for displaying products
- Shows image, price, rating, stock status
- Add to cart button with toast notification
- Link to detailed product page

**ProductDetail**
- Full product information
- Customer reviews section
- Planting guidelines
- Maintenance tips
- Related products (can be added)

### Interactive Components

**Chatbot.tsx**
- Floating chat widget
- AI-powered responses for common questions
- Message history
- Expandable/collapsible interface

**Shopping Cart**
- Item management (add, remove, update quantity)
- Real-time total calculation
- Delivery fee calculation (10% of subtotal)
- Checkout flow

## Data Models

### Product Type
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

### Cart Item Type
```typescript
interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}
```

### Service Booking Type
```typescript
interface ServiceBooking {
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
```

## Styling & CSS

### Tailwind CSS Configuration

The project uses Tailwind CSS with custom configuration:

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        green: {
          600: '#16a34a',  // Primary
          700: '#15803d',  // Dark
        },
      },
    },
  },
};
```

### Design System

**Colors:**
- Primary Green: `#15803d` (Brand color)
- Light Green: `#4ade80` (Accents)
- Neutral: Gray palette for text and backgrounds
- Alerts: Red (#dc2626), Yellow (#ca8a04)

**Typography:**
- Headings: Bold (600-700 weight)
- Body: Regular (400 weight)
- Mono: For code/technical text

**Responsive Breakpoints:**
- Mobile: < 640px (single column)
- Tablet: 640px-1024px (two columns)
- Desktop: > 1024px (three columns)

## Performance Optimizations

### Image Optimization

Using Next.js Image component:

```typescript
<Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

**Benefits:**
- Automatic WebP conversion
- Responsive image loading
- Lazy loading below the fold
- Proper aspect ratio handling

### Code Splitting

Next.js automatically code-splits at route boundaries:
- Each page is a separate chunk
- Reduced initial bundle size
- Faster page transitions

### Bundle Analysis

```bash
npm install --save-dev @next/bundle-analyzer
```

### Animations Performance

Framer Motion with GPU acceleration:
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
/>
```

## API Integration

### Current Setup

The app currently uses local data from `src/data/products.ts`.

### Adding Backend API

When ready to add a backend:

```typescript
// Create API client
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Use in components
const { data: products } = await api.get('/products');
```

### Backend Endpoints to Implement

```
GET    /api/products              # List all products
GET    /api/products/:id          # Get product details
GET    /api/products/search       # Search products
POST   /api/orders                # Create order
GET    /api/orders/:id            # Get order details
POST   /api/bookings              # Create service booking
GET    /api/bookings/:id          # Get booking details
POST   /api/auth/login            # User authentication
```

## Error Handling

### Error Boundaries

Implement error boundaries for graceful error handling:

```typescript
export function ErrorBoundary({ error }: { error: Error }) {
  return <div>Something went wrong: {error.message}</div>;
}
```

### Toast Notifications

Using react-hot-toast for user feedback:

```typescript
toast.success('Item added to cart!');
toast.error('Out of stock');
toast.loading('Processing order...');
```

## Security Considerations

### Current Implementation

- No authentication (ready to add)
- No sensitive data stored
- Environment variables for configuration

### To Add Later

1. **Authentication**
   - JWT tokens
   - Refresh tokens
   - Secure httpOnly cookies

2. **Authorization**
   - Role-based access control (RBAC)
   - Admin dashboard protection
   - User profile security

3. **Data Protection**
   - HTTPS only (automatic with Vercel)
   - Content Security Policy (CSP)
   - XSS protection
   - CSRF protection

4. **Payment Security**
   - PCI DSS compliance (when using Stripe)
   - Encrypted payment data
   - Webhook verification

## Testing

### Unit Testing Setup

```bash
npm install --save-dev @testing-library/react jest
```

### Example Test

```typescript
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';

describe('ProductCard', () => {
  it('renders product name', () => {
    const product = { id: '1', name: 'Test Plant', ... };
    render(<ProductCard product={product} />);
    expect(screen.getByText('Test Plant')).toBeInTheDocument();
  });
});
```

### E2E Testing

```bash
npm install --save-dev playwright @playwright/test
```

## Build & Deployment

### Build Process

```bash
npm run build
```

Generates `.next` directory with:
- Optimized JavaScript bundles
- Pre-rendered static pages
- Server-side rendering cache

### Production Build Optimization

The production build automatically:
- Minifies code and CSS
- Optimizes images
- Removes dead code (tree shaking)
- Chunks code for better caching

## Environment Variables

### Development (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Production (.env.production)

```
NEXT_PUBLIC_API_URL=https://southernseedling.com/api
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 12+, Chrome Mobile latest

## Accessibility (A11y)

### Current Implementation

- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- Image alt text
- Color contrast ratios (WCAG AA)
- Keyboard navigation support

### ARIA Labels

```typescript
<button aria-label="Add to cart">
  <ShoppingCart />
</button>
```

## Monitoring & Analytics

Ready to integrate:
- Google Analytics
- Sentry (error tracking)
- LogRocket (session replay)
- Vercel Analytics

## SEO Optimization

### Meta Tags

```typescript
export const metadata: Metadata = {
  title: 'Southern Seedling Nursery',
  description: 'Quality plants and landscaping services',
  keywords: 'plants, nursery, gardening, landscaping, Bhutan',
};
```

### Sitemap & Robots

Create `public/sitemap.xml` and `public/robots.txt` for search engine crawling.

## Development Workflow

### Git Workflow

```bash
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create Pull Request
```

### Code Quality

```bash
# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## Troubleshooting

### Common Issues

1. **Build fails with import errors**
   - Check tsconfig.json paths
   - Clear `.next` folder: `rm -rf .next`

2. **Images not loading**
   - Verify image URLs in products.ts
   - Check image dimensions
   - Use absolute URLs for external images

3. **Hydration errors**
   - Ensure client/server match
   - Wrap dynamic components in `<Suspense>`
   - Remove 'use client' if not needed

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zustand Guide](https://github.com/pmndrs/zustand)

---

Last Updated: May 2026
Maintained by: BIM 303 GROUP 02
