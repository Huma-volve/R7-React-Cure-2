export interface DoctorsType {
    id: number;
    name: string;
    specialty: string;
    hospital: string;
    image: string;
    rate: number;
    availability: string;
    price: number;
    gender: 'Male' | 'Female' | 'All';
    isFavorite?: boolean;
    fullName?: string;
    address?: string;
    rating?: number;
    imgUrl?: string;
    pricePerHour?: number;
    isFavourite?: boolean;
    specialities?: string | string[];
    about?: string;
    specialistTitle?: string;
    experienceYears?: number;
    email?: string;
    phone?: string;
    distance?: number | null;
    startDate?: string | null;
    endDate?: string | null;
    availableSlots?: AvailableSlot[];
}

export interface AvailableSlot {
    id?: number;
    doctorId?: number;
    dateTime?: string;
    startTime?: string;
    endTime?: string;
    isBooked?: boolean;
    [key: string]: unknown;
}

const FALLBACK_IMAGE = '/image/doctor-1.jpg';

const resolveId = (doctor: any): number => {
    const candidate =
        doctor?.id ??
        doctor?.doctorId ??
        doctor?.profileId ??
        doctor?.userId ??
        doctor?.doctorProfileId;

    const parsed = Number(candidate);
    if (Number.isFinite(parsed) && parsed > 0) {
        return parsed;
    }

    return Date.now();
};

const resolveName = (doctor: any): string => {
    if (!doctor) return 'Unknown Doctor';

    return (
        doctor.name || doctor.fullName || doctor.doctorName || doctor.userName || 'Unknown Doctor'
    );
};

const resolveSpecialty = (doctor: any): string => {
    // Try all possible field names for specialty
    if (doctor?.specialty && doctor.specialty !== 'General' && doctor.specialty.trim() !== '') {
        return doctor.specialty;
    }

    if (doctor?.speciality && doctor.speciality !== 'General' && doctor.speciality.trim() !== '') {
        return doctor.speciality;
    }

    if (doctor?.specialityName && doctor.specialityName !== 'General' && doctor.specialityName.trim() !== '') {
        return doctor.specialityName;
    }

    if (doctor?.specialistTitle && doctor.specialistTitle !== 'General' && doctor.specialistTitle.trim() !== '') {
        return doctor.specialistTitle;
    }

    if (doctor?.specialities) {
        if (Array.isArray(doctor.specialities)) {
            const specialties = doctor.specialities.filter((s: any) => s && s !== 'General' && String(s).trim() !== '');
            if (specialties.length > 0) {
                return specialties.join(', ');
            }
        } else if (doctor.specialities !== 'General' && String(doctor.specialities).trim() !== '') {
            return String(doctor.specialities);
        }
    }

    // Check nested objects
    if (doctor?.specialityDto?.name) {
        return doctor.specialityDto.name;
    }

    if (doctor?.specialityDto?.specialityName) {
        return doctor.specialityDto.specialityName;
    }

    // Log for debugging if specialty is missing
    if (!doctor?.specialty && !doctor?.speciality && !doctor?.specialityName && !doctor?.specialities && !doctor?.specialistTitle) {
        console.warn('[resolveSpecialty] No specialty found in doctor data:', {
            id: doctor?.id,
            name: doctor?.name || doctor?.fullName,
            availableFields: Object.keys(doctor || {})
        });
    }

    // Return empty string instead of 'General' to allow filtering
    // The UI can handle empty specialty better than defaulting to 'General'
    return '';
};

const resolveHospital = (doctor: any): string =>
    doctor?.hospital || doctor?.address || doctor?.hospitalName || '';

const resolveImage = (doctor: any): string => doctor?.image || doctor?.imgUrl || FALLBACK_IMAGE;

const resolveRate = (doctor: any): number => {
    if (typeof doctor?.rate === 'number') return doctor.rate;
    if (typeof doctor?.rating === 'number') return doctor.rating;
    return 0;
};

const resolvePrice = (doctor: any): number => {
    if (typeof doctor?.price === 'number') return doctor.price;
    if (typeof doctor?.pricePerHour === 'number') return doctor.pricePerHour;
    return 0;
};

const resolveFavourite = (doctor: any): boolean =>
    Boolean(doctor?.isFavourite ?? doctor?.isFavorite ?? doctor?.favorite);

const resolveGender = (doctor: any): DoctorsType['gender'] => {
    const gender = doctor?.gender ?? doctor?.sex ?? doctor?.doctorGender;
    if (typeof gender === 'string') {
        const normalized = gender.toLowerCase();
        if (normalized.startsWith('m')) return 'Male';
        if (normalized.startsWith('f')) return 'Female';
    }
    return 'All';
};

const resolveAvailability = (doctor: any): string => {
    if (doctor?.availability) return doctor.availability;

    if (doctor?.availableSlots?.length) {
        const slot = doctor.availableSlots[0];
        if (slot?.startTime && slot?.endTime) {
            return `${slot.startTime} - ${slot.endTime}`;
        }
    }

    return 'N/A';
};

const resolveAvailableSlots = (doctor: any): AvailableSlot[] => {
    const slots = doctor?.availableSlots ?? doctor?.slots ?? [];
    return Array.isArray(slots) ? slots : [];
};

export const normalizeDoctor = (doctor: any): DoctorsType => ({
    id: resolveId(doctor),
    name: resolveName(doctor),
    specialty: resolveSpecialty(doctor),
    hospital: resolveHospital(doctor),
    image: resolveImage(doctor),
    rate: resolveRate(doctor),
    availability: resolveAvailability(doctor),
    price: resolvePrice(doctor),
    gender: resolveGender(doctor),
    isFavorite: resolveFavourite(doctor),
    fullName: doctor?.fullName,
    address: doctor?.address,
    rating: typeof doctor?.rating === 'number' ? doctor.rating : undefined,
    imgUrl: doctor?.imgUrl,
    pricePerHour: typeof doctor?.pricePerHour === 'number' ? doctor.pricePerHour : undefined,
    isFavourite: doctor?.isFavourite,
    specialities: doctor?.specialities,
    about: doctor?.about ?? doctor?.description ?? doctor?.bio,
    specialistTitle: doctor?.specialistTitle ?? doctor?.specialityName,
    experienceYears:
        typeof doctor?.experienceYears === 'number' ? doctor.experienceYears : undefined,
    email: doctor?.email ?? doctor?.emailAddress,
    phone: doctor?.phone ?? doctor?.phoneNumber,
    distance:
        typeof doctor?.distance === 'number'
            ? doctor.distance
            : typeof doctor?.distance === 'string'
            ? Number(doctor.distance)
            : null,
    startDate: doctor?.startDate ?? doctor?.availableFrom ?? null,
    endDate: doctor?.endDate ?? doctor?.availableTo ?? null,
    availableSlots: resolveAvailableSlots(doctor)
});

export const extractDoctorsArray = (response: any): any[] => {
    if (!response) return [];

    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.result)) return response.result;
    if (Array.isArray(response?.items)) return response.items;
    if (Array.isArray(response?.list)) return response.list;

    return [];
};
