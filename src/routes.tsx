import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./store/Store";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./Pages/Home/Home"));
const LogIn = lazy(() => import("./Pages/login/LogIn"));
const Verify = lazy(() => import("./Pages/verify/Verify"));
const Signup = lazy(() => import("./Pages/signup/Signup"));
const ErrorPage = lazy(() => import("./Pages/Error/Error"));
const PayMethod = lazy(() => import("./Pages/paymethod/PayMethod"));
const Methods = lazy(() => import("./Pages/paymethod/Methods"));

// const Protected = () => {
//     const token = useSelector((state: RootState) => state.auth.token);

//     if (!token) {
//         return <Navigate to="/login" replace />;
//     }

//     return <Layout />;
// };

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            {
                path: "/payment", element: <PayMethod />,
            },
            { path: "/payment/visa-version", element: <Methods /> },


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
