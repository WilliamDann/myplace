import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

// Import our custom CSS
import './style.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
