import { createBrowserRouter } from 'react-router-dom';
import DoctorDetails from './Pages/DoctorDetails/DoctorDetails';
import BookAppointment from './Pages/BookAppointment/BookAppointment';
import { lazy } from "react";
import NotificationPage from './Pages/NotificationPage/NotificationPage';
import ProtectedRoute from './routes/ProtectedRoute';
import Profile from './Pages/profile/Profile';
import PayMethod from './Pages/paymethod/PayMethod';
import MethodForm from './Pages/paymethod/MethodForm';
import Verify from './Pages/verify/Verify';
import NotificationDetailsPage from './Pages/NotificationPage/NotificationDetailsPage';

// 🧱 Lazy loading لكل الصفحات (يجمع بين شغلك وشغل زمايلك)
const BookingPage = lazy(() => import('./Pages/BookingPage/BookingPage'));
const ChatPage = lazy(() => import('./Pages/Chatpage/ChatPage'));
const Layout = lazy(() => import("./Layout/Layout"));
const Error = lazy(() => import("./Pages/Error/Error"));
const PayPage = lazy(() => import("./Pages/PayPage/PayPage"));
const Map = lazy(() => import("./Pages/Map/Map"));
const Home = lazy(() => import('./pages/Home/Home'));
const LogIn = lazy(() => import('./Pages/login/LogIn'));
const SignUp = lazy(() => import('./Pages/signup/Signup'));
const DoctorsPage = lazy(() => import('./Pages/Doctors/Doctors'));
const FavoritePage = lazy(() => import('./Pages/Favorite/FavoritePage'));
const TopDoctors = lazy(() => import('./Pages/topDoctors/TopDoctors'));
const AddReviewPage = lazy(() => import('./Pages/AddReviewPage/AddReviewPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'booking', element: <BookingPage /> },
      { path: 'chatpage', element: <ChatPage /> },
      { path: 'doctors', element: <DoctorsPage /> },
      { path: 'favorites', element: <FavoritePage /> },
      { path: 'topDoctors', element: <TopDoctors /> },
      { path: 'doctordetails/:id', element: <DoctorDetails /> },
      { path: 'bookappointment', element: <BookAppointment /> },
      { path: 'paypage', element: <PayPage /> },
      { path: 'profile', element: <Profile /> },
      { path: 'payment', element: <PayMethod /> },
      { path: 'payment/visa-version', element: <MethodForm /> },
      { path: 'map', element: <Map /> },
      { path: 'notificationpage', element: <NotificationPage /> },
      { path: 'addreviewpage', element: <AddReviewPage /> }, 
      { path: '/notifications/:id', element: <NotificationDetailsPage /> }
    ],
  },
  { path: '/login', element: <LogIn /> },
  { path: '/verify-otp', element: <Verify /> },
  { path: '/signup', element: <SignUp /> },
]);

export default router;