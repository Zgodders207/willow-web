// src/components/ChatView.tsx
import React, { useState, useRef, useEffect } from 'react';
import useConversation from '../store/useConversation';
import useCheckIn from '../store/useCheckIn';

const MessageBubble: React.FC<{ message: { text: string; sender: 'user' | 'ai' } }> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-4 py-3 rounded-lg max-w-md break-words ${isUser ? 'bg-primary text-background' : 'bg-surface text-on-surface'}`}>
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

const ChatView: React.FC = () => {
  const { messages, isLoading, sendMessage } = useConversation();
  const { mood, sleep } = useCheckIn();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // A slight delay to allow the DOM to update before scrolling
    setTimeout(scrollToBottom, 100);
  }, [messages, isLoading]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText.trim(), mood, sleep);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-on-background">
      <header className="bg-surface p-4 text-center shadow-md">
        <h1 className="text-xl font-bold text-primary">MindBridge</h1>
      </header>

      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <MessageBubble message={{ text: '...', sender: 'ai' }} />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-surface">
        <div className="flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            className="flex-grow bg-background rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Start typing..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className="bg-primary text-background font-bold rounded-lg px-6 py-3 ml-4 hover:bg-primary/90 transition-colors disabled:bg-gray-600"
            disabled={isLoading || !inputText.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;

