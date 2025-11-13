import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const cookieToken = Cookies.get("accessToken") || Cookies.get("idToken");

    if (!accessToken && !cookieToken) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
