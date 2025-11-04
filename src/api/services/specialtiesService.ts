import { apiClient } from '../config/axiosConfig';
import type { SpecialtyType } from '../doctors/specialties';

// 🔹 Interface للـ API Response (يمكن تعديله حسب بنية الـ API الفعلية)
export interface SpecialtiesApiResponse {
    data: SpecialtyType[];
}

/**
 * 🔹 جلب قائمة التخصصات
 * @returns Promise<SpecialtiesApiResponse>
 */
export const getSpecialties = async (): Promise<SpecialtiesApiResponse> => {
    // TODO: استبدل هذا الرابط برابط API الفعلي
    const response = await apiClient.get('/specialties');
    return response.data;
};

/**
 * 🔹 جلب تخصص محدد
 * @param id - معرف التخصص
 * @returns Promise<SpecialtyType>
 */
export const getSpecialtyById = async (id: number): Promise<SpecialtyType> => {
    // TODO: استبدل هذا الرابط برابط API الفعلي
    const response = await apiClient.get(`/specialties/${id}`);
    return response.data;
};
