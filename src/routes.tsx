import { createBrowserRouter } from 'react-router-dom';
import DoctorDetails from './Pages/DoctorDetails/DoctorDetails';
import BookAppointment from './Pages/BookAppointment/BookAppointment';
import { lazy } from "react";
import NotificationDetailsPage from './Pages/NotificationPage/NotificationDetailsPage';


const BookingPage = lazy(() => import('./Pages/BookingPage/BookingPage'));
const ChatPage = lazy(() => import('./Pages/Chatpage/ChatPage'));
const Layout = lazy(() => import("./Layout/Layout"));
const Error = lazy(() => import("./Pages/Error/Error"));
const PayPage = lazy(() => import("./Pages/PayPage/PayPage"));
const Map = lazy(() => import("./Pages/Map/Map"));
const Home = lazy(() => import('./Pages/Home/Home'));
const LogIn = lazy(() => import('./Pages/login/LogIn'));
const SignUp = lazy(() => import('./Pages/signup/Signup'));
const DoctorsPage = lazy(() => import('./Pages/Doctors/Doctors'));
const FavoritePage = lazy(() => import('./Pages/Favorite/FavoritePage'));
const TopDoctors = lazy(() => import('./Pages/topDoctors/TopDoctors'));
const AddReviewPage = lazy(() => import('./Pages/AddReviewPage/AddReviewPage'));

const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));
const Verify = lazy(() => import('./Pages/verify/Verify'));
const Methods = lazy(() => import('./Pages/paymethod/Methods'));
const NotificationPage = lazy(() => import('./Pages/NotificationPage/NotificationDetailsPage'));
const PayMethod = lazy(() => import('./Pages/paymethod/PayMethod'));
const MethodForm = lazy(() => import('./Pages/paymethod/MethodForm'));
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
            { path: 'favorites', element: <FavoritePage /> },
            { path: 'topDoctors', element: <TopDoctors /> },
            { path: "doctordetails/:id", element: <DoctorDetails /> },
            { path: "bookappointment", element: <BookAppointment /> },
            { path: "paypage", element: <PayPage /> },
            { path: "profile", element: <Profile /> },
            { path: "payment", element: <PayMethod /> },
            { path: "methods", element: <Methods /> },
            { path: "methodform", element: <MethodForm /> },
            { path: "map", element: <Map /> },
            { path: "notificationpage", element: <NotificationPage /> },
            { path: 'booking', element: <BookingPage /> },
            { path: 'chatpage', element: <ChatPage /> },
            { path: 'privacy', element: <Privacy /> },
                  { path: 'notificationpage', element: <NotificationPage /> },
      { path: 'addreviewpage', element: <AddReviewPage /> }, 
      { path: '/notifications/:id', element: <NotificationDetailsPage /> }
        ],
    },

    { path: 'login', element: <LogIn /> },
    { path: 'signup', element: <SignUp /> },
    { path: 'verify-otp', element: <Verify /> },
]
);

export default router;