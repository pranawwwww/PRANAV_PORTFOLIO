import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';
import Message from './chat/Message';
import neuroIcon from '../data/connection.png';
import neuroIconInverted from '../data/connection_inverted.png';

const ChatBubble: React.FC = () => {
  const { messages, sendMessage, isLoading, quickActions, executeAction } = useChat();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastBotMessageRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    // Scroll to start of new bot response within the chat container only
    if (messages.length > prevMessagesLength.current && lastBotMessageRef.current && messagesContainerRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.author === 'bot') {
        const container = messagesContainerRef.current;
        const element = lastBotMessageRef.current;
        // Calculate position of element relative to container
        const elementTop = element.offsetTop - container.offsetTop;
        container.scrollTo({ top: elementTop, behavior: 'smooth' });
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  useEffect(() => {
    // Don't prevent scrolling - allow user to interact with website while chatting
    return () => {
      document.body.style.overflow = '';
    };
  }, [isChatOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 px-8 py-4 rounded-full font-medium transition-all duration-200 hover:scale-110 z-40 flex items-center gap-3 shadow-2xl"
        style={{
          background: 'white',
          color: 'black',
          border: 'none',
        }}
      >
        <img
          src={neuroIcon}
          alt="Neuro"
          className="w-6 h-6"
          style={{ borderRadius: '4px' }}
        />
        <span className="text-base font-semibold">Chat with Neuro</span>
      </button>

      {/* Chat Modal */}
      {isChatOpen && (
        <>
          {/* Backdrop - Semi-transparent, doesn't block interaction */}
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-40 pointer-events-none"
          />

          {/* Chat Window - Slides in from right */}
          <div
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[var(--surface)] shadow-2xl z-50 flex flex-col rounded-3xl overflow-hidden transform transition-transform duration-300 m-4 my-8"
            style={{
              border: '2px solid var(--border)',
              borderRight: '2px solid var(--border)',
              maxHeight: '90vh',
            }}
          >
            {/* Chat header */}
            <div
              className="px-4 py-3 border-b flex items-center justify-between"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <img
                  src={neuroIcon}
                  alt="Neuro"
                  className="w-6 h-6"
                  style={{ borderRadius: '4px' }}
                />
                <h3 className="text-base font-bold" style={{ color: 'var(--text)' }}>
                  Chat with Neuro
                </h3>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:opacity-70 transition-opacity"
                style={{ color: 'var(--text)' }}
                title="Close chat"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Chat messages area */}
            <div ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, index) => {
                  const isLastBotMessage = index === messages.length - 1 && msg.author === 'bot';
                  return (
                    <div key={msg.id} ref={isLastBotMessage ? lastBotMessageRef : null}>
                      <Message message={msg} isLastMessage={isLastBotMessage} />
                    </div>
                  );
                })}
                {isLoading && (
                  <Message message={{ id: 'loading', author: 'bot', text: '...' }} />
                )}
              </div>
            </div>

            {/* Quick Action Buttons */}
            {quickActions.length > 0 && (
              <div
                className="px-4 py-2 border-t"
                style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
              >
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => executeAction(action)}
                      disabled={isLoading}
                      className="px-3 py-1 text-xs transition-opacity rounded disabled:opacity-50 whitespace-nowrap flex-shrink-0"
                      style={{
                        background: 'var(--accent)',
                        color: 'var(--bg)',
                        border: 'none',
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 rounded-lg text-sm disabled:opacity-50"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="px-3 py-2 rounded-lg font-medium transition-opacity disabled:opacity-50"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    border: 'none',
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9-9m0 0l-9-9m9 9H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ChatBubble;
