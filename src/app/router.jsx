import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/landingpage/LandingPage'
import Dashboard from '../pages/dashboard/Dashboard'
import SignUp from '../components/dashboard-components/SignUp'
import LogIn from '../components/dashboard-components/LogIn'
import TodoListDescription from '../pages/AppDescription/TodoListDescription'

export const router = createBrowserRouter([
  {
    path: '/landingpage',
    element: <LandingPage />,
  },
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/SignUp',
    element: <SignUp />,
  },
  {
    path: '/LogIn',
    element: <LogIn />,
  },
  {
    path: '/Description',
    element: <TodoListDescription />,
  },
])
