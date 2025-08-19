# AI Assistant Setup Guide

## Overview
Your portfolio includes Grogu, an AI assistant powered by Google's Gemini 2.5 Flash model. The AI can answer questions about your projects, experience, and skills based on the data in your `/data` folder.

## Features Implemented
✅ **Data-driven responses**: AI uses your actual portfolio data as source of truth  
✅ **Persistent chat history**: Conversations persist across page navigation  
✅ **Serverless architecture**: Secure API proxy prevents API key exposure  
✅ **Project linking**: AI provides direct links to your projects when relevant  
✅ **Cross-referencing**: AI connects skills with projects and experience  

## Setup Instructions

### 1. Get Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the key

### 2. Environment Configuration
1. Create `.env` file in your project root:
```bash
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Deploy to Vercel
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy
vercel

# Add environment variable
vercel env add GEMINI_API_KEY
```

### 4. Local Development
For local development, the API will show a fallback message. The full AI functionality requires deployment to Vercel.

## How It Works

### Data Sources
The AI assistant uses these data files as its knowledge base:
- `/data/siteData.ts` - Your contact info and basic details
- `/data/projectsData.ts` - Your projects with links and tech stacks
- `/data/experienceData.ts` - Your work experience
- `/data/skillsData.ts` - Your technical skills categorized
- `/data/faqData.ts` - Common questions and answers

### AI Capabilities
- Answers questions about your technical experience
- Provides project links when discussing relevant work
- Cross-references skills with actual project experience
- Maintains professional, helpful personality as "Grogu"
- Refuses to answer questions outside of your portfolio context

### Chat Persistence
- Uses localStorage for cross-page persistence
- Survives browser refreshes and navigation
- Maintains conversation context

## Customization

### Update Your Data
Edit the files in `/data/` folder to reflect your actual:
- Projects (with real GitHub/demo links)
- Work experience
- Skills and expertise
- Contact information

### Modify AI Personality
Edit the `portfolioContext` in `/contexts/ChatContext.tsx` to adjust:
- AI personality and tone
- Response guidelines
- Context instructions

## Security
- API key is stored securely on Vercel
- No client-side API key exposure
- Serverless function acts as secure proxy
- CORS properly configured

## Troubleshooting
- Ensure `.env` file has valid Gemini API key
- Check Vercel environment variables are set
- Verify `/api/chat` endpoint is accessible after deployment
