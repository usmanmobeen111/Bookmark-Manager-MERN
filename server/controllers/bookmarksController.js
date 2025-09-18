import Bookmark from '../models/Bookmark.js';

// Get all bookmarks
export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find().sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single bookmark
export const getBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create bookmark
export const createBookmark = async (req, res) => {
  const bookmark = new Bookmark({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
    tags: req.body.tags || []
  });

  try {
    const newBookmark = await bookmark.save();
    res.status(201).json(newBookmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update bookmark
export const updateBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    bookmark.title = req.body.title || bookmark.title;
    bookmark.url = req.body.url || bookmark.url;
    bookmark.description = req.body.description || bookmark.description;
    bookmark.tags = req.body.tags || bookmark.tags;

    const updatedBookmark = await bookmark.save();
    res.json(updatedBookmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete bookmark
export const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    await bookmark.deleteOne();
    res.json({ message: 'Bookmark deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
