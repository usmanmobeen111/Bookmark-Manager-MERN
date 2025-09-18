import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import bookmarkRoutes from './routes/bookmarks.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookmarks', bookmarkRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Bookmark Manager API is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
