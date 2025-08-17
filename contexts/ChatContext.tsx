import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
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
You are a helpful chatbot assistant for the personal portfolio website of Alex Doe, a senior frontend engineer. Your goal is to answer questions from potential employers or collaborators based ONLY on the context provided below. Do not invent information or discuss topics outside of this context. If the answer is not in the context, politely state that you don't have that information. Keep your answers concise, professional, and helpful. Use the FAQ section to answer common personal questions.

Here is all the information about Alex Doe:

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
    text: `Welcome. I am a Gemini-powered assistant. You can ask me about Alex Doe's projects, experience, or skills.`,
};

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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const history = messages
        .filter(msg => msg.id !== 'init-message') // Don't include the initial welcome message in history
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
  }, []);


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