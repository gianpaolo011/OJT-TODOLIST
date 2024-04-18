import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/landingpage/LandingPage'
import Dashboard from '../pages/dashboard/Dashboard'
import SignUp from '../components/dashboard-components/SignUp'
import LogIn from '../components/dashboard-components/LogIn'
import Application from '../components/Application'
import TodoContainer from '../components/TodoContainer'

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
    path: '/Application',
    element: <Application />,
  },
  {
    path: '/TodoContainer',
    element: <TodoContainer />,
  },
])
