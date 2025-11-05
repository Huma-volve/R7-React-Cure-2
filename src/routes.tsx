import { createBrowserRouter } from 'react-router-dom';
import DoctorDetails from './Pages/DoctorDetails/DoctorDetails';
import BookAppointment from './Pages/BookAppointment/BookAppointment';
import { lazy } from "react";


const BookingPage = lazy(() => import('./Pages/BookingPage/BookingPage'));
const ChatPage = lazy(() => import('./Pages/Chatpage/ChatPage'));
const Layout = lazy(() => import("./layout/Layout"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));
const Error = lazy(() => import("./Pages/Error/Error"));
const PayPage = lazy(() => import("./Pages/PayPage/PayPage"));
const Map = lazy(() => import("./Pages/Map/Map"));
const Home = lazy(() => import('./pages/Home/Home'));
const LogIn = lazy(() => import('./Pages/login/LogIn'));
const SignUp = lazy(() => import('./Pages/signup/Signup'));
const Verify = lazy(() => import('./Pages/verify/Verify'));
const DoctorsPage = lazy(() => import('./Pages/Doctors/Doctors'));
const FavoritePage = lazy(() => import('./Pages/Favorite/FavoritePage'));
const TopDoctors = lazy(() => import('./Pages/topDoctors/TopDoctors'));
const MethodForm = lazy(() => import('./Pages/paymethod/MethodForm'));
const NotificationPage = lazy(() => import('./Pages/Notification/NotificationPage'));
const PayMethod = lazy(() => import('./Pages/paymethod/PayMethod'));
const Privacy = lazy(() => import('./Pages/privacyPolicy/Privacy'));
const Profile = lazy(() => import('./Pages/profile/Profile'));
const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute> <Layout /> </ProtectedRoute>,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'doctors', element: <DoctorsPage /> },
            { path: '/favorites', element: <FavoritePage /> },
            { path: '/topDoctors', element: <TopDoctors /> },
            { path: "doctordetails/:id", element: <DoctorDetails /> },
            { path: "bookappointment", element: <BookAppointment /> },
            { path: "paypage", element: <PayPage /> },
            { path: "profile", element: <Profile /> },
            { path: "payment", element: <PayMethod /> },
            { path: "payment/visa-version", element: <MethodForm /> },
            { path: "map", element: <Map /> },
            { path: "notificationpage", element: <NotificationPage /> },
            { path: 'booking', element: <BookingPage /> },
            { path: 'chatpage', element: <ChatPage /> },
            { path: 'privcy', element: <Privacy /> },
        ],
    },

    { path: 'login', element: <LogIn /> },
    { path: 'signup', element: <SignUp /> },
    { path: 'verify-otp', element: <Verify /> },
]
);

export default router;
