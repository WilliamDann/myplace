import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Editor from './pages/Editor.jsx'
import NotFound from './pages/NotFound.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'

// Import our custom CSS
import './style.scss'
import PlaceSelect from './components/PlaceSelect.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='*' element={<NotFound />} />

      <Route path='/' element={<App />} />
      <Route path='/place/' element={<PlaceSelect />} />

      <Route path='/place/:place_id' element={<Editor />}>
        <Route index element={<Dashboard />} />
      
      </Route>

    </Routes>
  </BrowserRouter>,
)
