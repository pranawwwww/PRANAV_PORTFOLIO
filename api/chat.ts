import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { message, history, systemInstruction } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      res.status(500).json({ error: 'API key not configured' });
      return;
    }

    const genAI = new GoogleGenAI({ apiKey });
    
    const chat = genAI.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
      history: history || [],
    });

    const result = await chat.sendMessage({ message });
    
    res.status(200).json({ 
      text: result.text,
      success: true 
    });
    
  } catch (error: any) {
    console.error('Gemini API error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: error?.message || 'Unknown error'
    });
  }
}
