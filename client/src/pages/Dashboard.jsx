import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import BookmarkForm from '../components/BookmarkForm';
import BookmarkList from '../components/BookmarkList';
import TagFilter from '../components/TagFilter';
import { getBookmarks } from '../api/bookmarks';

const Dashboard = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      setFilteredBookmarks(bookmarks.filter(bookmark =>
        bookmark.tags.includes(selectedTag)
      ));
    } else {
      setFilteredBookmarks(bookmarks);
    }
  }, [bookmarks, selectedTag]);

  const fetchBookmarks = async () => {
    try {
      const data = await getBookmarks();
      setBookmarks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      setLoading(false);
    }
  };

  const handleBookmarkAdded = (newBookmark) => {
    setBookmarks([newBookmark, ...bookmarks]);
    setShowForm(false);
  };

  const handleBookmarkUpdated = (updatedBookmark) => {
    setBookmarks(bookmarks.map(bookmark =>
      bookmark._id === updatedBookmark._id ? updatedBookmark : bookmark
    ));
  };

  const handleBookmarkDeleted = (deletedId) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark._id !== deletedId));
  };

  const allTags = [...new Set(bookmarks.flatMap(bookmark => bookmark.tags))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white pb-10">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6"
          >
            Bookmark Manager
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Organize your favorite websites with style and ease
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8 sm:mb-12"
        >
          <div className="flex-1">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              onTagSelect={setSelectedTag}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            {showForm ? 'Cancel' : 'Add Bookmark'}
          </motion.button>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <BookmarkForm
              onBookmarkAdded={handleBookmarkAdded}
              onClose={() => setShowForm(false)}
            />
          </motion.div>
        )}

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
            <p className="text-slate-600 mt-6 text-lg">Loading bookmarks...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BookmarkList
              bookmarks={filteredBookmarks}
              onBookmarkUpdated={handleBookmarkUpdated}
              onBookmarkDeleted={handleBookmarkDeleted}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
