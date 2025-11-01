import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Error from './Pages/Error/Error';
import Home from './Pages/Home/Home';
import BookingPage from './Pages/BookingPage/BookingPage';
import AppointmentsList from './Pages/BookingPage/AppointmentsList';
import ChatSidebar from './Pages/Chatpage/ChatSidebar';
import ChatPage from './Pages/Chatpage/ChatPage';
import ChatWindow from './Pages/Chatpage/ChatWindow';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/booking', element: <BookingPage /> },
            { path: '/chatpage', element: <ChatPage /> },
           
            
        ],
        
    },
]);

export default router;
