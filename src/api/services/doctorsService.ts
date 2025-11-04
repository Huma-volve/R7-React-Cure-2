import { apiClient } from '../config/axiosConfig';
import type { DoctorsType } from '../doctors/Doctors';

// 🔹 Interface للـ API Response (يمكن تعديله حسب بنية الـ API الفعلية)
export interface DoctorsApiResponse {
    data: DoctorsType[];
    total?: number;
    page?: number;
    limit?: number;
}

export interface DoctorsSearchParams {
    search?: string;
    specialty?: string;
    gender?: 'Male' | 'Female' | 'All';
    page?: number;
    limit?: number;
}

/**
 * 🔹 جلب قائمة الأطباء
 * @param params - معاملات البحث والتصفية
 * @returns Promise<DoctorsApiResponse>
 */
export const getDoctors = async (params?: DoctorsSearchParams): Promise<DoctorsApiResponse> => {
    // TODO: استبدل هذا الرابط برابط API الفعلي
    const response = await apiClient.get('/doctors', { params });
    return response.data;
};

/**
 * 🔹 جلب طبيب محدد
 * @param id - معرف الطبيب
 * @returns Promise<DoctorsType>
 */
export const getDoctorById = async (id: number): Promise<DoctorsType> => {
    // TODO: استبدل هذا الرابط برابط API الفعلي
    const response = await apiClient.get(`/doctors/${id}`);
    return response.data;
};

/**
 * 🔹 البحث عن الأطباء
 * @param searchTerm - مصطلح البحث
 * @returns Promise<DoctorsApiResponse>
 */
export const searchDoctors = async (searchTerm: string): Promise<DoctorsApiResponse> => {
    // TODO: استبدل هذا الرابط برابط API الفعلي
    const response = await apiClient.get('/doctors/search', {
        params: { q: searchTerm },
    });
    return response.data;
};

/**
 * 🔹 جلب أفضل الأطباء (Top Rated)
 * @returns Promise<DoctorsApiResponse>
 */
export const getTopRatedDoctors = async (): Promise<DoctorsApiResponse> => {
    // TODO: استبدل هذا الرابط برابط API الفعلي
    const response = await apiClient.get('/doctors/top-rated');
    return response.data;
};
