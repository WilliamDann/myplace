import { Route, Router } from 'react-router-dom';
import AppNav from './components/Navbar';
import './App.css'

function App() {
  return (
    <>
    <Router>
      <Route path="/"></Route>
      <Route path="/account"></Route>
      <Route path="/item"></Route>
      <Route path="/place"></Route>

    </Router>
      <AppNav />
    </>
  )
}

export default App
