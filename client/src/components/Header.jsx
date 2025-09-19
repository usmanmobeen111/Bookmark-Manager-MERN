import { FaBookmark, FaGithub, FaHeart, FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-gray-800 dark:bg-gray-200 p-3 rounded-xl shadow-lg"
            >
              <FaBookmark className="text-white dark:text-gray-800 text-xl" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                BookmarkHub
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your digital bookmark collection</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
            </motion.button>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaGithub className="text-xl" />
            </motion.a>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3, type: 'spring' }}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full"
            >
              <span className="text-sm">Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaHeart className="text-red-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
