import { Route, Routes } from 'react-router-dom';
import AppNav from './components/AppNav';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Account from './components/Account';

function App() {
  return (
    <>
      <AppNav />
      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

      <Route path='/account'>
        <Route index element={<Account initalMode='read' />} />
        <Route path='read/:account_id' element={<Account initalMode='read'/>} />

        <Route path='create' element={<Account initalMode='create' />} />

        <Route path='./update/:account_id' element={<Account initalMode='update' />} />
        <Route path='./delete/:account_id' element={<Account initalMode='delete' />} />

        <Route path='./login' element={<Account initalMode='login' />} />
      </Route>

        <Route path="/item" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </> 
  )
}

export default App
