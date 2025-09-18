import { useState } from 'react';
import { FaEdit, FaTrash, FaExternalLinkAlt, FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { deleteBookmark } from '../api/bookmarks';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
  hover: { scale: 1.03, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' },
};

const BookmarkList = ({ bookmarks, onBookmarkUpdated, onBookmarkDeleted }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      setDeletingId(id);
      try {
        await deleteBookmark(id);
        onBookmarkDeleted(id);
      } catch (error) {
        console.error('Error deleting bookmark:', error);
        alert('Failed to delete bookmark');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (bookmarks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-white mb-2">No bookmarks yet</h3>
        <p className="text-gray-400">Start by adding your first bookmark!</p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((bookmark, index) => (
        <motion.div
          key={bookmark._id}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg p-6 shadow-lg border border-gray-700"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                {bookmark.title}
              </h3>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mb-2 break-all"
              >
                <FaExternalLinkAlt className="text-xs" />
                {bookmark.url}
              </a>
            </div>
            <div className="flex gap-2 ml-2">
              <button
                onClick={() => onBookmarkUpdated(bookmark)}
                className="text-gray-400 hover:text-blue-400 transition-colors p-1"
                aria-label="Edit bookmark"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(bookmark._id)}
                disabled={deletingId === bookmark._id}
                className="text-gray-400 hover:text-red-400 transition-colors p-1 disabled:opacity-50"
                aria-label="Delete bookmark"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          {bookmark.description && (
            <p className="text-gray-300 text-sm mb-3 line-clamp-3">
              {bookmark.description}
            </p>
          )}

          {bookmark.tags && bookmark.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {bookmark.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  <FaTag className="text-xs" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="text-xs text-gray-500">
            Added {formatDate(bookmark.createdAt)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BookmarkList;
