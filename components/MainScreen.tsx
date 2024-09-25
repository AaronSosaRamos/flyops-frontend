import React from 'react';
import { FaPlane, FaArrowRight } from 'react-icons/fa';
import { BsFillEmojiSunglassesFill } from 'react-icons/bs';

const MainScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300 ease-in-out bg-blue-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <main className="flex-1 flex flex-col justify-center items-center space-y-6">
        <h2 className="text-4xl font-semibold mb-5 animate-fadeIn">
          Welcome to <span className="text-blue-500">Gemini Flight Manager</span>! ✈️
        </h2>
        <p className="text-lg animate-bounce">
          🛫 Manage your flights with ease and efficiency 🛬
        </p>
        <p className="text-md mb-8 flex items-center space-x-3 animate-fadeIn delay-200">
          <BsFillEmojiSunglassesFill className="text-3xl text-yellow-400" /> 
          <span>Fly smart, manage smarter!</span>
        </p>

        <button
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg flex items-center space-x-2 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          <span>Get Started</span>
          <FaArrowRight />
        </button>
      </main>
    </div>
  );
};

export default MainScreen;
