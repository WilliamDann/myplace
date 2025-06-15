import { Route, Routes } from 'react-router-dom';
import AppNav from './components/AppNav';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Account from './components/Account';
import AccountForm from './components/AccountForm';

function App() {
  return (
    <>
      <AppNav />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

      <Route path='/account'>
        <Route path='create' element={<AccountForm />}></Route>
        <Route path='read/:account_id' element={<Account />}>

        </Route>
      </Route>

        <Route path="/item" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </> 
  )
}

export default App
