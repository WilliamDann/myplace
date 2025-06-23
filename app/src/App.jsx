import { Route, Routes }  from 'react-router-dom';
import Home               from './pages/Home'
import Dashboard          from './pages/Dashboard';
import NotFound           from './pages/NotFound';
import AccountRoutes      from './components/Account/Route';
import PlaceRoutes        from './components/Place/Route';
import ItemRoutes         from './components/Items/Route';
import Layout from './Layout';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {AccountRoutes()}
          {PlaceRoutes()}
          {ItemRoutes()}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  )
}

export default App
