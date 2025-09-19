import { useState } from 'react';
import { FaPlus, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { createBookmark } from '../api/bookmarks';

const formVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const commonTags = [
  'work', 'personal', 'reading', 'development', 'design', 'tutorial',
  'blog', 'news', 'social', 'entertainment', 'shopping', 'finance'
];

const BookmarkForm = ({ onBookmarkAdded }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [selectedCommonTags, setSelectedCommonTags] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCommonTagClick = (tag) => {
    if (selectedCommonTags.includes(tag)) {
      setSelectedCommonTags(selectedCommonTags.filter(t => t !== tag));
    } else {
      setSelectedCommonTags([...selectedCommonTags, tag]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !url) {
      setError('Title and URL are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const allTags = [...selectedCommonTags, ...tags.split(',').map(tag => tag.trim()).filter(tag => tag)];
      const newBookmark = await createBookmark({
        title,
        url,
        description,
        tags: allTags
      });
      onBookmarkAdded(newBookmark);
      setTitle('');
      setUrl('');
      setDescription('');
      setTags('');
      setSelectedCommonTags([]);
    } catch {
      setError('Failed to add bookmark');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-xl mx-auto shadow-2xl border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Bookmark</h2>
        <button
          type="button"
          onClick={() => onBookmarkAdded(null)}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
          aria-label="Close form"
        >
          <FaTimes />
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-1">Title *</label>
        <input
          id="title"
          type="text"
          className="w-full rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="url" className="block text-gray-700 dark:text-gray-300 mb-1">URL *</label>
        <input
          id="url"
          type="url"
          className="w-full rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 mb-1">Description</label>
        <textarea
          id="description"
          className="w-full rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="mb-6 relative">
        <label htmlFor="tags" className="block text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full text-left rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 flex justify-between items-center"
          >
            Select common tags
            <FaChevronDown />
          </button>
          {showDropdown && (
            <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
              {commonTags.map((tag) => (
                <li
                  key={tag}
                  onClick={() => handleCommonTagClick(tag)}
                  className={`cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedCommonTags.includes(tag) ? 'bg-pink-600 text-white' : 'text-gray-800 dark:text-white'
                  }`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          id="tags"
          type="text"
          className="w-full rounded-md px-3 py-2 mt-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="e.g. work, personal, reading"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
      {loading ? 'Saving...' : (
        <>
          <FaPlus /> Add Bookmark
        </>
      )}
      </button>
    </motion.form>
  );
};

export default BookmarkForm;
