// Simple Express backend for AI chat
// Deploy to Railway, Render, or any Node.js host

import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { SYSTEM_INSTRUCTION } from './api/portfolio-data.js';

dotenv.config();

const app = express();

// CORS - allow your frontend domain(s)
const allowedOrigins = [
  'https://pranavkutralingam.com',
  'https://www.pranavkutralingam.com',
  'https://pranawwwww.github.io',
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || process.env.FRONTEND_URL === '*') {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());

// Rate limiting (simple in-memory)
const rateLimitCache = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const limit = rateLimitCache.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimitCache.set(ip, { count: 1, resetAt: now + 3600000 });
    return { allowed: true, remaining: 29 };
  }

  if (limit.count >= 30) {
    return { allowed: false, remaining: 0 };
  }

  limit.count++;
  return { allowed: true, remaining: 30 - limit.count };
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    // Rate limiting
    const clientIP = req.ip || req.connection.remoteAddress;
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again in an hour.'
      });
    }

    // Parse request
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid request: message is required' });
    }

    // Initialize Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',  // Latest stable flash model
      systemInstruction: SYSTEM_INSTRUCTION
    });

    // Build conversation history
    const formattedHistory = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Create chat with history
    const chat = model.startChat({
      history: formattedHistory
    });

    // Send message
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    // Return response
    return res.status(200).json({
      response,
      remaining: rateLimitResult.remaining,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);

    if (error.message?.includes('API key')) {
      return res.status(500).json({
        error: 'API configuration error',
        message: 'Please contact the site administrator'
      });
    }

    if (error.message?.includes('quota')) {
      return res.status(429).json({
        error: 'Service quota exceeded',
        message: 'AI service is temporarily unavailable. Please try again later.'
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process chat request'
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/chat`);
});
