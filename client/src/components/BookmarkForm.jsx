// BookmarkForm.jsx
import { useState, useCallback } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { createBookmark } from '../api/bookmarks';
import { formVariants, formItemVariants } from '../styles/animations';

const commonTags = [
  'work', 'personal', 'reading', 'development', 'design', 'tutorial',
  'blog', 'news', 'social', 'entertainment', 'shopping', 'finance'
];

const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const BookmarkForm = ({ onBookmarkAdded, onClose }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCommonTags, setSelectedCommonTags] = useState([]);
  const [customTags, setCustomTags] = useState([]); // chips
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCommonTagClick = (tag) => {
    setSelectedCommonTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !customTags.includes(newTag)) {
        setCustomTags([...customTags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeCustomTag = (tag) => {
    setCustomTags(customTags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !url) {
      setError('Title and URL are required');
      return;
    }
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const allTags = [...selectedCommonTags, ...customTags];
      const newBookmark = await createBookmark({
        title,
        url,
        description,
        tags: allTags
      });
      onBookmarkAdded(newBookmark);
      // Reset form
      setTitle('');
      setUrl('');
      setDescription('');
      setSelectedCommonTags([]);
      setCustomTags([]);
      setTagInput('');
      setError('');
    } catch (error) {
      console.error('Error creating bookmark:', error);
      setError('Failed to add bookmark. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={handleSubmit}
      className="bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl border border-slate-700/50 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-bl-full -z-10"></div>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Add New Bookmark</h2>
        <motion.button
          type="button"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500/50"
          aria-label="Close form"
        >
          <FaTimes className="text-xl" />
        </motion.button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-red-400 mb-4 bg-red-900/30 p-3 rounded-lg border border-red-800/50"
        >
          {error}
        </motion.div>
      )}

      <motion.div className="mb-6" variants={formItemVariants}>
        <label htmlFor="title" className="block text-slate-300 font-semibold mb-2">Title *</label>
        <motion.input
          variants={formItemVariants}
          id="title"
          type="text"
          aria-invalid={!!error && !title}
          className="w-full rounded-xl px-4 py-3 bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-slate-700 border border-slate-600/50 transition-all duration-200"
          placeholder="Bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </motion.div>

      <motion.div className="mb-6" variants={formItemVariants}>
        <label htmlFor="url" className="block text-slate-300 font-semibold mb-2">URL *</label>
        <motion.input
          variants={formItemVariants}
          id="url"
          type="url"
          aria-invalid={!!error && !isValidUrl(url)}
          className="w-full rounded-xl px-4 py-3 bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-slate-700 border border-slate-600/50 transition-all duration-200"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </motion.div>

      <motion.div className="mb-6" variants={formItemVariants}>
        <label htmlFor="description" className="block text-slate-300 font-semibold mb-2">Description</label>
        <motion.textarea
          variants={formItemVariants}
          id="description"
          className="w-full rounded-xl px-4 py-3 bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-slate-700 border border-slate-600/50 transition-all duration-200 resize-none"
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </motion.div>

      <div className="mb-8">
        <label className="block text-slate-300 font-semibold mb-3">Tags</label>

        {/* Common Tags */}
        <div className="mb-4">
          <p className="text-sm text-slate-400 mb-3">Select common tags:</p>
          <div className="flex flex-wrap gap-2">
            {commonTags.map((tag) => (
              <motion.button
                key={tag}
                type="button"
                onClick={() => handleCommonTagClick(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                  selectedCommonTags.includes(tag)
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg border border-emerald-500/30'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600/50'
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom Tag Chips */}
        <motion.div variants={formItemVariants}>
          <p className="text-sm text-slate-400 mb-2">Add custom tags (press Enter or comma):</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {customTags.map((tag) => (
              <span
                key={tag}
                className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeCustomTag(tag)}
                  className="text-emerald-300 hover:text-emerald-100"
                  aria-label={`Remove ${tag}`}
                >
                  <FaTimes />
                </button>
              </span>
            ))}
          </div>
          <motion.input
            variants={formItemVariants}
            id="tags"
            type="text"
            className="w-full rounded-xl px-4 py-3 bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-slate-700 border border-slate-600/50 transition-all duration-200"
            placeholder="Type tag and press Enter"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
          />
        </motion.div>
      </div>

      <motion.button
        type="submit"
        disabled={loading || !title || !url}
        aria-busy={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            Saving...
          </>
        ) : (
          <>
            <FaPlus /> Add Bookmark
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default BookmarkForm;
