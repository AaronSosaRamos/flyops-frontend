import React from 'react';
import { FaPlane, FaArrowRight, FaRobot, FaUserAlt, FaSearch, FaRocket } from 'react-icons/fa';

const MainScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-900 transition-all duration-500 ease-in-out dark:bg-gradient-to-b dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white">
      
      <div className="absolute inset-0 flex justify-center items-center">
        <FaRocket className="text-[400px] text-yellow-500 opacity-10" />
      </div>

      <header className="w-full text-center py-10 z-10">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            Welcome to FlyOps! 🚀
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          <FaPlane className="inline text-blue-500" /> Fly to new heights, efficiently!
        </p>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 z-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center space-y-4 text-center">
            <FaRobot className="text-5xl text-yellow-500" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">FlyOps Assistant</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your virtual co-pilot for seamless flight management. 🛫
            </p>
            <button
              className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full shadow-md transition-transform duration-300 transform hover:scale-105 dark:bg-yellow-400 dark:hover:bg-yellow-500"
            >
              Get Assistance <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center space-y-4 text-center">
            <FaUserAlt className="text-5xl text-pink-500" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">FlyOps Analyst</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Analyzing your flights to optimize routes and save costs. 📊
            </p>
            <button
              className="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-md transition-transform duration-300 transform hover:scale-105 dark:bg-pink-400 dark:hover:bg-pink-500"
            >
              Analyze Flights <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center space-y-4 text-center">
            <FaSearch className="text-5xl text-green-500" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">FlyOps Researcher</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discovering insights and innovations in flight data. 🔍
            </p>
            <button
              className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-md transition-transform duration-300 transform hover:scale-105 dark:bg-green-400 dark:hover:bg-green-500"
            >
              Research Data <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-16 text-center py-6 text-gray-600 dark:text-gray-400 z-10">
        <p>
          <FaPlane className="inline text-blue-500" /> Connecting the world, one flight at a time.
        </p>
      </footer>
    </div>
  );
};

export default MainScreen;
