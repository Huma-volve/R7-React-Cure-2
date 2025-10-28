import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Layout = lazy(() => import('./Layout/Layout'));
const Home = lazy(() => import('./Pages/Home/Home'));
const LogIn = lazy(() => import('./pages/login/LogIn'));
const SignUp = lazy(() => import('./pages/signUp/SignUp'));
const ErrorPage = lazy(() => import('./pages/Error/Error'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <LogIn /> },
            { path: 'signup', element: <SignUp /> }
        ]
    }
]);

export default router;
