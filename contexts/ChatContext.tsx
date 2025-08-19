import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { Message } from '../types';

import { siteData } from '../data/siteData.ts';
import { projectsData } from '../data/projectsData.ts';
import { experienceData } from '../data/experienceData.ts';
import { skillsData } from '../data/skillsData.ts';
import { faqData } from '../data/faqData.ts';


interface ChatContextType {
  isOpen: boolean;
  toggleChat: (open?: boolean) => void;
  messages: Message[];
  sendMessage: (messageText: string) => Promise<void>;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Transform skills data into a simple object for the AI context
const skillsForContext = skillsData.reduce((acc, category) => {
  acc[category.category] = category.skills;
  return acc;
}, {} as Record<string, string[]>);

const portfolioContext = `
You are Grogu, a helpful AI assistant for the personal portfolio website of Pranav Kutralingam, a Software Developer and CS Graduate. Your personality is helpful, professional, and slightly playful (like the character Grogu from Star Wars). Your goal is to answer questions from potential employers, collaborators, or visitors based ONLY on the context provided below. 

IMPORTANT GUIDELINES:
- Only provide information that exists in the context below
- If asked about projects, always include relevant links when available  
- When discussing experience with specific technologies, reference the relevant projects or work experience
- If the answer is not in the context, politely state that you don't have that information
- Keep answers concise, professional, and helpful
- Always refer to the person as "Pranav" or "Pranav Kutralingam"
- When providing links, use the full URLs provided in the data

Here is all the information about Pranav Kutralingam:

---
PERSONAL & CONTACT INFO:
${JSON.stringify(siteData, null, 2)}

---
PROJECTS (with links and technical details):
${JSON.stringify(projectsData, null, 2)}

---
PROFESSIONAL EXPERIENCE:
${JSON.stringify(experienceData, null, 2)}

---
TECHNICAL SKILLS BY CATEGORY:
${JSON.stringify(skillsForContext, null, 2)}

---
FREQUENTLY ASKED QUESTIONS:
${JSON.stringify(faqData, null, 2)}

When discussing experience with specific technologies, cross-reference the skills with the projects and work experience to provide comprehensive answers.
`;

const initialMessage: Message = {
    id: 'init-message',
    author: 'bot',
    text: `Hello! I'm Grogu, Pranav's AI assistant. I can help you learn about his projects, technical skills, and professional experience. What would you like to know?`,
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load messages from localStorage (more persistent than sessionStorage)
  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem('pranav-portfolio-chat-history');
      if (storedMessages && JSON.parse(storedMessages).length > 0) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([initialMessage]);
      }
    } catch (error) {
      console.error("Could not parse chat history from localStorage", error);
      setMessages([initialMessage]);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    try {
        if(messages.length > 0) {
            localStorage.setItem('pranav-portfolio-chat-history', JSON.stringify(messages));
        }
    } catch (error) {
        console.error("Could not save chat history to localStorage", error);
    }
  }, [messages]);


  const toggleChat = (open?: boolean) => {
    setIsOpen(prev => typeof open === 'boolean' ? open : !prev);
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      author: 'user',
      text: messageText,
    };
    
    setMessages(prev => {
        // Clear initial message on first user interaction
        if (prev.length === 1 && prev[0].id === 'init-message') {
            return [userMessage];
        }
        return [...prev, userMessage]
    });
    setIsLoading(true);

    try {
        // Check if we're in development mode
        const isDevelopment = (globalThis as any).__DEV_MODE__ || false;
        
        if (isDevelopment) {
            // Development mode - use client-side Gemini API
            const apiKey = (globalThis as any).__GEMINI_API_KEY__;
            
            if (!apiKey) {
                throw new Error('API key not found. Please add GEMINI_API_KEY to your .env file');
            }

            const genAI = new GoogleGenAI({ apiKey });
            
            // Prepare chat history
            const currentMessages = messages.filter(msg => msg.id !== 'init-message');
            const history = currentMessages.map(msg => ({
                role: msg.author === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

            const chat = genAI.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: portfolioContext,
                },
                history: history.length > 0 ? history : undefined,
            });

            const result = await chat.sendMessage({ message: messageText });
            
            const botMessage: Message = {
                id: Date.now().toString() + 'b',
                author: 'bot',
                text: result.text,
            };
            
            setMessages(prev => [...prev, botMessage]);
        } else {
            // Production mode - use serverless API
            const currentMessages = messages.filter(msg => msg.id !== 'init-message');
            const history = currentMessages.map(msg => ({
                role: msg.author === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageText,
                    history: history,
                    systemInstruction: portfolioContext
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || 'API request failed');
            }

            const botMessage: Message = {
                id: Date.now().toString() + 'b',
                author: 'bot',
                text: data.text,
            };
            
            setMessages(prev => [...prev, botMessage]);
        }
    } catch (error) {
      console.error('Error sending message to Gemini API:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + 'e',
        author: 'bot',
        text: `Sorry, I'm having trouble connecting right now. ${error instanceof Error ? error.message : 'Please try again later.'}`,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ isOpen, toggleChat, messages, sendMessage, isLoading }}>
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