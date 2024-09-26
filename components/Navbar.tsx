import React, { useState } from 'react';
import { FaHome, FaRobot, FaEnvelope, FaMoon, FaSun, FaPlane, FaBars, FaUserAlt, FaSearch } from 'react-icons/fa';

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
    <nav className="w-full bg-blue-500 text-white py-4 px-6 flex justify-between items-center dark:bg-gray-900 fixed top-0 left-0 z-50">
      <h1 className="text-2xl font-bold flex items-center space-x-2">
        <FaPlane className="text-white" />
        <span>FlyOps</span>
      </h1>

      <div className="hidden md:flex space-x-6 text-lg">
        <ul className="flex space-x-6">
          <li className="hover:text-gray-200 transition-colors duration-300">
            <a href="/" className="flex items-center space-x-2">
              <FaHome /> <span>Home</span>
            </a>
          </li>
          <li className="hover:text-gray-200 transition-colors duration-300">
            <a href="/assistant" className="flex items-center space-x-2">
              <FaRobot /> <span>Assistant</span>
            </a>
          </li>
          <li className="hover:text-gray-200 transition-colors duration-300">
            <a href="/analyst" className="flex items-center space-x-2">
              <FaUserAlt /> <span>Analyst</span>
            </a>
          </li>
          <li className="hover:text-gray-200 transition-colors duration-300">
            <a href="/researcher" className="flex items-center space-x-2">
              <FaSearch /> <span>Researcher</span>
            </a>
          </li>
          <li className="hover:text-gray-200 transition-colors duration-300">
            <a href="/contact" className="flex items-center space-x-2">
              <FaEnvelope /> <span>Contact Us</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-3 md:space-x-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-100 dark:bg-blue-600 rounded-lg text-xl focus:outline-none transition-all duration-300 shadow-md hover:bg-gray-300 dark:hover:bg-blue-700 flex items-center justify-center"
        >
          {isDarkMode ? <FaMoon className="text-white" /> : <FaSun className="text-yellow-400" />}
        </button>

        <button onClick={toggleMenu} className="md:hidden text-2xl focus:outline-none">
          <FaBars />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-500 text-white flex flex-col items-center space-y-4 py-4 md:hidden dark:bg-gray-900">
          <a href="/" className="flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300">
            <FaHome /> <span>Home</span>
          </a>
          <a href="/assistant" className="flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300">
            <FaRobot /> <span>Assistant</span>
          </a>
          <a href="/analyst" className="flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300">
            <FaUserAlt /> <span>Analyst</span>
          </a>
          <a href="/researcher" className="flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300">
            <FaSearch /> <span>Researcher</span>
          </a>
          <a href="/contact" className="flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300">
            <FaEnvelope /> <span>Contact Us</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
