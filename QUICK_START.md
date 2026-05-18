# Southern Seedling E-Commerce - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- A code editor (VS Code recommended)

### Step 1: Install Dependencies

```bash
cd southern-seedling-website
npm install
```

### Step 2: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3: Explore the Website

- **Homepage** - See featured products and services
- **Products** - Browse catalog with search and filters
- **Product Details** - Click any product to see full information
- **Shopping Cart** - Add items and checkout
- **Services** - Book landscaping or orchard management
- **About** - Learn company history
- **Contact** - Get in touch

## 📁 Project Files You'll Need

**Key files to understand:**

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage |
| `src/components/ProductCard.tsx` | Product display card |
| `src/data/products.ts` | Product data (JSON) |
| `app/cart/page.tsx` | Shopping cart |
| `app/services/page.tsx` | Service booking |

## 🛠️ Common Tasks

### Add a New Product

Edit `src/data/products.ts`:

```typescript
{
  id: '9',
  name: 'Your Plant Name',
  category: 'fruit-trees',  // or other categories
  price: 500,
  image: 'https://image-url.com/plant.jpg',
  description: 'Plant description',
  inventory: 50,
  plantingGuidelines: 'How to plant...',
  maintenanceDetails: 'Care instructions...',
  deliveryOptions: ['Standard (5-7 days)', 'Express (2-3 days)'],
  rating: 4.5,
  reviews: [],
}
```

### Modify Chatbot Responses

Edit `src/components/Chatbot.tsx`:

```typescript
const botResponses: { [key: string]: string } = {
  'your keyword': 'Your custom response',
  // Add more keywords and responses
};
```

### Change Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      green: {
        600: '#16a34a',  // Change to your color
        700: '#15803d',
      },
    },
  },
}
```

### Update Contact Information

Edit `src/components/Footer.tsx` and `app/contact/page.tsx`:

```typescript
'📞 +975 17 123456'  // Update phone
'✉️ info@southernseedling.com'  // Update email
```

## 🎨 Customization Guide

### Change Website Title

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your New Title",
  description: "Your new description",
};
```

### Modify Hero Section

Edit `app/page.tsx` (first section):

```typescript
<h1 className="text-5xl font-bold mb-4">
  Your New Headline
</h1>
<p className="text-xl text-green-100 mb-8">
  Your new description
</p>
```

### Add FAQ Items

Edit `src/components/FAQ.tsx`:

```typescript
const faqs = [
  {
    question: "Your question?",
    answer: "Your answer here",
  },
  // Add more FAQs
];
```

## 📦 Building for Production

```bash
# Build the project
npm run build

# Test production build locally
npm start

# Visit http://localhost:3000
```

## 🚀 Deploy to Vercel (Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

Your site is live! 🎉

See `DEPLOYMENT.md` for more deployment options.

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Use a different port
npm run dev -- -p 3001
```

### Module Not Found Error

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Images Not Showing

- Check image URLs are valid
- Use absolute URLs for external images
- Verify image files exist

## 📚 Important Files

```
📁 southern-seedling-website
├── 📄 README.md          ← Main documentation
├── 📄 TECHNICAL.md       ← Technical details
├── 📄 DEPLOYMENT.md      ← Deployment guide
├── 📄 package.json       ← Dependencies
│
├── 📁 app/               ← Pages
│   ├── page.tsx          ← Homepage
│   ├── layout.tsx        ← Main layout
│   ├── products/
│   ├── cart/
│   ├── services/
│   └── contact/
│
└── 📁 src/
    ├── components/       ← Reusable components
    ├── data/            ← Product data
    ├── store/           ← State management
    └── types/           ← TypeScript types
```

## 🎯 Next Steps

1. **Understand the Structure**
   - Read `README.md`
   - Explore `TECHNICAL.md`

2. **Customize Content**
   - Update products
   - Change colors
   - Add company info

3. **Test Features**
   - Browse products
   - Add to cart
   - Try chatbot
   - Fill contact form

4. **Deploy**
   - Follow `DEPLOYMENT.md`
   - Use Vercel (recommended)

5. **Monitor & Improve**
   - Check user feedback
   - Monitor performance
   - Plan updates

## 💡 Tips

- **Hot Reload**: Changes update instantly in browser
- **Mobile View**: Use browser DevTools (F12) to test mobile
- **Inspect Elements**: Right-click → Inspect to see HTML
- **Console Errors**: Check browser console (F12) for issues

## 🆘 Need Help?

- Check `TECHNICAL.md` for detailed docs
- Review component files for examples
- Check Next.js docs: https://nextjs.org/docs
- Contact: info@southernseedling.com

## ✅ Quick Checklist

- [ ] Installed Node.js 18+
- [ ] Ran `npm install`
- [ ] Ran `npm run dev`
- [ ] Website opens at localhost:3000
- [ ] Can see homepage
- [ ] Can browse products
- [ ] Can add to cart

You're ready to go! 🚀

---

**Questions? Check the documentation or ask the development team!**

Last Updated: May 2026
