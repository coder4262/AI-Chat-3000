
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { initializeChat, sendMessage } from './services/geminiService';
import type { ChatMessage } from './types';
import Header from './components/Header';
import ChatBubble from './components/ChatBubble';
import MessageInput from './components/MessageInput';
import LoadingIndicator from './components/LoadingIndicator';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      chatRef.current = initializeChat();
      setMessages([
        {
          role: 'model',
          text: "Hello! I'm a friendly AI assistant powered by Gemini. How can I help you today?",
        },
      ]);
    } catch (e: any) {
      setError(e.message || "Failed to initialize the chat service.");
      console.error(e);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;
    if (!chatRef.current) {
      setError("Chat is not initialized. Please refresh the page.");
      return;
    }

    setError(null);
    setIsLoading(true);

    const userMessage: ChatMessage = { role: 'user', text: messageText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const responseText = await sendMessage(chatRef.current, messageText);
      const modelMessage: ChatMessage = { role: 'model', text: responseText };
      setMessages((prevMessages) => [...prevMessages, modelMessage]);

    } catch (e: any) {
      const errorMessage = e.message || "An error occurred while fetching the response.";
      console.error(e);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg, index) => (
          <ChatBubble key={index} role={msg.role} text={msg.text} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-gray-700 rounded-lg p-3 max-w-xs md:max-w-2xl">
              <LoadingIndicator />
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-500/20 text-red-300 rounded-lg p-3 text-sm">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
