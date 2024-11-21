import axiosInstance from '@/utils/axiosInstance';
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { FaPaperPlane, FaRocket } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

const ChatBotScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! I’m **FlyBot**, your virtual assistant. How can I assist you with your flights today? ✈️' },
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newUserMessage: Message = { sender: 'user', text: input };
      setMessages((prev) => [...prev, newUserMessage]);
      setInput('');
      setIsTyping(true);

      try {
        const response = await axiosInstance.post('/flyops-assistant', {
          query: input,
        });

        const botReply: Message = {
          sender: 'bot',
          text: response.data || 'Sorry, I couldn’t process your request. Please try again. 🌍',
        };

        setMessages((prev) => [...prev, botReply]);
      } catch (error) {
        const errorReply: Message = {
          sender: 'bot',
          text: 'An error occurred while processing your request. Please try again later. ⚠️',
        };

        setMessages((prev) => [...prev, errorReply]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isTyping) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between mt-[60px] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-all duration-500">
      <header className="w-full text-center py-4">
        <h1 className="text-3xl sm:text-4xl font-bold flex items-center justify-center text-blue-600 dark:text-blue-400">
          <FaRocket className="mr-2" /> FlyOps Assistant
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Helping you manage your flights efficiently.
        </p>
      </header>
      <div className="flex flex-col w-full max-w-3xl bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden h-96 flex-grow">
        <div
          ref={chatBoxRef}
          className="flex-1 p-4 overflow-y-auto scroll-smooth"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'} mb-4`}
            >
              <div
                className={`w-auto max-w-[75%] break-words px-4 py-3 rounded-lg shadow ${
                  message.sender === 'bot'
                    ? 'bg-blue-100 text-gray-800 dark:bg-blue-700 dark:text-white'
                    : 'bg-green-100 text-gray-800 dark:bg-green-700 dark:text-white'
                }`}
              >
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-blue-100 dark:bg-blue-700 text-gray-800 dark:text-white rounded-lg px-4 py-3">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-800 dark:bg-white rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-800 dark:bg-white rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-800 dark:bg-white rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center w-full max-w-3xl bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-4">
        <input
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg px-4 py-2 focus:outline-none transition-all duration-300"
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
        />
        <button
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none flex items-center"
          onClick={handleSendMessage}
          disabled={isTyping}
        >
          Send <FaPaperPlane className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ChatBotScreen;
