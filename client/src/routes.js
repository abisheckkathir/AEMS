import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CoursesF from './pages/faculty/Courses';
import CoursesC from './pages/chair/Courses';
import CoursesS from './pages/student/Courses';
import StudCourses from './pages/chair/StudCourses'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Logoutpage from './pages/Logoutpage';

import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'faculty/courses', element: <CoursesF /> },
      { path: 'chair/courses', element: <CoursesC /> },
      { path: 'student/courses', element: <CoursesS /> },
      { path: 'chair/studcourses', element: <StudCourses /> },
      { path: 'logout', element: <Logoutpage /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
