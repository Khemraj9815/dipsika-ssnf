# 🔧 CHATBOT NOT WORKING IN PRODUCTION - COMPLETE FIX

## ❌ Problem Summary

**Symptom**: Chatbot returns static fallback responses in production instead of AI-powered responses

**Root Cause**: `GROQ_API_KEY` environment variable is NOT set in your production deployment

**Why it works locally**: Your `.env.local` file has the key, but `.env.local` is NOT deployed to production

---

## ✅ IMMEDIATE FIX (Required)

### **Step 1: Identify Your Hosting Platform**

Where is your website deployed?
- ☐ **Vercel** (most common for Next.js)
- ☐ **Netlify**
- ☐ **AWS Amplify**
- ☐ **Custom server/VPS**
- ☐ Other: ___________

---

## 🚀 FIX FOR VERCEL (If using Vercel)

### **Step 1: Go to Vercel Dashboard**
1. Visit https://vercel.com
2. Sign in with your account
3. Click your project name: **dipsika-ssnf** (or whatever it's called)

### **Step 2: Access Environment Variables**
1. Click **Settings** (top navigation)
2. Click **Environment Variables** (left sidebar)

### **Step 3: Add the API Key**
1. Click **Add New**
2. Fill in the form:
   ```
   Name:         GROQ_API_KEY
   Value:        your_key_here
   Environment:  Select "Production" or "All"
   ```
3. Click **Save**

### **Step 4: Redeploy**

**Option A - Automatic (Recommended):**
```bash
cd your-project-folder
git add .
git commit -m "Add GROQ_API_KEY to production"
git push origin main
```
Vercel will automatically redeploy when code is pushed.

**Option B - Manual Redeploy:**
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **...** (three dots menu)
4. Click **Redeploy**
5. Wait 2-3 minutes for deployment

### **Step 5: Verify It's Working**
1. Wait for green checkmark on deployment
2. Visit your production URL
3. Open chatbot and ask: **"What plants should I grow in summer?"**
4. ✅ Should get detailed AI response (not static text)

---

## 🚀 FIX FOR NETLIFY (If using Netlify)

### **Step 1: Go to Netlify Dashboard**
1. Visit https://netlify.com
2. Sign in to your account
3. Select your site

### **Step 2: Access Environment Variables**
1. Click **Site settings** (top menu)
2. Click **Build & deploy** (left sidebar)
3. Click **Environment** section

### **Step 3: Add the Variable**
1. Click **Edit variables**
2. Add new variable:
   ```
   Name:  GROQ_API_KEY
   Value: your_key_here
   ```
3. Click **Save**

### **Step 4: Redeploy**

**Option A - Push to Git:**
```bash
git add .
git commit -m "Update chatbot for production"
git push origin main
```

**Option B - Manual Trigger:**
1. Go to **Deploys** tab
2. Click **Trigger deploy**
3. Select **Deploy site**
4. Wait for deployment

### **Step 5: Verify**
- Wait for green status
- Test chatbot on production site

---

## 🚀 FIX FOR AWS AMPLIFY (If using AWS)

### **Step 1: Go to AWS Amplify Console**
1. Visit https://console.aws.amazon.com/amplify
2. Select your application
3. Select your main branch

### **Step 2: Add Environment Variable**
1. Click **App settings** → **Environment variables**
2. Click **Manage variables**
3. Add:
   ```
   Name:  GROQ_API_KEY
   Value: your_key_here
   ```
4. Save changes

### **Step 3: Redeploy**
1. Go to **Deployments**
2. Select latest deployment
3. Click **Redeploy this version**
4. Wait for completion

---

## 🧪 VERIFICATION STEPS

### **Check 1: Verify in Deployment Logs**

**For Vercel:**
1. Go to **Deployments** → Latest Deploy → **Logs**
2. Look for: `[Chat API] GROQ_API_KEY present: true` ✅
3. Or: `[Chat API] Using Groq AI for responses ✅`

**For Netlify:**
1. Go to **Deploys** → Latest → **Deploy log**
2. Look for the Chat API initialization message

**For AWS:**
1. Go to **Deployments** → Latest
2. Check build logs

### **Check 2: Test the API Directly**

```bash
# Replace with your production URL
curl -X POST https://your-site.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"what is the best time to plant trees?"}' | jq .
```

Expected response should be a long, detailed AI answer, NOT a short static response.

### **Check 3: Browser Testing**

1. Visit your production website
2. Scroll to bottom and open chatbot
3. Ask: **"What plant should I buy for my garden?"**
4. ✅ Should get intelligent, varied response
5. ❌ NOT the pre-written fallback text

---

## 🔍 TROUBLESHOOTING

### Issue: Still showing static responses after adding the key

**Solution 1: Clear cache**
- Hard refresh: `Ctrl+Shift+Delete` (Windows/Linux) or `Cmd+Shift+Delete` (Mac)
- Or use incognito/private window

**Solution 2: Verify deployment completed**
- Check deployment status is ✅ Green/Success
- Wait 5 minutes after deployment completes
- Some CDNs take time to propagate

**Solution 3: Verify the key is correct**
- Check `.env.local` file for the key value
- Make sure you copied the EXACT value (including `gsk_` prefix)
- No extra spaces or characters

**Solution 4: Check API key is still valid**
1. Go to https://console.groq.com
2. Sign in to your Groq account
3. Go to **API Keys**
4. Check if the key is still there and active
5. If expired/deleted, create a new key and update it

### Issue: Getting "API Error" in chatbot

**Possible Causes:**
1. API key is invalid/expired
2. API key was deleted from Groq console
3. Groq API is temporarily down
4. Rate limit exceeded

**Solution:**
1. Check if key exists: https://console.groq.com/keys
2. If deleted, create a new key and update in production
3. Check Groq status: https://status.groq.com

### Issue: Redeploy seems stuck

**Solution:**
- Cancel the current deployment
- Wait 5 minutes
- Trigger a new deployment or push a new commit

---

## 📋 CHECKLIST BEFORE SUBMITTING

- [ ] Environment variable `GROQ_API_KEY` added to production
- [ ] Value is: `your_key_here`
- [ ] Deployment has completed successfully (✅ green status)
- [ ] At least 2-3 minutes have passed since deployment
- [ ] Browser cache cleared
- [ ] Tested chatbot in production
- [ ] Getting dynamic AI responses (not static fallback text)
- [ ] Checked deployment logs for: `GROQ_API_KEY present: true`

---

## 📊 TESTING SCRIPT

You can create a quick test to verify the API is working:

**Create `test_production.sh`:**
```bash
#!/bin/bash

PROD_URL="https://your-production-url.vercel.app"

echo "Testing production chatbot API..."
echo ""
echo "Test 1: Summer planting question"
curl -X POST $PROD_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"what plants are good for summer?"}' | jq .

echo ""
echo "Test 2: Plant care question"
curl -X POST $PROD_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"how do I care for roses?"}' | jq .
```

Run with:
```bash
chmod +x test_production.sh
./test_production.sh
```

---

## 🎯 WHAT SHOULD HAPPEN

### **Before Fix (Current):**
```
User: "What plant is good for summer?"
Chatbot: "Summer is a great season for planting! Heat-tolerant plants like mango, lemon, and some ornamental varieties thrive. We can recommend specific plants for your location and climate."
```
❌ This is static fallback text

### **After Fix (Expected):**
```
User: "What plant is good for summer?"
Chatbot: "For summer planting in Bhutan, I'd recommend heat-tolerant varieties like mango, lemon, and orange trees. These thrive in the warm season. Additionally, ornamental plants like bougainvillea and some grass varieties do well. The exact choice depends on your specific location's altitude and microclimate. Would you like specific recommendations for your area?"
```
✅ This is dynamic AI-generated response

---

## 🛑 IMPORTANT NOTES

1. **No code changes needed** - The route.ts is already correctly configured
2. **Only environment variable needed** - Just add the key to production dashboard
3. **API key is safe** - Won't be exposed because it's only stored on hosting platform
4. **Works automatically** - Once deployed, chatbot will use AI immediately
5. **No additional costs** - Groq free tier includes many requests per month

---

## ❓ QUICK REFERENCE

| What | Where | How |
|-----|-------|-----|
| Add API Key | Hosting dashboard | Settings → Environment Variables |
| API Key Value | `.env.local` file | Copy entire `GROQ_API_KEY=...` value |
| Redeploy | Platform dashboard | Push to Git or click "Redeploy" button |
| Verify | Browser + deployment logs | Test chatbot & check logs |
| Fallback Purpose | When API unavailable | For graceful degradation |

---

## 📞 STILL NOT WORKING?

1. **Check deployment logs** - Most issues are visible there
2. **Verify API key format** - Should start with `gsk_`
3. **Wait longer** - CDN caching can take 5-10 minutes
4. **Try different question** - Some questions might match fallback text
5. **Check Groq API status** - https://status.groq.com
6. **Clear all caches** - Browser, CDN, local storage

---

**Next Steps:**
1. Identify your hosting platform (Vercel/Netlify/AWS/Other)
2. Follow the appropriate section above
3. Add the GROQ_API_KEY environment variable
4. Redeploy
5. Test and verify

**Timeline:** 5-10 minutes from start to testing ✅

