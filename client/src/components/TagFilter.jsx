import { FaFilter, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { tagVariants, buttonVariants } from '../styles/animations';

const TagFilter = ({ tags, selectedTag, onTagSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700/50 relative overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-bl-full -z-10"></div>
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 rounded-lg">
          <FaFilter className="text-white" />
        </div>
        <span className="text-slate-300 font-semibold text-lg">Filter by Tag</span>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        <motion.button
          onClick={() => onTagSelect('')}
          variants={tagVariants}
          whileHover="hover"
          whileTap="tap"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
            selectedTag === ''
              ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-xl border border-emerald-500/30'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600/50'
          }`}
        >
          All
        </motion.button>

        {tags.map((tag) => (
          <motion.button
            key={tag}
            onClick={() => onTagSelect(selectedTag === tag ? '' : tag)}
            variants={tagVariants}
            whileHover="hover"
            whileTap="tap"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
              selectedTag === tag
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-xl border border-emerald-500/30'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600/50'
            }`}
          >
            {tag}
            {selectedTag === tag && <FaTimes className="text-xs" />}
          </motion.button>
        ))}
      </div>

      {tags.length === 0 && (
        <p className="text-slate-400 text-sm mt-4 italic">No tags available</p>
      )}
    </motion.div>
  );
};

export default TagFilter;
