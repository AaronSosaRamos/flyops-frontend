import React, { useState } from 'react';
import { FaHome, FaRobot, FaEnvelope, FaMoon, FaSun, FaPlane, FaBars } from 'react-icons/fa';
import { Switch } from '@headlessui/react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-blue-500 text-white py-4 px-8 flex justify-between items-center dark:bg-gray-900">
      <h1 className="text-2xl font-bold flex items-center space-x-2">
        <FaPlane className="text-white" />
        <span>Gemini Flight Manager</span>
      </h1>
      <div className="hidden md:flex space-x-6 text-lg">
        <ul className="flex space-x-6">
          <li className="hover:text-gray-200 transition-colors duration-300">
            <a href="#home" className="flex items-center space-x-2">
              <FaHome /> <span>Home</span>
            </a>
          </li>
          <li className="hover:text-gray-200 transition-colors duration-300">
            <a href="#assistant" className="flex items-center space-x-2">
              <FaRobot /> <span>Assistant</span>
            </a>
          </li>
          <li className="hover:text-gray-200 transition-colors duration-300">
            <a href="#contact" className="flex items-center space-x-2">
              <FaEnvelope /> <span>Contact Us</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        <FaSun className={`text-2xl ${isDarkMode ? 'hidden' : 'block'} animate-spin-slow`} />
        <FaMoon className={`text-2xl ${!isDarkMode ? 'hidden' : 'block'} animate-spin-slow`} />
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className={`${
            isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out`}
        >
          <span
            className={`${
              isDarkMode ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`}
          />
        </Switch>
      </div>

      <button onClick={toggleMenu} className="md:hidden text-2xl focus:outline-none">
        <FaBars />
      </button>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-500 text-white flex flex-col items-center space-y-4 py-4 md:hidden dark:bg-gray-900">
          <a href="#home" className="flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300">
            <FaHome /> <span>Home</span>
          </a>
          <a href="#assistant" className="flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300">
            <FaRobot /> <span>Assistant</span>
          </a>
          <a href="#contact" className="flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300">
            <FaEnvelope /> <span>Contact Us</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
