import { Route, Routes }  from 'react-router-dom';
import AppNav             from './components/AppNav';
import Home               from './pages/Home';
import Dashboard          from './pages/Dashboard';
import NotFound           from './pages/NotFound';
import AccountRoutes      from './components/Account/Route';

function App() {
  return (
    <>
      <AppNav />
      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {AccountRoutes()}

        <Route path="/item" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </> 
  )
}

export default App
