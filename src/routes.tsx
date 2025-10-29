import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store/Store"; // لو عندك store.ts معرف فيه التايب

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./Pages/Home/Home"));
const LogIn = lazy(() => import("./Pages/login/LogIn"));
const Verify = lazy(() => import("./Pages/verify/Verify"));
const ErrorPage = lazy(() => import("./Pages/Error/Error"));

const Protected = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);

    const logout = () => dispatch({ type: "LOGOUT" });

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
    },
]);

export default router;
