#!/bin/bash

# Diagnostic Script for Chatbot API Issues
# This script helps identify why the chatbot is returning static responses

echo "🔍 Chatbot API Diagnostic Tool"
echo "======================================"
echo ""

# Check 1: Local environment variable
echo "✅ Check 1: Local Environment Variable"
echo "--------------------------------------"
if [ -z "$GROQ_API_KEY" ]; then
    echo "❌ GROQ_API_KEY is NOT set in local environment"
    echo "   This is OK for testing (fallback will be used)"
else
    echo "✅ GROQ_API_KEY is set (first 10 chars): ${GROQ_API_KEY:0:10}..."
fi
echo ""

# Check 2: .env.local file exists
echo "✅ Check 2: .env.local File"
echo "--------------------------------------"
if [ -f ".env.local" ]; then
    echo "✅ .env.local file exists"
    if grep -q "GROQ_API_KEY=" ".env.local"; then
        echo "✅ GROQ_API_KEY is defined in .env.local"
        KEY_VALUE=$(grep "GROQ_API_KEY=" ".env.local" | cut -d '=' -f2)
        echo "   Value (first 10 chars): ${KEY_VALUE:0:10}..."
    else
        echo "❌ GROQ_API_KEY is NOT defined in .env.local"
    fi
else
    echo "❌ .env.local file does NOT exist"
    echo "   Create it with: cp .env.example .env.local"
fi
echo ""

# Check 3: .gitignore protection
echo "✅ Check 3: Git Ignore Protection"
echo "--------------------------------------"
if grep -q "\.env" ".gitignore"; then
    echo "✅ .env files are in .gitignore (safe, won't be committed)"
else
    echo "⚠️  .env files might NOT be in .gitignore"
    echo "   Add this to .gitignore:"
    echo "   .env*"
fi
echo ""

# Check 4: Node development server check
echo "✅ Check 4: Development Server Status"
echo "--------------------------------------"
if curl -s http://localhost:3000/api/chat -X POST -H "Content-Type: application/json" -d '{"message":"test"}' > /dev/null 2>&1; then
    echo "✅ Development server is running on http://localhost:3000"
    echo "   Testing chatbot endpoint..."
    RESPONSE=$(curl -s http://localhost:3000/api/chat \
      -X POST \
      -H "Content-Type: application/json" \
      -d '{"message":"hello"}')
    echo "   Response: $RESPONSE"
else
    echo "❌ Development server is NOT running"
    echo "   Start with: npm run dev"
fi
echo ""

# Check 5: Package dependencies
echo "✅ Check 5: Dependencies Check"
echo "--------------------------------------"
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
    if grep -q "next" package.json; then
        echo "✅ Next.js is installed"
    else
        echo "❌ Next.js is NOT in package.json"
    fi
    echo "   Run: npm install"
else
    echo "❌ package.json not found"
fi
echo ""

# Check 6: API Route File
echo "✅ Check 6: API Route File"
echo "--------------------------------------"
if [ -f "app/api/chat/route.ts" ]; then
    echo "✅ API route file exists at: app/api/chat/route.ts"
    if grep -q "GROQ_API_KEY" "app/api/chat/route.ts"; then
        echo "✅ GROQ_API_KEY is referenced in route.ts"
    else
        echo "❌ GROQ_API_KEY is NOT referenced in route.ts"
    fi
    if grep -q "fallbackResponses" "app/api/chat/route.ts"; then
        echo "✅ Fallback responses are implemented (used when API unavailable)"
    fi
else
    echo "❌ API route file NOT found"
fi
echo ""

# Summary
echo "======================================"
echo "📋 SUMMARY"
echo "======================================"
echo ""
echo "Local Development (localhost:3000):"
echo "  - Uses .env.local file"
echo "  - Chatbot should work with GROQ_API_KEY"
echo ""
echo "Production Deployment:"
echo "  - .env.local is NOT deployed (in .gitignore)"
echo "  - Must set GROQ_API_KEY in hosting platform:"
echo "    • Vercel: Settings → Environment Variables"
echo "    • Netlify: Build & Deploy → Environment"
echo "    • AWS: App Settings → Environment Variables"
echo ""
echo "Without production env var:"
echo "  - Chatbot returns static fallback responses"
echo "  - No AI integration"
echo ""
echo "✅ Solution:"
echo "  1. Add GROQ_API_KEY to your production platform"
echo "  2. Redeploy the website"
echo "  3. Test the chatbot"
echo ""
echo "See PRODUCTION_ENV_SETUP.md for detailed instructions"
echo ""
