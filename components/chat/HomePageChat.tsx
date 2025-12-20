import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import Message from './Message';
import { siteData } from '../../data/siteData';
import profilePixel from '../../data/profile-pixel.png';

const suggestionChips = [
  "What impact have you made in your work experience?",
  "What tech stack do you use most?",
  "What do you do for fun?",
  "What are your achievements?",
  "what are your featured projects?"
];

const HomePageChat: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // New: refs and state for scroll arrows
  const chipsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // New: update arrow visibility based on scroll position
  useEffect(() => {
    const updateArrows = () => {
      const el = chipsRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < max - 4);
    };
    updateArrows();
    const el = chipsRef.current;
    const onScroll = () => updateArrows();
    el?.addEventListener('scroll', onScroll, { passive: true } as any);
    window.addEventListener('resize', updateArrows);
    return () => {
      el?.removeEventListener('scroll', onScroll as any);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  }

  const scrollByAmount = (dir: 'left' | 'right') => {
    const el = chipsRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.6);
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-full w-full mono">
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto" aria-live="polite" style={{
          background: "var(--bg)"
        }}>
          <div className="space-y-4 sm:space-y-6 max-w-none">
            {messages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))}
            {isLoading && <Message message={{ id: 'loading', author: 'bot', text: '...' }} />}
          </div>
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggestions: compact, translucent, horizontal scroll with arrows */}
        <div
          className="p-2 sm:p-3 pt-0 shrink-0"
          style={{
            background: 'color-mix(in srgb, var(--surface) 70%, transparent)',
            backdropFilter: 'blur(6px)',
            borderTop: '1px solid var(--border)'
          }}
        >
          <p className="hidden sm:block text-xs sm:text-sm mb-2 mono" style={{ color: "var(--text-muted)" }}>Try asking about:</p>
          <div className="relative mx-[-4px] sm:mx-0">
            <div
              ref={chipsRef}
              className="flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden px-10 sm:px-12"
              role="listbox"
              aria-label="Suggested questions"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {suggestionChips.map(chip => (
                    <button 
                      key={chip} 
                      onClick={() => handleSuggestionClick(chip)} 
                      className="card px-3 py-1 text-xs sm:text-sm transition-colors mono whitespace-nowrap shrink-0"
                      style={{
                        background: 'var(--surface-2)',
                        color: 'var(--text)',
                        border: '1px solid var(--border)'
                      }}
                      role="option"
                      aria-label={chip}
                    >
                        {chip}
                    </button>
                ))}
            </div>
            {/* Left arrow */}
            <button
              type="button"
              aria-label="Scroll suggestions left"
              onClick={() => scrollByAmount('left')}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full border shadow-sm p-1 transition-opacity ${canScrollLeft ? 'opacity-90' : 'opacity-0 pointer-events-none'}`}
              style={{ background: 'color-mix(in srgb, var(--surface) 75%, transparent)', borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            {/* Right arrow */}
            <button
              type="button"
              aria-label="Scroll suggestions right"
              onClick={() => scrollByAmount('right')}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full border shadow-sm p-1 transition-opacity ${canScrollRight ? 'opacity-90' : 'opacity-0 pointer-events-none'}`}
              style={{ background: 'color-mix(in srgb, var(--surface) 75%, transparent)', borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-3 sm:p-4 shrink-0" style={{
          borderTop: "1px solid var(--border)",
          background: "var(--surface)"
        }}>
          <div className="flex items-center gap-2 sm:gap-3">
             <span className="mono text-sm sm:text-sm select-none" style={{ color: "var(--text-muted)" }}>[USER]:</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter command..."
              aria-label="Chat message"
              className="flex-grow px-3 sm:px-4 py-3 sm:py-3 text-base sm:text-base mono rounded-lg transition-all"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text)"
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
              className="primary px-4 sm:px-6 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
    </div>
  );
};

export default HomePageChat;