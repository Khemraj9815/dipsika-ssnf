# ⚡ QUICK FIX - Chatbot Not Working in Production

## 🎯 The Problem
Chatbot returns **static fallback text** in production instead of **AI responses**

## 🔍 Why It Happens
- ✅ Works on localhost (has `.env.local` file)
- ❌ Doesn't work in production (`.env.local` not deployed)
- Result: `GROQ_API_KEY` is `undefined` in production

## ✅ The Solution (5 Minutes)

### **For Vercel:**
```
1. Go to: vercel.com → Select your project
2. Click: Settings → Environment Variables
3. Add: Name = GROQ_API_KEY
         Value = your_key_here
4. Push code: git add . && git commit -m "fix" && git push
5. Wait: 2-3 minutes for redeploy
6. Test: Open chatbot, ask any question
```

### **For Netlify:**
```
1. Go to: netlify.com → Select your site
2. Click: Site settings → Build & deploy → Environment
3. Click: Edit variables
4. Add: GROQ_API_KEY = your_key_here
5. Push code: git add . && git commit -m "fix" && git push
6. Wait: Netlify auto-deploys on push
7. Test: Chatbot should work
```

### **For AWS Amplify:**
```
1. Go to: AWS Amplify Console → Your App
2. Click: App settings → Environment variables
3. Click: Manage variables
4. Add: GROQ_API_KEY = your_key_here
5. Click: Redeploy this version
6. Wait: Deployment completes
7. Test: Chatbot works
```

## 🧪 How to Test

**In browser:**
- Open your production website
- Scroll down and open chatbot
- Ask: "What plant should I grow?"
- ✅ Should get detailed AI answer
- ❌ NOT short pre-written text

**In terminal:**
```bash
curl -X POST https://your-site.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"hello"}'
```

## ✨ What Changes

| Before | After |
|--------|-------|
| "Summer is a great season... (static)" | "For summer planting in Bhutan, based on your location... (AI generated)" |
| Same response every time | Different responses |
| Limited to 40 keywords | Any question answered |

## 🔑 Key Points
- ✅ No code changes needed
- ✅ Only add environment variable
- ✅ API key is safe (not exposed)
- ✅ Automatic once deployed
- ✅ Takes ~5 minutes total

## 📚 See Also
- `PRODUCTION_ENV_SETUP.md` - Detailed setup guide
- `CHATBOT_PRODUCTION_FIX.md` - Comprehensive troubleshooting
- `GROQ_SETUP.md` - About Groq API

