import React, { useState, ChangeEvent } from 'react';
import { FaPaperPlane, FaFileUpload, FaRocket } from 'react-icons/fa';

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I’m FlyBot, your virtual assistant. How can I assist you with your flights today? ✈️' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFilePickerVisible, setFilePickerVisible] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      setIsTyping(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Your request has been processed. How else can I help you? 🌍' },
      ]);
      setIsTyping(false);
    }
  };

  const toggleFilePicker = () => {
    setFilePickerVisible(!isFilePickerVisible);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMessages([...messages, { sender: 'user', text: `File Uploaded: ${file.name}` }]);
      setFilePickerVisible(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-indigo-100 via-pink-100 to-yellow-100 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-850 dark:to-black text-gray-900 dark:text-gray-200 flex flex-col items-center justify-between transition-all duration-500 ease-in-out">
      
      <header className="w-full text-center py-4 z-10">
        <h1 className="text-3xl font-bold flex items-center justify-center sm:text-4xl md:text-5xl">
          <FaRocket className="text-yellow-500 mr-2 animate-bounce" /> FlyOps Assistant
        </h1>
        <p className="text-md sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Let me help you manage your flights efficiently.
        </p>
      </header>

      <div className="flex flex-col w-full max-w-3xl bg-gradient-to-br from-white via-purple-100 to-blue-50 dark:from-gray-800 dark:via-gray-850 dark:to-black shadow-lg rounded-lg overflow-hidden h-96 flex-grow z-10 transition-transform duration-500">
        <div className="flex-1 p-2 sm:p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'} mb-2 animate-fadeInUp`}
            >
              <div
                className={`max-w-[80%] sm:max-w-xs px-3 py-2 sm:px-4 sm:py-3 rounded-tl-none rounded-3xl ${
                  message.sender === 'bot'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white dark:bg-gradient-to-r dark:from-blue-500 dark:to-blue-700'
                    : 'bg-gradient-to-r from-pink-400 to-pink-600 text-white dark:bg-gradient-to-r dark:from-yellow-600 dark:to-yellow-800'
                } shadow-md transition-transform duration-300 transform hover:scale-105`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-2">
              <div className="max-w-[80%] sm:max-w-xs px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white dark:bg-gradient-to-r dark:from-blue-500 dark:to-blue-700 rounded-tl-none rounded-3xl shadow-md transition-transform duration-300 transform hover:scale-105">
                <span className="dot-pulse">• • •</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center w-full max-w-3xl bg-gradient-to-r from-indigo-100 via-pink-200 to-yellow-200 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 p-2 sm:p-3 rounded-lg shadow-md mt-4 z-20 relative">
        
        <div className="relative flex items-center">
          <button
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl focus:outline-none transition-all duration-300 shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
            onClick={toggleFilePicker}
          >
            <FaFileUpload />
          </button>

          {isFilePickerVisible && (
            <div className="ml-2">
              <label className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-4 py-2 transition-transform duration-300 transform hover:scale-105 cursor-pointer">
                Add File
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          )}
        </div>

        <input
          className="flex-1 bg-pink-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2 mx-2 sm:mx-3 focus:outline-none transition-colors duration-300"
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping} 
        />

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 sm:px-4 py-2 sm:py-2 transition-transform duration-300 transform hover:scale-105 focus:outline-none flex items-center"
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
