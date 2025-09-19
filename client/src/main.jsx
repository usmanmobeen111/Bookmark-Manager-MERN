
import { createRoot } from 'react-dom/client'
import './index.css'

import Dashboard from './pages/Dashboard.jsx'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
)
