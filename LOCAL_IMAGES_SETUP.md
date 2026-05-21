# Local Image Setup Guide

## 📁 Step-by-Step Instructions

### Step 1: Create Images Folder
First, create a folder in your public directory to store product images:

```bash
mkdir -p /home/khemrajghalley/Documents/YEAR3_II/dipsika/dipsika-ssnf/public/images/products
```

### Step 2: Download Images

Download these images and save them to `public/images/products/`:

**Products to download:**

1. **Mango Tree** - `mango.jpg`
   - Download from: https://gkgfarmcebu.ph/wp-content/uploads/2023/02/Grafted-Indian-Mango-Plant2.jpg
   - Or use any mango plant image

2. **Rose Plant** - `rose.jpg`
   - Download from: https://5.imimg.com/data5/SELLER/Default/2024/9/451668959/OK/QW/IK/151548506/rose-flowers-plant-1000x1000.jpg
   - Or use any rose flower image

3. **Teak Sapling** - `teak.jpg`
   - Download from: https://celgenbiotech.com/cdn/shop/files/41.jpg
   - Or use any teak tree image

4. **Buffalo Grass** - `buffalo-grass.jpg`
   - Download from: https://grechsturf.com.au/wp-content/uploads/2022/02/Growing-Buffalo-Grass-From-Seed.jpg
   - Or use any grass image

5. **Orchid** - `orchid.jpg`
   - Download from: https://www.orchid-tree.com/cdn/shop/files/WWW.ORCHID-TREE.COM_33.jpg
   - Or use any orchid image

### Step 3: Quick Download Using Terminal

Run these commands to download the images:

```bash
cd /home/khemrajghalley/Documents/YEAR3_II/dipsika/dipsika-ssnf/public/images/products

# Download Mango
curl -L "https://gkgfarmcebu.ph/wp-content/uploads/2023/02/Grafted-Indian-Mango-Plant2.jpg" -o mango.jpg

# Download Rose
curl -L "https://5.imimg.com/data5/SELLER/Default/2024/9/451668959/OK/QW/IK/151548506/rose-flowers-plant-1000x1000.jpg" -o rose.jpg

# Download Teak
curl -L "https://celgenbiotech.com/cdn/shop/files/41.jpg" -o teak.jpg

# Download Buffalo Grass
curl -L "https://grechsturf.com.au/wp-content/uploads/2022/02/Growing-Buffalo-Grass-From-Seed.jpg" -o buffalo-grass.jpg

# Download Orchid
curl -L "https://www.orchid-tree.com/cdn/shop/files/WWW.ORCHID-TREE.COM_33.jpg" -o orchid.jpg
```

### Step 4: Verify Images Downloaded

```bash
ls -la /home/khemrajghalley/Documents/YEAR3_II/dipsika/dipsika-ssnf/public/images/products/
```

You should see:
- mango.jpg
- rose.jpg
- teak.jpg
- buffalo-grass.jpg
- orchid.jpg
- fern.jpg (already exists - Unsplash)
- lemon.jpg (already exists - Unsplash)

---

## 🔄 Update Product URLs

The product URLs will be updated to use local paths like:
```
/images/products/mango.jpg
/images/products/rose.jpg
etc.
```

Instead of external URLs.

---

## ✅ Benefits of Local Images

✅ **Always available** - No dependency on external URLs
✅ **Faster loading** - Served from your server
✅ **Better control** - Can optimize and resize
✅ **No broken images** - External URLs won't break
✅ **Works offline** - For development

---

## 📝 Current File Structure After Setup

```
public/
├── images/
│   └── products/
│       ├── mango.jpg
│       ├── rose.jpg
│       ├── teak.jpg
│       ├── buffalo-grass.jpg
│       ├── orchid.jpg
│       ├── fern.jpg (from Unsplash)
│       └── lemon.jpg (from Unsplash)
└── other files...
```

---

## 📌 Next Steps

1. Create the `public/images/products` folder
2. Download the images using curl commands (or manually)
3. I'll update the product URLs in `products.ts` to point to local files

Ready? Let me know when images are downloaded!
