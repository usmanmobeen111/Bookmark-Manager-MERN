# 📚 BookmarkHub - MERN Bookmark Manager

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<br />

<div align="center">
  <h3>✨ Organize your favorite websites with style and ease ✨</h3>
  <p>A modern, beautiful bookmark manager built with the MERN stack featuring smooth animations and responsive design.</p>
</div>

## 🌟 Features

- 🎨 **Modern UI**: Beautiful gradient backgrounds and smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🏷️ **Tag System**: Organize bookmarks with custom tags
- 🔍 **Smart Filtering**: Filter bookmarks by tags instantly
- ⚡ **Real-time Updates**: Add, edit, and delete bookmarks seamlessly
- 🎭 **Smooth Animations**: Powered by Framer Motion for delightful interactions
- 🌈 **Gradient Themes**: Eye-catching gradients without being overwhelming
- 📝 **Rich Descriptions**: Add detailed descriptions to your bookmarks
- 🔗 **Direct Links**: One-click access to your saved websites

## 🚀 Tech Stack

### Frontend
- ⚛️ **React** - Component-based UI library
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **Framer Motion** - Animation library for React
- 🔄 **React Icons** - Beautiful icons for the interface

### Backend
- 🟢 **Node.js** - JavaScript runtime
- 🚂 **Express.js** - Web application framework
- 🍃 **MongoDB** - NoSQL database
- 🔗 **Mongoose** - MongoDB object modeling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- 🟢 **Node.js** (v16 or higher)
- 🍃 **MongoDB** (local or cloud instance)
- 📦 **pnpm** (recommended) or npm

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/bookmarkhub.git
cd bookmarkhub
```

### 2. Install Server Dependencies
```bash
cd server
pnpm install
```

### 3. Install Client Dependencies
```bash
cd ../client
pnpm install
```

### 4. Environment Setup

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookmarkhub
NODE_ENV=development
```

### 5. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For local MongoDB
mongod

# Or use MongoDB Compass for GUI management
```

## 🎯 Usage

### Development Mode

1. **Start the Backend Server:**
```bash
cd server
pnpm run dev
```

2. **Start the Frontend (in a new terminal):**
```bash
cd client
pnpm run dev
```

3. **Open your browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Production Build

1. **Build the Frontend:**
```bash
cd client
pnpm run build
```

2. **Start the Production Server:**
```bash
cd server
pnpm start
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookmarks` | Get all bookmarks |
| POST | `/api/bookmarks` | Create a new bookmark |
| PUT | `/api/bookmarks/:id` | Update a bookmark |
| DELETE | `/api/bookmarks/:id` | Delete a bookmark |

### Sample API Usage

```javascript
// Get all bookmarks
GET /api/bookmarks

// Create a new bookmark
POST /api/bookmarks
{
  "title": "React Documentation",
  "url": "https://reactjs.org",
  "description": "Official React documentation",
  "tags": ["react", "documentation", "frontend"]
}
```

## 🎨 Screenshots

<div align="center">
  <img src="./screenshots/dashboard.png" alt="Dashboard View" width="80%" />
  <p><em>Main Dashboard with Gradient Background</em></p>

  <img src="./screenshots/add-bookmark.png" alt="Add Bookmark Form" width="80%" />
  <p><em>Add Bookmark Form with Animations</em></p>

  <img src="./screenshots/mobile-view.png" alt="Mobile View" width="40%" />
  <p><em>Responsive Mobile Design</em></p>
</div>

## 📁 Project Structure

```
bookmarkhub/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── BookmarkForm.jsx
│   │   │   ├── BookmarkList.jsx
│   │   │   └── TagFilter.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── api/
│   │   │   └── bookmarks.js
│   │   └── main.jsx
│   ├── index.css
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/
│   │   └── bookmarksController.js
│   ├── models/
│   │   └── Bookmark.js
│   ├── routes/
│   │   └── bookmarks.js
│   ├── config/
│   │   └── db.js
│   ├── index.js
│   └── package.json
├── README.md
└── TODO.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- 🎨 **Tailwind CSS** for the amazing utility-first CSS framework
- 🎭 **Framer Motion** for smooth animations
- ⚛️ **React** for the powerful component system
- 🟢 **Node.js** community for the robust backend ecosystem

## 📞 Contact

<div align="center">
  <p>Built with ❤️ by <strong>Your Name</strong></p>
  <p>
    <a href="https://github.com/your-username">GitHub</a> •
    <a href="https://linkedin.com/in/your-profile">LinkedIn</a> •
    <a href="mailto:your.email@example.com">Email</a>
  </p>
</div>

---

<div align="center">
  <p><strong>⭐ Star this repo if you found it helpful!</strong></p>
  <p>Happy bookmarking! 🎉</p>
</div>
