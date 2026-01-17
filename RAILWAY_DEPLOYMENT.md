# Railway Deployment Guide

## Architecture Overview

**Backend (Railway):** Node.js Express server with Gemini API
**Frontend (Vercel/Netlify/Railway):** React app calling backend API

---

## Part 1: Deploy Backend to Railway

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway

```bash
railway login
```

This opens your browser for authentication.

### Step 3: Initialize Railway Project

```bash
# In your project directory
railway init
```

Select:
- **Create new project** → Yes
- **Project name** → `pranav-portfolio-backend` (or your choice)

### Step 4: Add Environment Variables

```bash
# Add Gemini API key
railway variables set GEMINI_API_KEY=your_gemini_api_key_here

# Add frontend URL (will update after deploying frontend)
railway variables set FRONTEND_URL=*
```

Or add via Railway Dashboard:
1. Go to https://railway.app/dashboard
2. Select your project
3. Click **Variables** tab
4. Add:
   - `GEMINI_API_KEY` = your API key
   - `FRONTEND_URL` = `*` (allows all origins, change later)
   - `PORT` = Railway auto-sets this

### Step 5: Deploy Backend

```bash
railway up
```

This deploys your `server.js` to Railway!

### Step 6: Get Your Backend URL

```bash
railway domain
```

Or in Railway Dashboard → **Settings** → **Networking** → **Generate Domain**

You'll get something like: `https://pranav-portfolio-backend-production.up.railway.app`

---

## Part 2: Update Frontend to Use Railway Backend

### Step 1: Update `.env` with Railway URL

```bash
# In your .env file
VITE_API_URL=https://your-backend.up.railway.app/api/chat
```

**Example:**
```bash
VITE_API_URL=https://pranav-portfolio-backend-production.up.railway.app/api/chat
```

### Step 2: Update Railway CORS Settings

Go back to Railway dashboard and update `FRONTEND_URL`:

```bash
railway variables set FRONTEND_URL=https://your-frontend-domain.vercel.app
```

Or if deploying frontend to Railway too:
```bash
railway variables set FRONTEND_URL=https://your-frontend.up.railway.app
```

---

## Part 3: Deploy Frontend

### Option A: Deploy Frontend to Vercel

```bash
# Build with Railway backend URL
npm run build

# Deploy to Vercel
vercel --prod
```

Make sure to add `VITE_API_URL` environment variable in Vercel dashboard.

### Option B: Deploy Frontend to Railway (Same Project)

**Create a second service in the same Railway project:**

1. Go to Railway Dashboard
2. Click **+ New** → **Empty Service**
3. Name it `frontend`
4. Link to your GitHub repo (or deploy via CLI)

**Add build command for frontend:**
- Build Command: `npm run build`
- Start Command: `npx serve -s dist -p $PORT`

**Add environment variables:**
- `VITE_API_URL` = `https://your-backend.up.railway.app/api/chat`

### Option C: Deploy Both on Single Railway Service

Not recommended, but possible. Better to separate backend and frontend.

---

## Testing Your Deployment

### Test Backend API Directly

```bash
curl https://your-backend.up.railway.app/api/chat \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, test"}'
```

Expected response:
```json
{
  "response": "Hey there! I'm Grogu, your friendly AI assistant...",
  "remaining": 29,
  "timestamp": "2025-01-14T..."
}
```

### Test Frontend

1. Visit your deployed frontend URL
2. Open chatbot
3. Send a message
4. Check browser DevTools → Network tab:
   - Should see POST to `https://your-backend.up.railway.app/api/chat`
   - Should receive 200 response with AI message

---

## Local Development Workflow

### Terminal 1: Run Backend
```bash
npm run dev:backend
# Backend runs on http://localhost:3001
```

### Terminal 2: Run Frontend
```bash
npm run dev
# Frontend runs on http://localhost:5173
# Calls backend at http://localhost:3001/api/chat
```

---

## Railway Dashboard Monitoring

### View Logs
Railway Dashboard → Your Project → Backend Service → **Logs** tab

### View Metrics
- CPU usage
- Memory usage
- Request count
- Response times

### View Deployments
- Build logs
- Deployment history
- Rollback to previous version

