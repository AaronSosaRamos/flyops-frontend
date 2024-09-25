import React from 'react';
import { FaPlane, FaHeart, FaCode } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-blue-100 dark:bg-gray-800 p-8 flex flex-col items-center justify-center text-gray-900 dark:text-gray-300 transition-colors duration-500">
      <div className="flex space-x-3 mb-4 text-blue-500 dark:text-blue-400">
        <FaPlane className="text-2xl hover:text-blue-600 dark:hover:text-blue-300 transition duration-300 ease-in-out transform hover:scale-110" />
        <FaHeart className="text-2xl hover:text-red-500 dark:hover:text-red-400 transition duration-300 ease-in-out transform hover:scale-110" />
        <FaCode className="text-2xl hover:text-green-500 dark:hover:text-green-400 transition duration-300 ease-in-out transform hover:scale-110" />
      </div>
      <p className="text-md text-center">
        &copy; {new Date().getFullYear()} <span className="font-semibold">FlyOps</span>. Made with <FaHeart className="inline text-red-500 dark:text-red-400" /> by Wilfredo Aaron Sosa Ramos.
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">
        Empowering your flights. Smooth and efficient, every time. ✈️
      </p>
    </footer>
  );
};

export default Footer;
