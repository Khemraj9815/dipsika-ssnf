# Production Environment Variables Setup Guide

## 🔴 Problem: Chatbot Works on Localhost but Not in Production

The chatbot returns only static fallback responses in production because the `GROQ_API_KEY` environment variable is missing from your production deployment.

### Why This Happens:
- `.env.local` is a **local-only file** (your computer only)
- It's in `.gitignore` (not committed to Git)
- Production deployment pulls from Git, not your local machine
- Without the environment variable, the code falls back to static responses

---

## ✅ Solution: Add Environment Variables to Your Hosting Platform

### **For Vercel (Recommended):**

#### Step 1: Access Environment Variables
1. Go to https://vercel.com
2. Select your project
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)

#### Step 2: Add the GROQ_API_KEY
Click **"Add New"** and fill in:

```
Name:        GROQ_API_KEY
Value:       your_key_here
Environment: Select "Production" or "All"
```

Click **"Save"**

#### Step 3: Redeploy
Option A - Automatic:
- Push a new commit to your main branch
- Vercel will automatically redeploy

Option B - Manual:
- Go to **Deployments** tab
- Find the latest deployment
- Click the **3 dots menu** → **Redeploy**

#### Step 4: Test
Wait for deployment to complete (2-3 minutes), then:
- Visit your production website
- Open the chatbot
- Ask: "what plant is good to plant in summer?"
- Should get a full AI response ✅

---

### **For Netlify:**

#### Step 1: Access Build & Deploy Settings
1. Go to https://netlify.com
2. Select your site
3. Click **Site settings** (top menu)
4. Click **Build & Deploy** (left sidebar)
5. Click **Environment** section

#### Step 2: Add the Variable
Click **"Edit variables"** and add:

```
Variable name:  GROQ_API_KEY
Value:          your_key_here
```

Click **"Save"**

#### Step 3: Trigger Deploy
- Go to **Deployments** tab
- Scroll to latest deployment
- Click **"Trigger deploy"** → **"Deploy site"**

#### Step 4: Test
Wait for deployment and test the chatbot.

---

### **For AWS Amplify:**

#### Step 1: Go to App Settings
1. Open AWS Amplify Console
2. Select your app
3. Go to **App Settings** → **Environment Variables**

#### Step 2: Add Variable
Click **"Manage variables"**

```
Name:  GROQ_API_KEY
Value: your_key_here
```

Save changes.

#### Step 3: Redeploy
- Click **"Deployments"**
- Find latest build
- Click **"Redeploy this version"**

---

## 🔒 Security Best Practices

### Current Setup is Safe Because:
✅ `.env.local` is in `.gitignore` (not in Git)
✅ API key is NOT exposed in public repositories
✅ Production deployment only reads from environment variables (not from Git)

### Additional Security (Optional):
1. **Rotate the API Key:**
   - Go to https://console.groq.com/keys
   - Delete old key
   - Create a new key
   - Update in production environment

2. **Monitor API Usage:**
   - Check Groq console for unusual activity
   - Monitor token usage

3. **Rate Limiting (Future):**
   - Implement rate limiting on `/api/chat` endpoint
   - Prevent abuse/spam

---

## 🧪 Testing the Fix

### Local Testing (Already Working):
```bash
npm run dev
# Visit http://localhost:3000
# Open chatbot and test ✅
```

### Production Testing:
1. Wait for deployment to complete
2. Visit your production URL (e.g., southernseedling.vercel.app)
3. Open the chatbot widget
4. Ask: **"what should I plant in summer?"**

**Expected Response:**
- ✅ Full AI-generated answer about summer planting
- ❌ NOT the static fallback response

### Verify with Terminal (Optional):
```bash
curl -X POST https://your-production-url/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"what plant is good to plant in summer"}' | jq .
```

Should return dynamic response from Groq API.

---

## 🐛 Debugging Checklist

If chatbot still returns static responses after setup:

- [ ] Environment variable added to production dashboard?
- [ ] Correct variable name: `GROQ_API_KEY` (case-sensitive)?
- [ ] Correct variable value: `gsk_...` (full key)?
- [ ] Redeploy completed successfully?
- [ ] Waiting enough time for deployment (2-5 min)?
- [ ] Cleared browser cache (Ctrl+Shift+Delete)?
- [ ] Check deployment logs for errors?

### Check Deployment Logs:
**Vercel:**
1. Go to project → **Deployments**
2. Click latest deployment
3. Click **"Logs"** tab
4. Look for `[Chat API] GROQ_API_KEY present: true`

**Netlify:**
1. Go to site → **Deploys**
2. Click latest deploy
3. Click **"Deploy log"**

---

## 📞 Support

If the chatbot still isn't working:

1. **Check the logs** (as above)
2. **Verify API key is valid:**
   - Go to https://console.groq.com
   - Check if key is still active
   
3. **Test API directly:**
   ```bash
   curl -X POST https://api.groq.com/openai/v1/chat/completions \
     -H "Authorization: Bearer YOUR_KEY" \
     -H "Content-Type: application/json" \
     -d '{"model":"mixtral-8x7b-32768","messages":[{"role":"user","content":"hi"}]}'
   ```

4. **Contact support:**
   - Groq: https://console.groq.com (support tab)
   - Vercel: https://vercel.com/support
   - Your hosting provider's support

---

## ✨ What Happens Next

Once deployed with environment variables:

1. ✅ Production chatbot will use Groq AI
2. ✅ Provides intelligent, dynamic responses
3. ✅ Not limited to 40+ keyword matches
4. ✅ Better user experience
5. ✅ Professional chatbot functionality

**No code changes needed!** The route.ts already handles everything.

---

## Quick Reference

| Platform | Variable Name | Where to Add | Redeploy Command |
|----------|--------------|-------------|-----------------|
| **Vercel** | `GROQ_API_KEY` | Settings → Environment Variables | Push commit or click "Redeploy" |
| **Netlify** | `GROQ_API_KEY` | Build & Deploy → Environment | Click "Trigger deploy" |
| **AWS Amplify** | `GROQ_API_KEY` | App Settings → Environment Variables | Click "Redeploy this version" |
| **Local** | `.env.local` | `.env.local` file | `npm run dev` |

---

*Document created: May 19, 2026*
