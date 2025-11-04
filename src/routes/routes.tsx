import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

const Layout = lazy(() => import("../layout/Layout"));
const Home = lazy(() => import("../Pages/Home/Home"));
const LogIn = lazy(() => import("../Pages/login/LogIn"));
const Verify = lazy(() => import("../Pages/verify/Verify"));
const Signup = lazy(() => import("../Pages/signup/Signup"));
const ErrorPage = lazy(() => import("../Pages/Error/Error"));
const PayMethod = lazy(() => import("../Pages/paymethod/PayMethod"));
const Methods = lazy(() => import("../Pages/paymethod/Methods"));
const Profile = lazy(() => import("../Pages/profile/Profile"));


const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute> <Layout /> </ProtectedRoute>,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            {
                path: "/payment", element: <PayMethod />,
            },
            { path: "/payment/visa-version", element: <Methods /> },
            { path: "/profile", element: <Profile /> },

        ],
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
        element: <Signup />,
    },
]);

export default router;
