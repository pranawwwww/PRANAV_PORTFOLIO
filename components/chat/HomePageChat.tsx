
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import Message from './Message';
import { siteData } from '../../data/siteData';

const suggestionChips = [
    "Tell me about your projects",
    "What's your experience with React?",
    "How can I contact you?",
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
    <div className="flex flex-col h-[70vh] max-h-[600px] w-full font-mono">
        <header className="p-4 border-b border-white/10 text-center">
            <img
              src="./data/profile-pixel.png"
              alt="A pixelated black and white portrait"
              className="w-24 h-24 mx-auto mb-4 border border-white/20"
            />
            <h1 id="chat-title" className="font-bold text-neutral-100 text-xl">
            Hi, I'm {siteData.name}.
            </h1>
            <p className="text-sm text-neutral-300 mt-2 max-w-md mx-auto">{siteData.tagline}</p>
        </header>

        <div className="flex-grow p-4 overflow-y-auto" aria-live="polite">
          <div className="space-y-6">
            {messages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))}
            {isLoading && <Message message={{ id: 'loading', author: 'bot', text: '...' }} />}
          </div>
          <div ref={messagesEndRef} />
        </div>
        
        {messages.length <= 1 && !isLoading && (
             <div className="p-4 pt-0">
                <p className="text-sm text-neutral-400 mb-2">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                    {suggestionChips.map(chip => (
                        <button key={chip} onClick={() => handleSuggestionClick(chip)} className="px-3 py-1 text-sm bg-white/5 border border-white/20 hover:bg-white/20 transition-colors">
                            {chip}
                        </button>
                    ))}
                </div>
            </div>
        )}

        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
             <span className="text-neutral-400 select-none pr-2">[USER]:</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter command..."
              aria-label="Chat message"
              className="flex-grow w-full bg-black/20 border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-shadow"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
              className="px-4 py-2 bg-white/20 border border-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white"
            >
              Send
            </button>
          </div>
        </form>
    </div>
  );
};

export default HomePageChat;