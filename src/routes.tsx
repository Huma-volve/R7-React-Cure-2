import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Layout = lazy(() => import('./Layout/Layout'));
const Home = lazy(() => import('./pages/Home/Home'));
const LogIn = lazy(() => import('./pages/login/LogIn'));
const SignUp = lazy(() => import('./pages/signUp/SignUp'));
const ErrorPage = lazy(() => import('./pages/Error/Error'));
const DoctorsPage = lazy(() => import('./pages/Doctors/Doctors'));
const FavoritePage = lazy(() => import('./pages/Favorite/FavoritePage'));
const TopDoctors = lazy(() => import('./pages/topDoctors/TopDoctors'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <LogIn /> },
            { path: 'signup', element: <SignUp /> },
            { path: 'doctors', element: <DoctorsPage /> },
            { path: '/favorites', element: <FavoritePage /> },
            { path: '/topDoctors', element: <TopDoctors /> }
        ]
    }
]);

export default router;
