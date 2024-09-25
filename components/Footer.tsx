import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-200 dark:bg-gray-800 p-6 flex flex-col items-center justify-center text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Gemini Flight Manager. Made by: Wilfredo Aaron Sosa Ramos.
      </p>
      <div className="flex space-x-4 mt-2">
        <a href="#home" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</a>
        <a href="#assistant" className="hover:text-gray-900 dark:hover:text-white transition-colors">Assistant</a>
        <a href="#contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