---

## Costs

### Railway Free Tier
- $5 monthly credit (enough for hobby projects)
- 512 MB RAM
- 1 GB disk
- Shared CPU

### Gemini API
- ~$0.34/month for 1,000 conversations
- Free tier available

### Total Estimated Cost
- **Free tier**: $0/month (within Railway credits)
- **Light usage**: ~$0.50/month
- **Medium usage (10k requests)**: ~$5/month

---

## Environment Variables Checklist

### Backend (.env or Railway Dashboard)
```bash
GEMINI_API_KEY=your_key_here
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3001  # Railway sets this automatically
```

### Frontend (.env or Vercel Dashboard)
```bash
VITE_API_URL=https://your-backend.up.railway.app/api/chat
```

---

## Troubleshooting

### Issue: "Cannot GET /"
**Solution**: Backend is running, but there's no root route. This is normal. Test `/api/chat` instead.

### Issue: CORS error in browser
**Solution**: Update `FRONTEND_URL` in Railway to match your frontend domain.

### Issue: "GEMINI_API_KEY not configured"
**Solution**: Add environment variable in Railway dashboard, then redeploy:
```bash
railway up --detach
```

### Issue: Backend not starting
**Solution**: Check Railway logs. Common issues:
- Missing dependencies (`npm install`)
- Wrong start command (should be `node server.js`)
- Port binding issue (Railway sets `PORT` automatically)

### Issue: Railway build fails
**Solution**: Make sure `package.json` has correct `type`:
- If using `require()`: Remove `"type": "module"`
- If using `import`: Keep `"type": "module"` and convert `server.js` to use imports

---

## Converting server.js to ES Modules (if needed)

If you want to keep `"type": "module"` in package.json:

1. **Rename `server.js` to `server.mjs`** OR
2. **Convert to ES imports:**

```javascript
// Top of server.js
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { SYSTEM_INSTRUCTION } from './api/portfolio-data.js';  // Add .js extension

dotenv.config();

// ... rest of code stays the same
```

---

## Quick Deploy Commands

### Deploy Backend
```bash
cd C:\Users\thiru\OneDrive\Desktop\portfolio\PRANAV_PORTFOLIO
railway up
```

### Deploy Frontend (if using Railway)
```bash
# Create separate service, then:
railway link  # Link to frontend service
railway up
```

### View Backend URL
```bash
railway domain
```

### View Logs
```bash
railway logs
```

### Redeploy After Changes
```bash
railway up
```

---

## GitHub Integration (Recommended)

### Enable Auto-Deploy from GitHub

1. Push your code to GitHub
2. In Railway Dashboard:
   - Settings → **Connect to GitHub**
   - Select repository
   - Select branch (e.g., `main`)
3. Every push to `main` auto-deploys!

### Benefits
- Automatic deployments on push
- Preview deployments for PRs
- Rollback via Git
- CI/CD built-in

---

## Production Checklist

- [ ] Backend deployed to Railway
- [ ] Environment variables set in Railway dashboard
- [ ] Frontend updated with Railway backend URL
- [ ] Frontend deployed (Vercel/Netlify/Railway)
- [ ] CORS configured (`FRONTEND_URL` matches frontend domain)
- [ ] Test chatbot on production site
- [ ] Check Railway logs for errors
- [ ] Monitor Railway usage (shouldn't exceed free tier)
- [ ] Set up custom domain (optional)

---

## Next Steps

1. **Deploy backend now:**
   ```bash
   railway login
   railway init
   railway up
   ```

2. **Get backend URL:**
   ```bash
   railway domain
   ```

3. **Update frontend `.env`:**
   ```bash
   VITE_API_URL=https://your-backend.up.railway.app/api/chat
   ```

4. **Deploy frontend:**
   ```bash
   vercel --prod  # or deploy to Railway
   ```

5. **Test everything:**
   - Visit frontend URL
   - Open chatbot
   - Send a message
   - Verify it works!

---

## Support

If you need help:
1. Check Railway logs: `railway logs`
2. Check Railway dashboard metrics
3. Test backend directly with curl (see Testing section)
4. Check CORS settings if getting network errors

Good luck! 🚀
