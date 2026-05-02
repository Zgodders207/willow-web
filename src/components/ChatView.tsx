// src/components/ChatView.tsx
import React, { useState, useRef, useEffect } from 'react';
import useConversation from '../store/useConversation';

const MessageBubble: React.FC<{ message: { text: string; sender: 'user' | 'ai' } }> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-sm ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

const ChatView: React.FC = () => {
  const { messages, isLoading, sendMessage } = useConversation();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <MessageBubble message={{ text: '...', sender: 'ai' }} />}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow bg-gray-800 rounded-lg px-4 py-2 focus:outline-none"
          placeholder="Start typing..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 rounded-lg px-6 py-2 ml-4 hover:bg-blue-700 disabled:bg-gray-600"
          disabled={isLoading || !inputText.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatView;
