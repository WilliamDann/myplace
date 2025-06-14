import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

// Import our custom CSS
import './style.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
