<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Pranav Kutralingam — Minimalist Portfolio + Grogu AI Assistant

Meet your off‑white, eyes‑friendly personal site with a built‑in AI sidekick. It’s fast, accessible, and ships with a recruiter‑ready chat that knows your projects, experience, skills, and FAQs.

## What this app does
- Clean portfolio with pages: Home, Projects, Experience, Skills, Contact
- Grogu (AI assistant) that can:
  - Answer from your real data (no hallucinating beyond context)
  - Offer recruiter‑focused suggestion chips (persistent in the main chat)
  - Provide quick actions in the popup chat
  - Respect usage limits: 30 messages per session and 1000 per day (frontend guard)
- Theme that follows system light/dark with an easy‑on‑the‑eyes off‑white light mode
- Keyboard accessible: Skip to content, focus rings, proper semantics

## Tech stack
- React 19 + TypeScript + Vite 6
- React Router (HashRouter for static hosting)
- Tailwind (with custom CSS variables in `src/styles/theme.css`)
- @google/genai (Gemini) for the chatbot
- EmailJS for contact email (optional)

## Local development
1. Prerequisites: Node.js 18+ (or 20+ recommended)
2. Install deps: `npm install`
3. Configure env (create `.env.local`):
   - `VITE_GEMINI_API_KEY=...` (your Gemini key)
   - Optional EmailJS:
     - `VITE_EMAILJS_SERVICE_ID=...`
     - `VITE_EMAILJS_TEMPLATE_ID=...`
     - `VITE_EMAILJS_PUBLIC_KEY=...`
4. Run: `npm run dev`
5. Open: http://localhost:5173 (default Vite port)

Note: `.env*` is ignored by Git, do not commit secrets. If you accidentally pushed an env file, rotate those keys.

## Deployment (GitHub Pages)
This repo is configured to auto‑deploy on push to `main` via GitHub Actions.
- Vite `base` is set to `/PRANAV_PORTFOLIO/` in production
- Router uses `HashRouter` to avoid 404s on static hosts
- Workflow: `.github/workflows/deploy.yml`

Steps:
1. On GitHub, go to Settings → Pages → Source: GitHub Actions
2. (Optional) Add `VITE_GEMINI_API_KEY` as a repo secret for build‑time injection: Settings → Secrets and variables → Actions → New repository secret
3. Push to `main` to trigger the deploy
4. Your site will be available at: `https://<your-username>.github.io/PRANAV_PORTFOLIO/`

Important: GitHub Pages is static. Any key bundled client‑side is public. If you need private usage, put the key behind a tiny proxy (Cloudflare Worker/Vercel/Node) and call that from the client, then enforce rate limits on the server side.

## How the AI works
- Context is assembled from your TS data files and fed as a system instruction to Gemini
- Files: `data/*.ts`, wiring in `contexts/ChatContext.tsx`
- Persistent suggestion chips in `components/chat/HomePageChat.tsx`
- Popup chat (widget) shows Quick Actions but no suggestion chips
- Frontend rate limits (adjust in `contexts/ChatContext.tsx`):
  - `SESSION_LIMIT = 30`
  - `DAILY_LIMIT = 1000`

## Customize
- Content: edit `data/*` (projects, experience, skills, siteData, faqData)
- Theme: tweak `src/styles/theme.css` (CSS variables for light/dark)
- Header text: `components/Header.tsx`
- Chat suggestions: `components/chat/HomePageChat.tsx`
- Quick actions: `contexts/ChatContext.tsx` (`defaultQuickActions`)

## Useful scripts
- `npm run dev` — start local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally

Have fun, and may your CI be green and your p95s be low. ✨
