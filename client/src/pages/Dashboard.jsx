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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            Bookmark Manager
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Organize your favorite websites with style and ease
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              onTagSelect={setSelectedTag}
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {showForm ? 'Cancel' : 'Add Bookmark'}
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <BookmarkForm onBookmarkAdded={handleBookmarkAdded} />
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
            <p className="text-gray-600 dark:text-gray-300 mt-4">Loading bookmarks...</p>
          </div>
        ) : (
          <BookmarkList
            bookmarks={filteredBookmarks}
            onBookmarkUpdated={handleBookmarkUpdated}
            onBookmarkDeleted={handleBookmarkDeleted}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
