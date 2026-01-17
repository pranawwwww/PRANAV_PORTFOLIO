// Vercel Serverless Function: AI Chat Proxy with Gemini 2.0 Flash
// File: /api/chat.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_INSTRUCTION } from './portfolio-data';

// Rate limiting (simple in-memory cache - use Redis in production)
const rateLimitCache = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const limit = rateLimitCache.get(ip);

  // Reset if window expired (1 hour)
  if (!limit || now > limit.resetAt) {
    rateLimitCache.set(ip, { count: 1, resetAt: now + 3600000 });
    return { allowed: true, remaining: 29 };
  }

  // Check limit (30 requests per hour)
  if (limit.count >= 30) {
    return { allowed: false, remaining: 0 };
  }

  limit.count++;
  return { allowed: true, remaining: 30 - limit.count };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const rateLimitResult = checkRateLimit(String(clientIP));

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
      model: 'gemini-2.0-flash-exp',
      systemInstruction: SYSTEM_INSTRUCTION
    });

    // Build conversation history for context
    const formattedHistory = conversationHistory.map((msg: any) => ({
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

  } catch (error: any) {
    console.error('Chat API Error:', error);

    // Handle specific error types
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
}
