import { createServer } from 'http';
import { parse } from 'url';
import fs from 'fs';
import path from 'path';

// Load environment variables
import { config } from 'dotenv';
config({ path: '.env.local' });

const server = createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;

  if (pathname === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { senderEmail, message, senderName } = JSON.parse(body);

        if (!senderEmail || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email and message are required' }));
          return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(senderEmail)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid email format' }));
          return;
        }

        // Log the contact form submission
        console.log('📧 Contact form submission:', {
          senderEmail,
          senderName: senderName || 'Anonymous',
          message,
          timestamp: new Date().toISOString()
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true,
          message: 'Your message has been received! I\'ll get back to you soon.'
        }));
      } catch (error) {
        console.error('Contact form error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: 'Failed to send message. Please try again later.'
        }));
      }
    });
    return;
  }

  if (pathname === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { GoogleGenAI } = await import('@google/genai');
        const requestData = JSON.parse(body);
        const { message, history, systemInstruction, context } = requestData;

        if (!message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Message is required' }));
          return;
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          console.error('GEMINI_API_KEY not found in environment variables');
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'API key not configured' }));
          return;
        }

        const systemPrompt = `You are 'Grogu', portfolio assistant for Pranav Kutralingam. Keep responses SHORT (40-80 words max) to maintain conversation flow. Be friendly and helpful.`;
        
        const enhancedContext = systemPrompt + '\n\nCONTEXT:\n' + JSON.stringify(context, null, 2);

        const genAI = new GoogleGenAI({ apiKey });
        
        const chat = genAI.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: enhancedContext,
          },
          history: history || [],
        });

        const result = await chat.sendMessage({ message });
        
        let responseText = result.text || 'I can help you with information about Pranav\'s projects, experience, and skills.';
        
        if (responseText.length > 500) {
          responseText = responseText.substring(0, 400) + '... What would you like to know more about?';
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          type: 'ANSWER',
          text: responseText,
          success: true 
        }));
        
      } catch (error) {
        console.error('Chat API error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: 'Failed to process message'
        }));
      }
    });
    return;
  }

  // 404 for unknown routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`🤖 Chat API: http://localhost:${PORT}/api/chat`);
});
