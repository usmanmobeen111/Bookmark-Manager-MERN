import express from 'express';
import {
  getBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark
} from '../controllers/bookmarksController.js';

const router = express.Router();

// GET /api/bookmarks - Get all bookmarks
router.get('/', getBookmarks);

// GET /api/bookmarks/:id - Get single bookmark
router.get('/:id', getBookmark);

// POST /api/bookmarks - Create new bookmark
router.post('/', createBookmark);

// PUT /api/bookmarks/:id - Update bookmark
router.put('/:id', updateBookmark);

// DELETE /api/bookmarks/:id - Delete bookmark
router.delete('/:id', deleteBookmark);

export default router;
