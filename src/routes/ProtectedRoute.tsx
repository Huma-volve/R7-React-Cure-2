import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";
import { logout } from "@/store/UserSlice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            {children}
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
};

export default ProtectedRoute;