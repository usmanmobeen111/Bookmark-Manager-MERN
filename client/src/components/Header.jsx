import { FaBookmark, FaGithub, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '../styles/animations';

const Header = () => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 shadow-2xl"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-4 rounded-2xl shadow-xl border border-emerald-400/30"
            >
              <FaBookmark className="text-white text-2xl" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-lg">
                BookmarkHub
              </h1>
              <p className="text-slate-300 text-sm">Your digital bookmark collection</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-white/90 hover:text-white transition-colors duration-300 p-3 rounded-xl hover:bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <FaGithub className="text-xl" />
            </motion.a>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3, type: 'spring' }}
              className="flex items-center space-x-2 text-white/90 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
            >
              <span className="text-sm font-medium">Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaHeart className="text-red-300" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
