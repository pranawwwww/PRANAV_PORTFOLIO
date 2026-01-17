# Deployment Guide: Frontend + Backend Split

## What Was Changed

### ✅ Frontend (`contexts/ChatContext.tsx`)
- **Removed**: Direct Gemini API calls and `@google/genai` dependency
- **Added**: API proxy calls to `/api/chat` endpoint
- **Kept**: All UI logic, rate limiting, session storage

### ✅ Backend (`api/chat.ts`)
- **Created**: Serverless function to proxy Gemini API calls
- **Features**: Rate limiting, error handling, conversation history
- **Security**: API key stays on server, never exposed to client

### ✅ Portfolio Data (`api/portfolio-data.ts`)
- **Created**: Centralized portfolio context for AI
- **Includes**: All projects, experience, skills, FAQs
- **Used by**: Backend API to build system instruction

---

## Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

#### Prerequisites
- Vercel account (free)
- GitHub repo (optional but recommended)
- New Gemini API key from https://aistudio.google.com/apikey

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Install Dependencies
```bash
cd C:\Users\thiru\OneDrive\Desktop\portfolio\PRANAV_PORTFOLIO
npm install @vercel/node @google/generative-ai
```

#### Step 3: Test Locally
```bash
# Start Vercel dev server (runs both frontend + API)
vercel dev

# Open browser to http://localhost:3000
# Test the chatbot - it should use the local /api/chat endpoint
```

#### Step 4: Deploy to Production
```bash
# First deployment (will prompt for project setup)
vercel

# For production deployment
vercel --prod
```

#### Step 5: Add Environment Variable in Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your new Gemini API key
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**

#### Step 6: Redeploy to Apply Environment Variable
```bash
vercel --prod
```

#### Step 7: Verify
- Visit your Vercel URL (e.g., `https://your-portfolio.vercel.app`)
- Open the chatbot
- Send a test message
- Check browser DevTools → Network tab:
  - Should see POST request to `/api/chat`
  - Should NOT see any Gemini API calls directly

---

### Option 2: Deploy Frontend + Separate Backend

If you prefer a traditional server instead of serverless:

#### Backend Setup (Node.js + Express)

1. **Create backend directory:**
```bash
mkdir backend
cd backend
npm init -y
npm install express @google/generative-ai cors dotenv
```

2. **Create `backend/server.js`:**
```javascript
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// Import portfolio data
const { SYSTEM_INSTRUCTION } = require('../api/portfolio-data');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const formattedHistory = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);

    res.json({
      response: result.response.text(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Chat service error',
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
```

3. **Create `backend/.env`:**
```bash
GEMINI_API_KEY=your_gemini_key_here
FRONTEND_URL=http://localhost:5173
```

4. **Deploy backend to Railway/Render:**
- **Railway**: https://railway.app (free tier)
- **Render**: https://render.com (free tier)
- **Fly.io**: https://fly.io (free tier)

5. **Update frontend `.env`:**
```bash
VITE_API_URL=https://your-backend.railway.app/api/chat
```

6. **Deploy frontend to Vercel/Netlify:**
```bash
vercel --prod
```

---

## Environment Variables Reference

### Frontend (.env)
```bash
# Optional: Backend API URL (defaults to /api/chat for Vercel)
VITE_API_URL=https://your-backend-url.com/api/chat

# No longer needed (remove from frontend):
# VITE_GEMINI_API_KEY=xxx
```

### Backend (.env or Vercel Dashboard)
```bash
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional for CORS (if using separate backend)
FRONTEND_URL=https://your-portfolio.vercel.app
```

---

## Testing Checklist

### Local Development
- [ ] `vercel dev` runs without errors
- [ ] Frontend loads at http://localhost:3000
- [ ] Chatbot opens when clicked
- [ ] Messages send successfully
- [ ] AI responses appear correctly
- [ ] No CORS errors in console
- [ ] No exposed API keys in Network tab

### Production
- [ ] Site deploys successfully
- [ ] Chatbot works on deployed site
- [ ] API endpoint `/api/chat` returns 200
- [ ] Conversation history maintained across messages
- [ ] Rate limiting works (30 messages per session)
- [ ] Error messages display correctly
- [ ] No API key visible in browser DevTools

---

## Troubleshooting

### Issue: "API key not configured"
**Solution**: Add `GEMINI_API_KEY` to Vercel environment variables

### Issue: "CORS error"
**Solution**:
- Check `vercel.json` has correct CORS headers
- If using separate backend, add frontend URL to CORS whitelist

### Issue: "404 Not Found" for `/api/chat`
**Solution**:
- Verify `api/chat.ts` exists in project root
- Check `vercel.json` has correct rewrites
- Redeploy: `vercel --prod`

### Issue: Chatbot not responding
**Solution**:
- Open DevTools → Network tab
- Check if `/api/chat` request returns 200 or error
- Look at response body for error message
- Check Vercel Function Logs in dashboard

### Issue: "Rate limit exceeded" immediately
**Solution**:
- Clear browser sessionStorage: `sessionStorage.clear()`
- Clear localStorage: `localStorage.clear()`
- Refresh page

---

## Cost Estimation

### Vercel (Free Tier)
- 100GB bandwidth
- 100,000 serverless function invocations
- Unlimited static hosting
- **Cost**: $0/month for typical portfolio traffic

### Gemini API (Pay-as-you-go)
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens
- **Estimated**: ~$0.34/month for 1,000 conversations
- **Free tier**: $0 for first few thousand requests

### Total Monthly Cost
- **Development**: $0
- **Production (low traffic)**: $0.34/month
- **Production (1000 users)**: ~$5/month

---

## Monitoring

### Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project
3. Click **Functions** tab
4. View:
   - Invocations count
   - Error rate
   - Response times
   - Logs (click on individual function calls)

### Gemini API Usage
1. Go to https://aistudio.google.com/app/apikey
2. Click on your API key
3. View **Usage** tab for:
   - Daily request count
   - Token usage
   - Costs

---

## Security Best Practices

✅ **DO:**
- Keep `GEMINI_API_KEY` in Vercel environment variables
- Use `.gitignore` to exclude `.env` files
- Implement rate limiting on both frontend and backend
- Monitor API usage regularly
- Rotate API keys periodically

❌ **DON'T:**
- Commit `.env` files to git
- Use `VITE_` prefix for API keys (exposes them to browser)
- Share API keys in code or messages
- Skip rate limiting (prevents abuse)
- Deploy without testing locally first

---

## Next Steps

1. **Now**: Deploy to Vercel and verify chatbot works
2. **Week 1**: Monitor usage and costs
3. **Week 2**: Add analytics (optional)
4. **Month 1**: Consider adding:
   - Persistent chat history (database)
   - Admin dashboard for content updates
   - More sophisticated rate limiting (Redis)
   - A/B testing different AI prompts

---

## Support

If you encounter issues:
1. Check Vercel Function Logs (Dashboard → Functions → Logs)
2. Check browser console for errors
3. Verify environment variables are set correctly
4. Test API endpoint directly: `curl https://your-site.vercel.app/api/chat -X POST -H "Content-Type: application/json" -d '{"message":"test"}'`

Good luck with deployment! 🚀
