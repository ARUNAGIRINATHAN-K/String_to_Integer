import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType, Sender } from './types';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { getFactualAnswer } from './services/geminiService';
import { TrashIcon } from './components/icons';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const initialMessage: ChatMessageType = {
    id: 'initial-bot-message',
    text: "Hello! I'm WikiBot. I can answer your factual questions by finding and summarizing information from the web. What would you like to know?",
    sender: Sender.Bot,
  };

  useEffect(() => {
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      text,
      sender: Sender.User,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const { answer, sources } = await getFactualAnswer(text);

    const botMessage: ChatMessageType = {
      id: `bot-${Date.now()}`,
      text: answer,
      sender: Sender.Bot,
      sources: sources,
    };
    
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history? This action cannot be undone.')) {
      setMessages([initialMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="p-4 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-center text-gray-200">WikiBot AI</h1>
          <button
            onClick={handleClearChat}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            aria-label="Clear chat history"
            title="Clear chat history"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
             <div className="flex items-start gap-4 my-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500">
                    <div className="w-6 h-6 text-white animate-pulse">. . .</div>
                </div>
                <div className="max-w-xl w-full px-5 py-4 rounded-2xl bg-gray-800 text-gray-400">
                    Thinking...
                </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>
      <footer className="sticky bottom-0">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
      </footer>
    </div>
  );
};

export default App;
