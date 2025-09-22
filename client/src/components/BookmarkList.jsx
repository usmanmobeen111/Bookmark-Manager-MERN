import { useState } from 'react';
import { FaEdit, FaTrash, FaExternalLinkAlt, FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { deleteBookmark } from '../api/bookmarks';
import { listVariants, listItemVariants, fadeIn } from '../styles/animations';

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16"
      >
        <div className="text-8xl mb-6">📚</div>
        <h3 className="text-2xl font-bold text-white mb-3">No bookmarks yet</h3>
        <p className="text-slate-300 text-lg">Start by adding your first bookmark!</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {bookmarks.map((bookmark, index) => (
          <motion.div
            variants={listItemVariants}
            key={bookmark._id}
            custom={index}
            whileHover="hover"
          className="bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700/50 h-full flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-bl-full -z-10"></div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight">
                {bookmark.title}
              </h3>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 mb-3 break-all font-medium transition-colors duration-200"
              >
                <FaExternalLinkAlt className="text-xs" />
                Visit Link
              </a>
            </div>
            <div className="flex gap-2 ml-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onBookmarkUpdated(bookmark)}
                className="text-slate-400 hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                aria-label="Edit bookmark"
              >
                <FaEdit />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDelete(bookmark._id)}
                disabled={deletingId === bookmark._id}
                className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                aria-label="Delete bookmark"
              >
                <FaTrash />
              </motion.button>
            </div>
          </div>

          {bookmark.description && (
            <p className="text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
              {bookmark.description}
            </p>
          )}

          {bookmark.tags && bookmark.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {bookmark.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: tagIndex * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md"
                >
                  <FaTag className="text-xs" />
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          <div className="text-xs text-slate-400 border-t border-slate-700/50 pt-3 mt-auto">
            Added {formatDate(bookmark.createdAt)}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BookmarkList;
