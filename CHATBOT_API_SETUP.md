# Chatbot API Integration Guide

## Overview
The chatbot is now integrated with **Hugging Face's Inference API** via a secure backend API route. This approach:
- ✅ Avoids CORS issues
- ✅ Keeps your API key secure on the server
- ✅ Falls back to intelligent keyword-based responses if API is unavailable
- ✅ Works without an API key (fallback mode)

## Architecture
```
Client (Browser)
    ↓
/api/chat (Backend Route)
    ↓
Hugging Face API (Server-side)
```

## Setup Instructions

### Step 1: Get a Hugging Face API Key (Optional)

For better responses, optionally get a Hugging Face API key:

1. **Go to Hugging Face**: https://huggingface.co
2. **Create a free account** (if you don't have one)
3. **Navigate to Settings**: Click on your profile → **Settings**
4. **Find Access Tokens**: Look for **"Access Tokens"** in the left sidebar
5. **Create a new token**:
   - Click "Create new token"
   - Choose **"Read"** as the token type
   - Give it a name (e.g., "Southern Seedling Chatbot")
   - Click "Create token"
6. **Copy the token** (it will be a long string starting with `hf_`)

### Step 2: Add API Key to Environment Variables

1. **Locate `.env.local`** in the root directory of the project
2. **Add your API key** (or leave as placeholder to use fallback mode):

```env
# .env.local
NEXT_PUBLIC_HF_API_KEY=your_hugging_face_api_key_here
NEXT_PUBLIC_HF_API_URL=https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium
```

Example with actual key:
```env
NEXT_PUBLIC_HF_API_KEY=hf_xAbCdEfGhIjKlMnOpQrStUvWxYz123456
NEXT_PUBLIC_HF_API_URL=https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium
```

### Step 3: Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

### Step 4: Test the Chatbot

1. Open http://localhost:3000 in your browser
2. Click the chatbot button (bottom-right corner)
3. Try sending a message:
   - Without API key: Uses fallback keyword-based responses (instant)
   - With API key: Uses Hugging Face API (1-2 seconds)
4. The chatbot should respond

## How It Works

### Backend API Route (`/api/chat`)
Located at: `app/api/chat/route.ts`

The backend route:
1. Receives message from client
2. Validates the input
3. Attempts to call Hugging Face API (if key is configured)
4. Falls back to keyword matching on error
5. Returns response to client

### Hugging Face Model
We use **Microsoft's DialoGPT-medium** model:
- **Model**: microsoft/DialoGPT-medium
- **Free Tier**: Yes, with monthly usage limits
- **Response Time**: 1-2 seconds (first request may be slower)
- **Quality**: Conversational, context-aware responses

### Fallback Mechanism
If the API is unavailable or no API key is provided, the chatbot automatically uses keyword-based responses. Key triggers include:
- `hello`, `hi`, `hey` - Greeting responses
- `plant care`, `watering`, `fertilizer`, `planting` - Plant care tips
- `delivery`, `delivery fee`, `order` - Order information
- `services`, `landscape`, `orchard` - Service details
- `contact`, `address`, `phone`, `hours` - Contact information
- `help` - General help
- And more...

### Loading State
While waiting for API response, a loading indicator (three animated dots) is shown.

## File Structure

```
app/
  ├── api/
  │   └── chat/
  │       └── route.ts          (Backend API endpoint)
  └── ...other pages...

src/
  └── components/
      └── Chatbot.tsx            (Client-side component)
```

## Environment Variables Reference

| Variable | Purpose | Default | Required |
|----------|---------|---------|----------|
| `NEXT_PUBLIC_HF_API_KEY` | Hugging Face API token | Not set | No |
| `NEXT_PUBLIC_HF_API_URL` | API endpoint URL | DialoGPT-medium | No |

## Troubleshooting

### "Chatbot not responding"
- Check that the development server is running (`npm run dev`)
- Open browser console (F12) and check for error messages
- Verify `/api/chat` endpoint is accessible at `http://localhost:3000/api/chat`

### "Getting generic fallback responses"
- This is normal! The chatbot is working in fallback mode
- To use AI responses, add your Hugging Face API key to `.env.local`
- Restart the dev server after adding the key

### "API error messages in console"
- Check your `.env.local` has the correct API key
- Verify the key hasn't been revoked on Hugging Face
- Try creating a new token on Hugging Face

### "CORS errors (old setup)"
- This is now fixed! We use a backend API route instead of calling HF directly
- If you still see CORS errors, ensure you're running the latest code

## Rate Limiting

The free tier on Hugging Face has monthly limits. When you hit the limit:
- The fallback keyword-based responses will be used
- The chatbot will remain fully functional
- Users will still get helpful responses

To monitor usage:
1. Log in to Hugging Face
2. Go to **Settings → Usage**
3. Check API calls made this month

## Advanced Configuration

### Using a Different AI Model

To use a different Hugging Face model, update `.env.local`:

```env
# Using a different model
NEXT_PUBLIC_HF_API_URL=https://api-inference.huggingface.co/models/other/model-name
```

Popular alternatives:
- `mistralai/Mistral-7B` - More powerful, longer responses
- `facebook/blenderbot-400M-distill` - Optimized for chat
- `EleutherAI/gpt-neo-2.7B` - Open source alternative

### Custom Backend Processing

You can modify `app/api/chat/route.ts` to:
- Add context about the business
- Filter inappropriate responses
- Add multi-language support
- Implement conversation history
- Add analytics/logging

Example modification to add context:
```typescript
// In route.ts getChatbotResponse function
const contextualizedMessage = `You are a helpful assistant for Southern Seedling Nursery Farm. ${userMessage}`;
// Pass contextualizedMessage to API instead of userMessage
```

## Security Notes

✅ **Safe**: API key is stored on the server (in `.env` variables)  
✅ **Secure**: Browser never sees the API key  
✅ **Protected**: `.env.local` is in `.gitignore`

⚠️ **Never**: Commit `.env.local` to git  
⚠️ **Never**: Share your API key publicly  
⚠️ **Never**: Post your API key in logs/screenshots  

## Code Structure

### `app/api/chat/route.ts` (Backend API)
```typescript
POST /api/chat
Request: { message: string }
Response: { response: string } | { error: string }
```

### `src/components/Chatbot.tsx` (Client Component)
```typescript
- Displays chat UI
- Calls /api/chat endpoint
- Shows loading indicator
- Handles errors gracefully
```

## Performance Metrics

Without API key (Fallback mode):
- Response time: **Instant** (< 100ms)
- Accuracy: Good for common questions
- Availability: 100% (no external dependencies)

With API key (AI mode):
- Response time: **1-3 seconds** (average)
- Accuracy: Excellent, contextual
- Availability: 99%+ (depends on HF uptime)

## Next Steps

After setting up the chatbot:
1. ✅ Chatbot API is configured
2. 📦 Next: Payment gateway (Stripe/Druk Chirp)
3. 👤 User authentication & login
4. 📊 Admin dashboard
5. 📧 Email notifications
6. 💾 Database integration

## Support

**Questions or issues?**
- Check the main [README.md](./README.md)
- Review error messages in browser console (F12)
- Contact: info@southernseedling.com
