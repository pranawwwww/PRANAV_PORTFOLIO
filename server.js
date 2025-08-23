import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Import API handlers
async function loadApiHandler(handlerPath) {
  try {
    const fullPath = join(__dirname, handlerPath);
    const module = await import(fullPath);
    return module.default;
  } catch (error) {
    console.error(`Failed to load handler ${handlerPath}:`, error);
    return null;
  }
}

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const handler = await loadApiHandler('./api/chat.ts');
    if (handler) {
      await handler(req, res);
    } else {
      res.status(500).json({ error: 'Chat handler not available' });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const handler = await loadApiHandler('./api/contact.ts');
    if (handler) {
      await handler(req, res);
    } else {
      res.status(500).json({ error: 'Contact handler not available' });
    }
  } catch (error) {
    console.error('Contact API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle OPTIONS requests
app.options('/api/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`🤖 Chat API: http://localhost:${PORT}/api/chat`);
});
