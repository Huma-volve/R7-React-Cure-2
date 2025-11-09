// src/api/services/doctorsService.ts
import { apiClient } from '../config/axiosConfig';
import { extractDoctorsArray, normalizeDoctor, type DoctorsType } from '../doctors/Doctors';

// =========================
// 🔹 Types
// =========================
export interface DoctorsSearchParams {
    search?: string;
    specialty?: string;
    gender?: 'Male' | 'Female' | 'All';
    page?: number;
    limit?: number;
    [key: string]: unknown;
}

export interface DoctorsListResult {
    doctors: DoctorsType[];
    raw: unknown;
}

export interface DoctorResult {
    doctor: DoctorsType | null;
    raw: unknown;
}

export interface ToggleFavoritePayload {
    doctorId: number;
    [key: string]: unknown;
}

// =========================
// 🔹 Endpoints
// =========================
const ENDPOINTS = {
    DOCTORS: '/Customer/Doctors',
    FAVORITES: '/Customer/Specialists'
};

// =========================
// 🔹 Services
// =========================

// ✅ Get all doctors
export const getDoctors = async (params?: DoctorsSearchParams): Promise<DoctorsListResult> => {
    try {
        const response = await apiClient.get(`${ENDPOINTS.DOCTORS}/GetAllDoctors`, { params });

        const rawList = extractDoctorsArray(response.data);

        // Log sample doctor data to debug specialty field
        if (rawList.length > 0) {
            console.log(
                '[getDoctors] Sample raw doctor data (first 3):',
                rawList.slice(0, 3).map((d) => ({
                    id: d?.id,
                    name: d?.name || d?.fullName,
                    specialty: d?.specialty,
                    speciality: d?.speciality,
                    specialityName: d?.specialityName,
                    specialities: d?.specialities,
                    specialistTitle: d?.specialistTitle,
                    specialityDto: d?.specialityDto,
                    allKeys: Object.keys(d || {})
                }))
            );
        }

        const doctors = rawList.map(normalizeDoctor);

        // Log normalized doctors to see what specialty was resolved
        if (doctors.length > 0) {
            console.log(
                '[getDoctors] Normalized doctors specialties (first 5):',
                doctors.slice(0, 5).map((d) => ({
                    id: d.id,
                    name: d.name,
                    specialty: d.specialty,
                    specialities: d.specialities
                }))
            );
        }

        return { doctors, raw: response.data };
    } catch (error) {
        throw error instanceof Error ? error : new Error('Failed to fetch doctors');
    }
};

// ✅ Get top-rated doctors
export const getTopRatedDoctors = async (): Promise<DoctorsListResult> => {
    try {
        const response = await apiClient.get(`${ENDPOINTS.DOCTORS}/GetTopRatedDoctors`);

        const rawList = extractDoctorsArray(response.data);

        // Log sample doctor data to debug specialty field
        if (rawList.length > 0) {
            console.log(
                '[getTopRatedDoctors] Sample raw doctor data (first 3):',
                rawList.slice(0, 3).map((d) => ({
                    id: d?.id,
                    name: d?.name || d?.fullName,
                    specialty: d?.specialty,
                    speciality: d?.speciality,
                    specialityName: d?.specialityName,
                    specialities: d?.specialities,
                    specialistTitle: d?.specialistTitle,
                    specialityDto: d?.specialityDto,
                    allKeys: Object.keys(d || {})
                }))
            );
        }

        const doctors = rawList.map(normalizeDoctor);

        // Log normalized doctors to see what specialty was resolved
        if (doctors.length > 0) {
            console.log(
                '[getTopRatedDoctors] Normalized doctors specialties (first 5):',
                doctors.slice(0, 5).map((d) => ({
                    id: d.id,
                    name: d.name,
                    specialty: d.specialty,
                    specialities: d.specialities
                }))
            );
        }

        return { doctors, raw: response.data };
    } catch (error) {
        throw error instanceof Error ? error : new Error('Failed to fetch top rated doctors');
    }
};

// ✅ Get doctor by ID
export const getDoctorById = async (id: number): Promise<DoctorResult> => {
    try {
        const response = await apiClient.get(`${ENDPOINTS.DOCTORS}/DoctorDetails/${id}`);

        const doctorData = response.data?.data ?? response.data;
        const doctor = doctorData ? normalizeDoctor(doctorData) : null;

        return { doctor, raw: response.data };
    } catch (error) {
        throw error instanceof Error ? error : new Error('Failed to fetch doctor');
    }
};

// ✅ Get favorite doctors
export const getFavoriteDoctors = async (): Promise<DoctorsListResult> => {
    try {
        // Try different possible endpoints
        const possibleEndpoints = [`${ENDPOINTS.FAVORITES}/GetAllSpecialists`];

        let lastError: Error | null = null;

        for (const endpoint of possibleEndpoints) {
            try {
                const response = await apiClient.get(endpoint);
                const rawList = extractDoctorsArray(response.data);
                const doctors = rawList.map(normalizeDoctor);

                // Mark all as favorite since they came from favorites endpoint
                const favoriteDoctors = doctors.map((doc) => ({
                    ...doc,
                    isFavorite: true,
                    isFavourite: true
                }));

                console.log('[DoctorsService] getFavoriteDoctors success from:', endpoint);
                return { doctors: favoriteDoctors, raw: response.data };
            } catch (err) {
                lastError = err instanceof Error ? err : new Error(String(err));
                // Continue to next endpoint
            }
        }

        // If all endpoints failed, throw the last error
        throw lastError || new Error('Failed to fetch favorite doctors');
    } catch (error) {
        console.error('[DoctorsService] getFavoriteDoctors error:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch favorite doctors');
    }
};

// ✅ Toggle favorite doctor
export const toggleDoctorFavorite = async (
    payload: ToggleFavoritePayload
): Promise<{ success: boolean; raw: unknown }> => {
    try {
        const response = await apiClient.post(
            `${ENDPOINTS.FAVORITES}/FavouriteAndUnFavourite`,
            payload
        );
        console.log('[DoctorsService] toggleDoctorFavorite response:', response.data);

        return { success: response.data?.success ?? true, raw: response.data };
    } catch (error) {
        // Don't log error to console - fail silently
        // The local state will be maintained regardless of API success/failure
        return { success: false, raw: null };
    }
};

// ✅ Unified search (alias of getDoctors)
export const searchDoctors = getDoctors;
