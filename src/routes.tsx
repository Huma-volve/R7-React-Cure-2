import { createBrowserRouter } from 'react-router-dom';
import DoctorDetails from './Pages/DoctorDetails/DoctorDetails';
import BookAppointment from './Pages/BookAppointment/BookAppointment';
import { lazy } from "react";
import NotificationPage from './Pages/Notification/NotificationPage';
import ProtectedRoute from './routes/ProtectedRoute';
import Profile from './Pages/profile/Profile';
import PayMethod from './Pages/paymethod/PayMethod';
import MethodForm from './Pages/paymethod/MethodForm';
import Verify from './Pages/verify/Verify';

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./Pages/Home/Home"));
const LogIn = lazy(() => import("./Pages/login/LogIn"));
const SignUp = lazy(() => import("./Pages/signup/Signup"));
const Error = lazy(() => import("./Pages/Error/Error"));
const PayPage = lazy(() => import("./Pages/PayPage/PayPage"));
const Map = lazy(() => import("./Pages/Map/Map"));



const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute> <Layout /> </ProtectedRoute>,

        errorElement: <Error />,
        children: [
            { path: '/', element: <Home /> },
            { path: "doctordetails/:id", element: <DoctorDetails /> },
            { path: "bookappointment", element: <BookAppointment /> },
            { path: "paypage", element: <PayPage /> },
            { path: "profile", element: <Profile /> },
            { path: "payment", element: <PayMethod /> },
            { path: "payment/visa-version", element: <MethodForm /> },
            { path: "map", element: <Map /> },
            { path: "notificationpage", element: <NotificationPage /> },
        ]
    },
    {
        path: "/login",
        element: <LogIn />,
    },
    {
        path: "/verify-otp",
        element: <Verify />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },

]);

export default router;
