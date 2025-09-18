import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
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

const BookmarkForm = ({ onBookmarkAdded }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !url) {
      setError('Title and URL are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const newBookmark = await createBookmark({
        title,
        url,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      });
      onBookmarkAdded(newBookmark);
      setTitle('');
      setUrl('');
      setDescription('');
      setTags('');
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
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-md rounded-xl p-6 max-w-xl mx-auto shadow-2xl border border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Add New Bookmark</h2>
        <button
          type="button"
          onClick={() => onBookmarkAdded(null)}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close form"
        >
          <FaTimes />
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-300 mb-1">Title *</label>
        <input
          id="title"
          type="text"
          className="w-full rounded-md px-3 py-2 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="url" className="block text-gray-300 mb-1">URL *</label>
        <input
          id="url"
          type="url"
          className="w-full rounded-md px-3 py-2 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-300 mb-1">Description</label>
        <textarea
          id="description"
          className="w-full rounded-md px-3 py-2 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="tags" className="block text-gray-300 mb-1">Tags (comma separated)</label>
        <input
          id="tags"
          type="text"
          className="w-full rounded-md px-3 py-2 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="e.g. work, personal, reading"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
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
