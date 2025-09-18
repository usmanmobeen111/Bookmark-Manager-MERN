import { FaFilter, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 4px 12px rgba(219, 39, 119, 0.6)',
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
};

const TagFilter = ({ tags, selectedTag, onTagSelect }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <FaFilter className="text-gray-400" />
        <span className="text-white font-medium">Filter by Tag</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <motion.button
          onClick={() => onTagSelect('')}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedTag === ''
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          All
        </motion.button>

        {tags.map((tag) => (
          <motion.button
            key={tag}
            onClick={() => onTagSelect(selectedTag === tag ? '' : tag)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
              selectedTag === tag
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tag}
            {selectedTag === tag && <FaTimes className="text-xs" />}
          </motion.button>
        ))}
      </div>

      {tags.length === 0 && (
        <p className="text-gray-500 text-sm mt-2">No tags available</p>
      )}
    </div>
  );
};

export default TagFilter;
