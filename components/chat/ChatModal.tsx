
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import Message from './Message';

const suggestionChips = [
    "Tell me about your projects",
    "What's your experience with React?",
    "How can I contact you?",
];

const ChatModal: React.FC = () => {
  const { isOpen, toggleChat, messages, sendMessage, isLoading } = useChat();
  const [inputValue, setInputValue] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleChat(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleChat]);

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
    <div
      className={`fixed inset-0 z-30 flex items-end justify-center p-4 sm:items-center sm:justify-end transition-opacity duration-300 ease-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => toggleChat(false)}
      ></div>

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-modal-title"
        className={`relative flex flex-col w-full max-w-xl h-[70vh] max-h-[600px] bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/10 shadow-2xl transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <header className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 id="chat-modal-title" className="font-bold text-neutral-100 font-mono">
            TERMINAL
          </h2>
          <button
            onClick={() => toggleChat(false)}
            aria-label="Close chat"
            className="p-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
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
                <p className="text-sm text-neutral-400 mb-2 font-mono">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                    {suggestionChips.map(chip => (
                        <button key={chip} onClick={() => handleSuggestionClick(chip)} className="px-3 py-1 text-sm bg-white/5 border border-white/20 hover:bg-white/20 transition-colors font-mono">
                            {chip}
                        </button>
                    ))}
                </div>
            </div>
        )}

        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter command..."
              aria-label="Chat message"
              className="flex-grow w-full bg-black/20 border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-shadow font-mono"
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
    </div>
  );
};

export default ChatModal;
