import axios from "axios";
import Cookies from "js-cookie";

const DEFAULT_API_BASE_URL = "https://cure-doctor-booking.runasp.net/api";

// 🔹 إنشاء axios instance مشترك مع إعدادات أساسية
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

// 🔹 دالة لقراءة الـ Access Token
const readAccessToken = (): string | undefined => {
    return Cookies.get("accessToken") || undefined;
};

// 🔹 دالة لقراءة الـ Refresh Token
const readRefreshToken = (): string | undefined => {
    return Cookies.get("refreshToken") || undefined;
};

// 🔹 دالة لمسح التوكنات
const clearTokens = (): void => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
};

// 🔹 Interceptor لإضافة الـ Access Token في كل طلب
apiClient.interceptors.request.use(
    (config) => {
        const accessToken = readAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔹 Interceptor للتعامل مع الأخطاء (خاصة 401)
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // لو الـ Access Token انتهى (401)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = readRefreshToken();
            if (refreshToken) {
                try {
                    // نطلب توكن جديد باستخدام refresh token
                    const response = await axios.post(
                        `${DEFAULT_API_BASE_URL}/Identity/Accounts/refresh-token`,
                        { refreshToken }
                    );

                    const newAccessToken = response.data?.data?.accessToken;
                    if (newAccessToken) {
                        // نخزنه في الكوكيز
                        Cookies.set("accessToken", newAccessToken);

                        // نعيد تنفيذ الطلب الأصلي بالتوكن الجديد
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return apiClient(originalRequest);
                    }
                } catch (err) {
                    clearTokens();
                    // ممكن هنا تعمل redirect للّوجين
                    // window.location.href = "/login";
                }
            }

            clearTokens();
        }

        return Promise.reject(error);
    }
);
