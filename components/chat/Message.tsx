import React, { useState, useEffect } from 'react';
import type { Message as MessageType } from '../../types';

interface MessageProps {
  message: MessageType;
}

const Typewriter: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsComplete(false);
        let i = 0;
        if (text.length === 0) {
            setIsComplete(true);
            return;
        }

        const intervalId = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(intervalId);
                setIsComplete(true);
            }
        }, 15); // Faster typing for shorter messages

        return () => clearInterval(intervalId);
    }, [text]);

    return (
        <div 
            className="whitespace-pre-wrap prose prose-sm max-w-none" 
            style={{ color: 'var(--text-primary)' }}
            dangerouslySetInnerHTML={{ __html: displayedText }}
        />
    );
};


const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isBot = message.author === 'bot';
  const isTyping = message.text === '...';
  const prefix = isBot ? '[GROGU]:' : '[USER]:';

  return (
    <div className="font-mono text-sm sm:text-base">
        <span className="select-none" style={{ color: 'var(--text-muted)' }}>{prefix}</span>
        <div className="mt-1" style={{ color: 'var(--text-primary)' }}>
          {isTyping ? (
              <div className="flex items-center">
                  <span className="inline-block w-2 h-4 animate-pulse" style={{ backgroundColor: 'var(--text-muted)' }} aria-hidden="true"></span>
              </div>
          ) : isBot ? (
              <Typewriter text={message.text} />
          ) : (
               <p className="whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>{message.text}</p>
          )}
        </div>
    </div>
  );
};

export default MessageComponent;