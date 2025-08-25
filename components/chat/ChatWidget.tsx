import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import ChatModal from './ChatModal';

const ChatWidget: React.FC = () => {
  const { isOpen, toggleChat } = useChat();

  return (
    <>
      <div className="chat-widget">
        <button
          onClick={() => toggleChat()}
          aria-label={isOpen ? 'Close chat' : 'Chat with Grogu, the AI assistant'}
          className={`border border-[var(--border-color)] text-[var(--text-primary)] px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium hover:bg-[var(--nav-hover-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition-all duration-300 font-mono uppercase tracking-wide ${
            isOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
          }`}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            borderRadius: '6px',
            minWidth: '160px',
            backgroundColor: 'var(--bg-primary)'
          }}
        >
          <img
            src="/data/icons8-baby-yoda-48 (1).png"
            alt=""
            aria-hidden="true"
            className="w-5 h-5"
            style={{ borderRadius: '4px' }}
          />
          <span>Chat with Grogu</span>
        </button>
      </div>
      <ChatModal />
    </>
  );
};

export default ChatWidget;
