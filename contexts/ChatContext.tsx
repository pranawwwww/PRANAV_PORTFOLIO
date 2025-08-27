import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { Message } from '../types';

import { siteData } from '../data/siteData.ts';
import { projectsData } from '../data/projectsData.ts';
import { experienceData } from '../data/experienceData.ts';
import { skillsData } from '../data/skillsData.ts';
import { faqData } from '../data/faqData.ts';

// Request limits
const SESSION_LIMIT = 30; // per browser session
const DAILY_LIMIT = 1000; // per device/day (frontend guard; enforce on backend too when deployed)

type DailyCounter = { date: string; count: number };

function todayKey(): string {
  // YYYY-MM-DD (UTC) is sufficient for a simple daily rollover
  return new Date().toISOString().slice(0, 10);
}

function getSessionCount(): number {
  try { return parseInt(sessionStorage.getItem('chatSessionCount') || '0', 10) || 0; } catch { return 0; }
}
function incrementSessionCount(): number {
  const next = getSessionCount() + 1;
  try { sessionStorage.setItem('chatSessionCount', String(next)); } catch {}
  return next;
}

function getDailyCounter(): DailyCounter {
  const key = 'chatDailyCounter';
  const today = todayKey();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) { const dc = { date: today, count: 0 }; localStorage.setItem(key, JSON.stringify(dc)); return dc; }
    const parsed = JSON.parse(raw) as DailyCounter;
    if (!parsed.date || parsed.date !== today) {
      const dc = { date: today, count: 0 };
      localStorage.setItem(key, JSON.stringify(dc));
      return dc;
    }
    return parsed;
  } catch {
    const dc = { date: today, count: 0 };
    try { localStorage.setItem(key, JSON.stringify(dc)); } catch {}
    return dc;
  }
}
function incrementDailyCounter(): DailyCounter {
  const key = 'chatDailyCounter';
  const current = getDailyCounter();
  const next = { date: current.date, count: current.count + 1 };
  try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  return next;
}

function limitMessage(kind: 'session' | 'daily'): Message {
  const text = kind === 'session'
    ? `You've reached the session limit of ${SESSION_LIMIT} messages. Please refresh the page or come back later.`
    : `Daily usage limit reached (${DAILY_LIMIT} messages). Please try again tomorrow.`;
  return { id: Date.now().toString() + '-limit', author: 'bot', text };
}

interface QuickAction { label: string; command?: string }

interface ChatContextType {
  isOpen: boolean;
  toggleChat: (open?: boolean) => void;
  messages: Message[];
  sendMessage: (messageText: string) => Promise<void>;
  isLoading: boolean;
  quickActions: QuickAction[];
  executeAction: (action: QuickAction) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Transform skills data into a simple object for the AI context
const skillsForContext = skillsData.reduce((acc, category) => {
  acc[category.category] = category.skills;
  return acc;
}, {} as Record<string, string[]>);

const portfolioContext = `
You are a friendly, enthusiastic, and professional chatbot for Pranav's personal portfolio website (senior frontend engineer).

Style guidelines:
- Be warm, encouraging, and concise. Sound excited to help but stay professional.
- Use short paragraphs and bullet points where helpful.
- Optional: At most one appropriate emoji to add warmth (e.g., ✨, 😊), only when it feels natural.
- Never invent facts. Answer ONLY from the provided context below. If unknown, say so briefly and offer what you can do instead.
- Be technically accurate. When sharing links, use those from the context.

Here is all the information about Pranav:

---
SITE & CONTACT INFO:
${JSON.stringify(siteData, null, 2)}

---
PROJECTS:
${JSON.stringify(projectsData, null, 2)}

---
PROFESSIONAL EXPERIENCE:
${JSON.stringify(experienceData, null, 2)}

---
TECHNICAL SKILLS:
${JSON.stringify(skillsForContext, null, 2)}

---
FREQUENTLY ASKED QUESTIONS:
${JSON.stringify(faqData, null, 2)}
`;

const initialMessage: Message = {
    id: 'init-message',
    author: 'bot',
    text: `Hey there! I’m Grogu, your friendly AI assistant. Ask me anything about Pranav’s projects, experience, or skills — happy to help! ✨`,
};

// Simple preset actions for convenience
const defaultQuickActions: QuickAction[] = [
  { label: "Show featured projects" },
  { label: "List technical skills" },
  { label: "How can I contact you?" },
  { label: "Summarize experience" },
];

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);

  useEffect(() => {
    try {
      const storedMessages = sessionStorage.getItem('chatMessages');
      if (storedMessages && JSON.parse(storedMessages).length > 0) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([initialMessage]);
      }
    } catch (error) {
      console.error("Could not parse chat history from sessionStorage", error);
      setMessages([initialMessage]);
    }
  }, []);

  useEffect(() => {
    try {
        if(messages.length > 0) {
            sessionStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    } catch (error) {
        console.error("Could not save chat history to sessionStorage", error);
    }
  }, [messages]);

  useEffect(() => {
    const apiKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY as string | undefined;
    if (!apiKey) {
      console.warn('AI chat initialization skipped: Missing VITE_GEMINI_API_KEY');
      return;
    }
    try {
      const ai = new GoogleGenAI({ apiKey });
      const history = messages
          .filter(msg => msg.id !== 'init-message')
          .map(msg => ({
              role: msg.author === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
          }));

        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
              systemInstruction: portfolioContext,
          },
          history: history.length > 0 ? history: undefined,
        });
        setChatInstance(chat);
    } catch (e) {
      console.warn('AI chat initialization skipped:', e);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const toggleChat = (open?: boolean) => {
    setIsOpen(prev => typeof open === 'boolean' ? open : !prev);
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const sessionCount = getSessionCount();
    const dailyCount = getDailyCounter().count;

    if (sessionCount >= SESSION_LIMIT) {
      const limitMsg = limitMessage('session');
      setMessages(prev => [...prev, limitMsg]);
      return;
    }

    if (dailyCount >= DAILY_LIMIT) {
      const limitMsg = limitMessage('daily');
      setMessages(prev => [...prev, limitMsg]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      author: 'user',
      text: messageText,
    };
    
    setMessages(prev => {
        if (prev.length === 1 && prev[0].id === 'init-message') {
            return [userMessage];
        }
        return [...prev, userMessage]
    });
    setIsLoading(true);
    incrementSessionCount();
    incrementDailyCounter();

    try {
        if (!chatInstance) {
            throw new Error("Chat not initialized");
        }
      const result = await chatInstance.sendMessage({ message: messageText });
      const botMessage: Message = {
        id: Date.now().toString() + 'b',
        author: 'bot',
        text: result.text,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message to Gemini API:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + 'e',
        author: 'bot',
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const executeAction = (action: QuickAction) => {
    const text = action.command || action.label;
    void sendMessage(text);
  };

  return (
    <ChatContext.Provider value={{ isOpen, toggleChat, messages, sendMessage, isLoading, quickActions: defaultQuickActions, executeAction }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};