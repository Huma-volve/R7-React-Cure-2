import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store/Store";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./Pages/Home/Home"));
const LogIn = lazy(() => import("./Pages/login/LogIn"));
const Verify = lazy(() => import("./Pages/verify/Verify"));
const Signup = lazy(() => import("./Pages/signup/Signup"));
const ErrorPage = lazy(() => import("./Pages/Error/Error"));

const Protected = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);

    // Check if user is authenticated
    const isAuthenticated = user?.user !== null;
    if (!user?.user) {
        return <Navigate to="/login" replace />;
    }

    return <Layout />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected />,
        errorElement: <ErrorPage />,
        children: [{ path: "/", element: <Home /> }],
    },
    {
        path: "/login",
        element: <LogIn />,
    },
    {
        path: "/verify-otp",
        element: <Verify />,
    }, {
        path: "/signup",
        element: <Signup />,

    }
]);

export default router;
