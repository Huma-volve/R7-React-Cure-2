import axios from 'axios';

// 🔹 إنشاء axios instance مشترك مع إعدادات أساسية
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '', // يمكن إضافة base URL من .env
    timeout: 10000, // 10 ثواني
    headers: {
        'Content-Type': 'application/json'
    }
});

// 🔹 Interceptor للإضافة headers مشتركة (مثل token)
apiClient.interceptors.request.use(
    (config) => {
        // يمكن إضافة token هنا إذا كان موجود
        const token = localStorage.getItem('token');
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
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);
