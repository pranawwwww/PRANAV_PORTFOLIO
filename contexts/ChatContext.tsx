import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import type { Message } from '../types';

// API endpoint - will use /api/chat in production (Vercel) or http://localhost:3000/api/chat in local dev
const API_ENDPOINT = import.meta.env.VITE_API_URL || '/api/chat';

// Request limits (enforced on backend, but tracked here for UX)
const SESSION_LIMIT = 30; // per browser session
const DAILY_LIMIT = 1000; // per device/day

type DailyCounter = { date: string; count: number };

function todayKey(): string {
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
    if (!raw) {
      const dc = { date: today, count: 0 };
      localStorage.setItem(key, JSON.stringify(dc));
      return dc;
    }
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

const initialMessage: Message = {
  id: 'init-message',
  author: 'bot',
  text: `Hey there! I'm Neuro, your friendly AI assistant. Ask me anything about Pranav's projects, experience, or skills — happy to help! ✨`,
};

// Simple preset actions for convenience
const defaultQuickActions: QuickAction[] = [
  { label: "Know Pranav", command: "Who is Pranav?" },
  { label: "Show featured projects" },
  { label: "List technical skills" },
  { label: "How can I contact you?" },
  { label: "Summarize experience" },
];

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load messages from sessionStorage on mount
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

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem('chatMessages', JSON.stringify(messages));
      }
    } catch (error) {
      console.error("Could not save chat history to sessionStorage", error);
    }
  }, [messages]);

  const toggleChat = (open?: boolean) => {
    setIsOpen(prev => typeof open === 'boolean' ? open : !prev);
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    // Check rate limits (frontend enforcement for UX)
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

    // Add user message to UI
    const userMessage: Message = {
      id: Date.now().toString(),
      author: 'user',
      text: messageText,
    };

    setMessages(prev => {
      // Replace initial message with first user message
      if (prev.length === 1 && prev[0].id === 'init-message') {
        return [userMessage];
      }
      return [...prev, userMessage];
    });

    setIsLoading(true);
    incrementSessionCount();
    incrementDailyCounter();

    try {
      // Build conversation history for context
      const conversationHistory = messages
        .filter(msg => msg.id !== 'init-message')
        .map(msg => ({
          role: msg.author === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

      // Call backend API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now().toString() + 'b',
        author: 'bot',
        text: data.response,
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message to chat API:', error);

      const errorMessage: Message = {
        id: Date.now().toString() + 'e',
        author: 'bot',
        text: error instanceof Error && error.message.includes('API error')
          ? "Sorry, I'm having trouble connecting to the server. Please try again later."
          : "Sorry, I'm having trouble connecting right now. Please try again later.",
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
    <ChatContext.Provider
      value={{
        isOpen,
        toggleChat,
        messages,
        sendMessage,
        isLoading,
        quickActions: defaultQuickActions,
        executeAction
      }}
    >
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
