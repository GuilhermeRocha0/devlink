import { createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Private from './routes/Private'
import Admin from './pages/Admin/Admin'
import Networks from './pages/Networks/Networks'
import Error from './pages/Error/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: (
      <Private>
        <Admin />
      </Private>
    )
  },
  {
    path: '/admin/social',
    element: (
      <Private>
        <Networks />
      </Private>
    )
  },
  {
    path: '*',
    element: <Error />
  }
])

export { router }
