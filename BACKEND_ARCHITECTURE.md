# Backend Architecture Plan for Portfolio Chatbot

## Architecture Overview

**Goal:** Split into serverless backend + React frontend to secure API keys while maintaining speed with Gemini 2.0 Flash and full portfolio context.

---

## Architecture Choice: Vercel Serverless Functions

### Why Vercel?
1. **Zero config** - Works with existing Vite setup
2. **Free tier** - 100GB bandwidth, 100k function invocations/month
3. **Edge runtime** - Sub-100ms response times globally
4. **Git-based deployment** - Push to deploy
5. **Built-in environment variables** - Secure secret management

---

## Project Structure

```
PRANAV_PORTFOLIO/
├── api/                           # NEW: Serverless functions
│   ├── chat.ts                    # AI chat endpoint
│   ├── portfolio-context.ts       # Portfolio data API
│   └── contact.ts                 # Contact form handler
│
├── frontend/                      # REFACTORED: Move existing code here
│   ├── src/
│   ├── pages/
│   ├── components/
│   ├── contexts/
│   ├── data/                      # Keep static data for now
│   └── vite.config.ts
│
├── shared/                        # NEW: Shared types and utilities
│   ├── types.ts                   # TypeScript interfaces
│   └── portfolio-data.ts          # Centralized data (for backend context)
│
├── vercel.json                    # NEW: Vercel configuration
├── package.json                   # Updated with backend dependencies
└── .env                           # Secrets (gitignored)
```

---

## API Endpoints

### 1. `POST /api/chat`
**Purpose:** Proxy to Gemini API with embedded portfolio context

**Request:**
```typescript
{
  message: string;
  conversationHistory?: Array<{role: 'user' | 'assistant', content: string}>;
}
```

**Response:**
```typescript
{
  response: string;
  conversationId?: string;
}
```

**Implementation Strategy:**
- Embed full portfolio context in system instruction
- Use Gemini 2.0 Flash (gemini-2.0-flash-exp) for speed
- Include conversation history for context continuity
- Rate limiting: 30 messages/session, enforced server-side
- Response streaming optional (for better UX)

**Context Embedding:**
```typescript
const systemInstruction = `
You are Grogu, an enthusiastic AI assistant for Pranav Kutralingam's portfolio.

PORTFOLIO CONTEXT:
${JSON.stringify({
  personal: siteData,
  projects: projectsData,
  experience: experienceData,
  skills: skillsData,
  faqs: faqData
}, null, 2)}

Guidelines:
- Answer questions about Pranav's background, projects, and experience
- Be friendly and conversational
- If unsure, direct users to contact Pranav directly
- Highlight relevant projects when discussing technical skills
`;
```

---

### 2. `GET /api/portfolio-context`
**Purpose:** Serve portfolio data as JSON API (optional optimization)

**Response:**
```typescript
{
  siteData: {...},
  projects: [...],
  experience: [...],
  skills: [...],
  faqs: [...]
}
```

**Why?**
- Reduces frontend bundle size
- Allows dynamic content updates without redeployment
- Enables future CMS integration

---

### 3. `POST /api/contact`
**Purpose:** Replace EmailJS with server-side email sending

**Request:**
```typescript
{
  name: string;
  email: string;
  message: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

**Implementation:**
- Use Nodemailer or Resend API
- Server-side spam protection (honeypot + rate limiting)
- Send notification to `thirupranav99@gmail.com`

---

## Frontend Changes

### Updated `ChatContext.tsx`

**Before (Direct Gemini Call):**
```typescript
const chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: { systemInstruction: portfolioContext }
});
const result = await chat.sendMessage(message);
```

**After (API Proxy):**
```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: userMessage,
    conversationHistory: messages.map(msg => ({
      role: msg.author === 'user' ? 'user' : 'assistant',
      content: msg.text
    }))
  })
});

const { response: aiResponse } = await response.json();
```

**Benefits:**
- No exposed API keys
- Server-side rate limiting
- Conversation history management
- Future: Persistent storage, analytics

---

## Environment Variables

### `.env` (Local Development)
```bash
# Gemini API
GEMINI_API_KEY=your_gemini_key_here

# Email (Resend or Nodemailer)
RESEND_API_KEY=your_resend_key_here

