import { createBrowserRouter } from 'react-router-dom';
import DoctorDetails from './Pages/DoctorDetails/DoctorDetails';
import BookAppointment from './Pages/BookAppointment/BookAppointment';
import { lazy } from "react";

const Layout = lazy(() => import("./Layout/Layout"));
const Home = lazy(() => import("./Pages/Home/Home"));
const LogIn = lazy(() => import("./Pages/login/LogIn"));
const SignUp = lazy(() => import("./Pages/signUp/SignUp"));
const Error = lazy(() => import("./Pages/Error/Error"));



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,

        errorElement: <Error />,
        children: [
            { path: '/', element: <Home /> },
            { path: "doctordetails", element: <DoctorDetails /> },
            { path: "bookappointment", element: <BookAppointment /> }
        ]
    },
    {
        path: "/login",
        element: <LogIn />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    
]);

export default router;
