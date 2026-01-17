import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import Message from './Message';
import neuroIcon from '../../data/connection.png';

const ChatModal: React.FC = () => {
  const { isOpen, toggleChat, messages, sendMessage, isLoading, quickActions, executeAction } = useChat();
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
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };
  
  return (
    <div
      className={`fixed inset-0 z-30 flex items-end justify-center p-4 sm:items-center sm:justify-end transition-opacity duration-300 ease-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={() => toggleChat(false)}
      ></div>

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-modal-title"
        className={`chat-modal relative flex flex-col w-full max-w-xl h-[70vh] max-h-[600px] shadow-2xl transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: 'var(--text)'
        }}
      >
        <header className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <img
              src={neuroIcon}
              alt=""
              aria-hidden="true"
              className="w-5 h-5"
              style={{ borderRadius: '4px' }}
            />
            <h2 id="chat-modal-title" className="font-bold font-mono" style={{ color: 'var(--text)' }}>
              NEURO - AI ASSISTANT
            </h2>
          </div>
          <button
            onClick={() => toggleChat(false)}
            aria-label="Close chat"
            className="p-1 rounded focus:outline-none focus:ring-2 transition-colors"
            style={{ 
              color: 'var(--text)',
              background: 'transparent',
              border: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="flex-grow p-4 overflow-y-auto" aria-live="polite" style={{ background: 'var(--surface)' }}>
          <div className="space-y-6">
            {messages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))}
            {isLoading && <Message message={{ id: 'loading', author: 'bot', text: '...' }} />}
            
            {/* Quick Action Buttons */}
            {quickActions.length > 0 && !isLoading && (
              <div className="mt-4 p-3 rounded border" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
                <p className="text-xs mb-2 font-mono" style={{ color: 'var(--text-muted)' }}>Quick Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => executeAction(action)}
                      className="px-3 py-1 text-xs transition-opacity font-mono rounded"
                      style={{
                        background: 'var(--accent)',
                        color: '#ffffff',
                        border: 'none'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Neuro anything..."
              aria-label="Chat message"
              className="flex-grow w-full px-3 py-2 focus:outline-none focus:ring-2 transition-shadow font-mono rounded"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                color: 'var(--text)'
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
              className="px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 transition-colors rounded"
              style={{
                background: 'var(--accent)',
                border: '1px solid var(--accent)',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.opacity = '0.95')}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
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
