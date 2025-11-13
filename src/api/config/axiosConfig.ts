import axios from 'axios';
import Cookies from 'js-cookie';

const DEFAULT_API_BASE_URL = 'https://cure-doctor-booking.runasp.net/api';

// 🔹 إنشاء axios instance مشترك مع إعدادات أساسية
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
    timeout: 10000, // 10 ثواني
    headers: {
        'Content-Type': 'application/json'
    }
});

const readToken = (): string | undefined => {
    const localStorageToken =
        typeof window !== 'undefined'
            ? localStorage.getItem('accessToken') ||
                localStorage.getItem('token') ||
                localStorage.getItem('authToken')
            : null;

    const cookieToken = Cookies.get('accessToken') || Cookies.get('token');

    return localStorageToken || cookieToken || undefined;
};

const clearToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
    }

    Cookies.remove('accessToken');
    Cookies.remove('token');
};

// 🔹 Interceptor للإضافة headers مشتركة (مثل token)
apiClient.interceptors.request.use(
    (config) => {
        // يمكن إضافة token هنا إذا كان موجود
        const token = readToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 🔹 Interceptor للتعامل مع الأخطاء
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // يمكن التعامل مع الأخطاء هنا (مثل 401, 403, 500)
        if (error.response?.status === 401) {
            // إعادة توجيه للـ login
            clearToken();
        }
        return Promise.reject(error);
    }
);
