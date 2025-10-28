import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./Pages/Home/Home"));
const LogIn = lazy(() => import("./Pages/login/LogIn"));
const SignUp = lazy(() => import("./Pages/signUp/SignUp"));
const ErrorPage = lazy(() => import("./Pages/Error/Error"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> }, // بدل path: "/" استخدم index
            { path: "login", element: <LogIn /> },
            { path: "signup", element: <SignUp /> },
        ],
    },
]);

export default router;