# Optional: Database
DATABASE_URL=postgresql://...
```

### Vercel Dashboard (Production)
- Add all env vars in Vercel project settings
- Automatically injected at build/runtime

---

## Deployment Strategy

### Step 1: Initial Setup
1. Install Vercel CLI: `npm i -g vercel`
2. Link project: `vercel link`
3. Add environment variables: `vercel env add GEMINI_API_KEY`

### Step 2: Migrate Code
1. Create `/api` folder with serverless functions
2. Refactor `ChatContext.tsx` to call `/api/chat`
3. Update `.gitignore` to exclude `.env`

### Step 3: Deploy
```bash
vercel --prod
```

### Step 4: GitHub Integration (Optional)
- Connect Vercel to GitHub repo
- Auto-deploy on push to `main`
- Preview deployments for PRs

---

## Gemini 2.0 Flash Optimization

### Why Flash?
- **Speed:** ~200-500ms response time
- **Cost:** $0.075 per 1M input tokens (10x cheaper than Pro)
- **Context:** 1M token context window (plenty for portfolio data)
- **Quality:** Sufficient for Q&A with embedded context

### Context Size Estimation
```
Portfolio JSON: ~2,000 tokens
User question: ~50 tokens
Conversation history (10 messages): ~500 tokens
-------------------------------------------------
Total per request: ~2,550 tokens
```

**Monthly Cost (1,000 conversations):**
- Input: 2.55M tokens × $0.075/1M = ~$0.19
- Output: 500K tokens × $0.30/1M = ~$0.15
- **Total:** ~$0.34/month 🎉

### Performance Tips
1. **Streaming responses** (optional):
   ```typescript
   const stream = await chat.sendMessageStream(message);
   for await (const chunk of stream) {
     // Send SSE to frontend
   }
   ```

2. **Caching system instruction** (future):
   - Gemini supports prompt caching
   - Reduces input token costs by 90%

---

## Migration Checklist

### Phase 1: Backend Setup
- [ ] Create `/api/chat.ts` serverless function
- [ ] Test locally with `vercel dev`
- [ ] Add Gemini API key to Vercel env vars
- [ ] Deploy to Vercel and verify endpoint

### Phase 2: Frontend Refactor
- [ ] Update `ChatContext.tsx` to call `/api/chat`
- [ ] Remove `VITE_GEMINI_API_KEY` from frontend
- [ ] Test chatbot with backend proxy
- [ ] Update rate limiting to trust server response

### Phase 3: Cleanup
- [ ] Remove `.env` from git history (if committed)
- [ ] Delete old Gemini API keys from Google AI Studio
- [ ] Update GitHub Actions workflow (if needed)
- [ ] Add backend URL to Vite config for local dev

### Phase 4: Enhancements (Optional)
- [ ] Implement `/api/contact` to replace EmailJS
- [ ] Add analytics logging (chat metrics)
- [ ] Create admin dashboard for content updates
- [ ] Implement persistent chat history (database)

---

## Alternative: Standalone Express Server

If you prefer traditional backend instead of serverless:

### Pros
- More control over infrastructure
- Easier to add database/Redis
- Better for complex backend logic

### Cons
- Requires hosting (Railway, Render, DigitalOcean)
- More maintenance overhead
- ~$5-10/month minimum cost

### Setup
```bash
# New backend/ folder
npm init -y
npm install express @google/generative-ai cors dotenv

# Create server.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.post('/api/chat', async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    systemInstruction: portfolioContext
  });

  const result = await model.generateContent(req.body.message);
  res.json({ response: result.response.text() });
});

app.listen(3001, () => console.log('Backend running on :3001'));
```

**Deploy to:**
- Railway (free tier, Postgres included)
- Render (free tier, 750 hours/month)
- Fly.io (free tier, persistent storage)

---

## Recommended Next Steps

1. **Prototype the serverless function first** (`/api/chat.ts`)
2. **Test locally** with `vercel dev`
3. **Refactor frontend** to call the new endpoint
4. **Deploy to Vercel** and verify production
5. **Monitor costs** in Gemini API dashboard

---

## Performance Expectations

### Current (Frontend-Only)
- First response: ~1-2s (cold start + Gemini API)
- Follow-up: ~500-800ms

### With Backend Proxy (Serverless)
- First response: ~1.5-2.5s (serverless cold start + Gemini)
- Follow-up: ~400-600ms (warm function)
- **Edge runtime:** ~200-400ms (best-case)

### With Backend Proxy (Express Server)
- First response: ~800-1200ms (server + Gemini)
- Follow-up: ~400-600ms
- **Always warm:** No cold start penalty

**Recommendation:** Start with Vercel Serverless for simplicity, migrate to Express if you add database/heavy logic later.

---

## Security Best Practices

1. **Never commit `.env` files** (already gitignored ✅)
2. **Use environment variables** for all secrets
3. **Implement rate limiting** server-side
4. **Sanitize user input** before sending to Gemini
5. **Add CORS headers** to restrict API access
6. **Monitor API usage** in Gemini dashboard

---

## Questions to Consider

1. **Do you want persistent chat history across sessions?**
   - If yes: Add database (PostgreSQL on Vercel/Railway)
   - If no: Keep session-based (current approach)

2. **Do you want analytics/logging of chat interactions?**
   - If yes: Add logging service (Vercel Analytics, Posthog)
   - If no: Skip for now

3. **Do you want a CMS to edit portfolio content without code?**
   - If yes: Consider Sanity/Contentful + API endpoint
   - If no: Keep TypeScript data files

---

## Conclusion

**Recommended Approach:**
1. **Vercel Serverless** for backend (free, fast, simple)
2. **Gemini 2.0 Flash** for AI (fast, cheap, quality)
3. **Embedded context** in system instruction (no RAG DB needed)
4. **Gradual migration** (backend proxy first, enhancements later)

This architecture gives you:
- ✅ Secure API key handling
- ✅ Fast responses (<500ms)
- ✅ Full portfolio context for AI
- ✅ Near-zero cost
- ✅ Easy deployment
- ✅ Room to scale (add DB, analytics, CMS later)
