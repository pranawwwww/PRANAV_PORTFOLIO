
import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import ChatModal from './ChatModal';

const ChatWidget: React.FC = () => {
  const { isOpen, toggleChat } = useChat();

  return (
    <>
      <div className="fixed top-1/2 -translate-y-1/2 right-0 z-20">
        <button
          onClick={() => toggleChat()}
          aria-label={isOpen ? 'Close chat' : 'Open chat to ask a question'}
          className={`bg-[#1a1a1a] border-l border-t border-b border-white/20 rounded-r-none px-2 py-4 text-sm font-medium hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a1a1a] transition-all duration-300 [writing-mode:vertical-rl] transform rotate-180 ${
            isOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          Ask Me Anything
        </button>
      </div>
      <ChatModal />
    </>
  );
};

export default ChatWidget;
