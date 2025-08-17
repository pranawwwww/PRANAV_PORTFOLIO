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
        }, 20); // Typing speed in milliseconds

        return () => clearInterval(intervalId);
    }, [text]);

    return (
        <p className="whitespace-pre-wrap">
            {displayedText}
            {!isComplete && <span className="inline-block w-2 h-4 bg-neutral-200 animate-pulse ml-1" aria-hidden="true"></span>}
        </p>
    );
};


const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isBot = message.author === 'bot';
  const isTyping = message.text === '...';
  const prefix = isBot ? '[BOT]:' : '[USER]:';

  return (
    <div className="font-mono text-sm sm:text-base">
        <span className="text-neutral-400 select-none">{prefix}</span>
        <div className="mt-1 text-neutral-200">
          {isTyping ? (
              <div className="flex items-center">
                  <span className="inline-block w-2 h-4 bg-neutral-400 animate-pulse" aria-hidden="true"></span>
              </div>
          ) : isBot ? (
              <Typewriter text={message.text} />
          ) : (
               <p className="whitespace-pre-wrap">{message.text}</p>
          )}
        </div>
    </div>
  );
};

export default MessageComponent;