
import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);


const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <footer className="sticky bottom-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 p-2 md:p-4">
      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 md:gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-grow bg-gray-800 text-gray-200 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 transition duration-200 disabled:opacity-50"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </footer>
  );
};

export default MessageInput;
