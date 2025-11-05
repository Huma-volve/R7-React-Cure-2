import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    // 🧠 تعليق الشرط مؤقت علشان تقدر تدخل على الصفحات أثناء التطوير
    // if (!accessToken) {
    //     return <Navigate to="/login" replace />;
    // }

    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedRoute;