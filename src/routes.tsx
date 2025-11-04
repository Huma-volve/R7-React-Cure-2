import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// 🧱 Lazy loading لكل الصفحات (يجمع بين شغلك وشغل زمايلك)
const Layout = lazy(() => import('./Layout/Layout'));
const Home = lazy(() => import('./Pages/Home/Home'));
const LogIn = lazy(() => import('./Pages/login/LogIn'));
const SignUp = lazy(() => import('./Pages/signUp/SignUp'));
const ErrorPage = lazy(() => import('./Pages/Error/Error'));
const BookingPage = lazy(() => import('./Pages/BookingPage/BookingPage'));
const ChatPage = lazy(() => import('./Pages/Chatpage/ChatPage'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <LogIn /> },
            { path: 'signup', element: <SignUp /> },
            { path: 'booking', element: <BookingPage /> },
            { path: 'chatpage', element: <ChatPage /> },
        ],
    },
]);

export default router;
