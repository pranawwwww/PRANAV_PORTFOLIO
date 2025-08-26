import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import Message from './Message';
import { siteData } from '../../data/siteData';

const suggestionChips = [
  "What roles are you targeting?",
  "When are you available?",
  "Any performance or scale wins?",
  "What languages and stacks do you use most?",
  "What do you do for fun?",
];

const HomePageChat: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
    setInputValue('');
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  }

  return (
    <div className="flex flex-col h-[75vh] max-h-[700px] min-h-0 w-full mono">
        <header className="p-6 text-center" style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)"
        }}>
            <img
              src="./data/profile-pixel.png"
              alt="A pixelated black and white portrait"
              className="w-24 h-24 mx-auto mb-4 rounded-lg"
              style={{ border: "1px solid var(--border)" }}
            />
            <h1 id="chat-title" className="font-bold text-xl" style={{ color: "var(--text)" }}>
            Hi, I'm {siteData.name}.
            </h1>
            <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>{siteData.tagline}</p>
        </header>

        <div className="flex-grow p-6 overflow-y-auto min-h-0" aria-live="polite" style={{
          background: "var(--bg)"
        }}>
          <div className="space-y-6 max-w-none">
            {messages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))}
            {isLoading && <Message message={{ id: 'loading', author: 'bot', text: '...' }} />}
          </div>
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggestions persistently visible */}
        <div className="p-4 pt-0 shrink-0" style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)"
        }}>
          <p className="text-sm mb-3 mono" style={{ color: "var(--text-muted)" }}>Try asking about:</p>
          <div className="flex flex-wrap gap-2">
              {suggestionChips.map(chip => (
                  <button 
                    key={chip} 
                    onClick={() => handleSuggestionClick(chip)} 
                    className="card px-4 py-2 text-sm transition-colors mono"
                    style={{
                      background: "var(--surface-2)",
                      color: "var(--text)",
                      border: "1px solid var(--border)"
                    }}
                  >
                      {chip}
                  </button>
              ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 shrink-0" style={{
          borderTop: "1px solid var(--border)",
          background: "var(--surface)"
        }}>
          <div className="flex items-center space-x-3">
             <span className="mono text-sm select-none" style={{ color: "var(--text-muted)" }}>[USER]:</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter command..."
              aria-label="Chat message"
              className="flex-grow px-4 py-2 mono rounded-lg transition-all"
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
              className="primary px-6 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
    </div>
  );
};

export default HomePageChat;