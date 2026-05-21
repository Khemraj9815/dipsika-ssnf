/images/products/buffalo-grass.jpg# Deployment Guide - Southern Seedling E-Commerce Website

Complete guide to deploy the Southern Seedling website to production.

## 🚀 Deployment Options

### Option 1: Vercel (Easiest - Recommended)

Vercel is the creator of Next.js and offers the best experience for Next.js apps.

#### Steps:

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/southern-seedling.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Environment Variables** (if needed)
   - Project Settings → Environment Variables
   - Add any required variables
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in ~1-2 minutes
   - URL will be: `https://southern-seedling.vercel.app`

5. **Custom Domain** (Optional)
   - Settings → Domains
   - Add your domain (e.g., `southernseedling.com`)
   - Point DNS records to Vercel

#### Pros:
- ✅ Automatic CI/CD
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ One-click rollbacks
- ✅ Analytics included

---

### Option 2: Netlify

Similar to Vercel with good Next.js support.

#### Steps:

1. **Connect Repository**
   - Visit https://netlify.com
   - Click "Add New Site"
   - Select "Connect to Git"
   - Choose your repository

2. **Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `.next`

3. **Deploy**
   - Click "Deploy Site"
   - Site will be live within minutes

---

### Option 3: AWS Amplify

For enterprise-level hosting.

#### Steps:

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize Amplify**
   ```bash
   amplify init
   ```

3. **Deploy**
   ```bash
   amplify publish
   ```

---

### Option 4: Traditional VPS/Server

For maximum control using a Linux server.

#### Prerequisites:
- Ubuntu 20.04+ server
- Node.js 18+
- PM2 for process management
- Nginx as reverse proxy

#### Steps:

1. **Setup Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs

   # Install PM2
   sudo npm install -g pm2

   # Install Nginx
   sudo apt install -y nginx
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   cd /var/www
   git clone https://github.com/yourusername/southern-seedling.git
   cd southern-seedling

   # Install dependencies
   npm install

   # Build application
   npm run build
   ```

3. **Start with PM2**
   ```bash
   # Start application
   pm2 start npm --name "southern-seedling" -- start

   # Save PM2 startup
   pm2 startup
   pm2 save
   ```

4. **Configure Nginx**
   
   Create `/etc/nginx/sites-available/southern-seedling`:
   ```nginx
   server {
       listen 80;
       server_name southernseedling.com www.southernseedling.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/southern-seedling \
     /etc/nginx/sites-enabled/

   # Test configuration
   sudo nginx -t

   # Restart Nginx
   sudo systemctl restart nginx
   ```

5. **Setup SSL with Let's Encrypt**
   ```bash
   # Install Certbot
   sudo apt install -y certbot python3-certbot-nginx

   # Get certificate
   sudo certbot --nginx -d southernseedling.com -d www.southernseedling.com

   # Auto-renew certificates
   sudo systemctl enable certbot.timer
   sudo systemctl start certbot.timer
   ```

---

### Option 5: Docker + Docker Compose

For containerized deployment.

#### Dockerfile:
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

#### docker-compose.yml:
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

#### Deploy:
```bash
docker-compose up -d
```

---

## 📊 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database/API endpoints set correctly
- [ ] Build succeeds: `npm run build`
- [ ] No console errors or warnings
- [ ] Images optimized
- [ ] Meta tags updated for SEO
- [ ] Security headers configured
- [ ] HTTPS enabled
- [ ] Error pages configured
- [ ] Monitoring/logging setup
- [ ] Backups configured
- [ ] CDN configured (if applicable)

## 🔒 Security Configuration

### Environment Variables
Create `.env.production.local`:
```env
NEXT_PUBLIC_API_URL=https://api.southernseedling.com
API_SECRET_KEY=your-secret-key
DATABASE_URL=your-database-url
```

### Security Headers (nginx)
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## 📈 Performance Optimization

### Enable Caching
```nginx
# Cache static assets for 1 year
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Enable Gzip Compression
```nginx
gzip on;
gzip_types text/plain text/css text/xml text/javascript 
           application/x-javascript application/xml+rss 
           application/javascript application/json;
gzip_min_length 1000;
```

## 🔍 Monitoring & Logging

### PM2 Monitoring
```bash
pm2 monit
pm2 logs southern-seedling
```

### Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### Application Monitoring
- **Vercel Analytics:** Built-in (if using Vercel)
- **Google Analytics:** Add tracking code to `_document.tsx`
- **Sentry:** For error tracking
- **DataDog:** For infrastructure monitoring

## 🔄 Continuous Integration/Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: vercel --prod --token $VERCEL_TOKEN
```

## 🚨 Troubleshooting Deployment

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### High Memory Usage
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Database Connection Issues
- Verify connection string
- Check firewall rules
- Ensure database is running
- Test with local connection first

## 📞 Support & Maintenance

### Regular Maintenance Tasks
- [ ] Monitor error logs weekly
- [ ] Update dependencies monthly
- [ ] Review security patches
- [ ] Backup database regularly
- [ ] Monitor performance metrics
- [ ] Update SSL certificates

### Backup Strategy
```bash
# Daily backups to S3
0 2 * * * /backup-scripts/backup-to-s3.sh
```

## 🎯 Post-Deployment

1. **Test Live Site**
   - Visit your domain
   - Check all pages load
   - Test shopping cart
   - Test forms

2. **Monitor Performance**
   - Check Core Web Vitals
   - Monitor error rates
   - Review analytics

3. **Setup Alerts**
   - High error rate alert
   - High response time alert
   - Database connection alert

4. **Document**
   - Save deployment notes
   - Document any custom configs
   - Update team on live URL

---

**Deployment Date:** [Your deployment date]  
**Live URL:** [Your live URL]  
**Support Email:** info@southernseedling.com
