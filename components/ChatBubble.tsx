
import React from 'react';
import type { ChatMessage } from '../types';

interface ChatBubbleProps extends ChatMessage {}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, text }) => {
  const isUser = role === 'user';
  const bubbleClasses = isUser
    ? 'bg-blue-600 justify-end'
    : 'bg-gray-700 justify-start';
  const textClasses = isUser ? 'text-white' : 'text-gray-200';

  // A simple markdown-like renderer for newlines
  const renderText = (txt: string) => {
    return txt.split('\n').map((line, i) => (
        <React.Fragment key={i}>
            {line}
            <br />
        </React.Fragment>
    ));
  }

  if (!text && role === 'model') {
    return null; // Don't render empty model bubbles before streaming starts
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded-xl px-4 py-3 max-w-xs md:max-w-2xl shadow-lg ${isUser ? 'bg-blue-600' : 'bg-gray-700'}`}>
        <p className={`text-sm md:text-base whitespace-pre-wrap ${textClasses}`}>
          {renderText(text)}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;
