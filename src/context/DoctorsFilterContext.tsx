import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type DoctorsType } from '@/api/doctors/Doctors';
import { specialtiesMock, type SpecialtyType } from '@/api/doctors/specialties';
import { getDoctors, getTopRatedDoctors, type DoctorsSearchParams } from '@/api/services/doctorsService';
import { useFavorite } from './FavoriteContext';

interface DoctorsFilterContextType {
    // State
    searchTerm: string;
    filteredDoctors: DoctorsType[];
    loading: boolean;
    error: string | null;
    selectedGender: 'Male' | 'Female' | 'All';
    selectedSpecialty: string;
    specialties: SpecialtyType[];
    isFilterOpen: boolean;

    // Setters
    setSearchTerm: (term: string) => void;
    setSelectedGender: (gender: 'Male' | 'Female' | 'All') => void;
    setSelectedSpecialty: (specialty: string) => void;
    setIsFilterOpen: (isOpen: boolean) => void;
    toggleFilter: () => void;

    // Functions
    handleSpecialtySelect: (specialtyName: string) => void;
    refreshDoctors: (params?: DoctorsSearchParams) => Promise<void>;
}

export const DoctorsFilterContext = createContext<DoctorsFilterContextType | undefined>(undefined);

interface DoctorsFilterProviderProps {
    children: ReactNode;
    useTopRated?: boolean; // If true, use getTopRatedDoctors instead of getDoctors
}

export const DoctorsFilterProvider = ({ children, useTopRated = false }: DoctorsFilterProviderProps) => {
    const [params] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [doctors, setDoctors] = useState<DoctorsType[]>([]);
    const [filteredDoctors, setFilteredDoctors] = useState<DoctorsType[]>([]);
    const [selectedGender, setSelectedGender] = useState<'Male' | 'Female' | 'All'>('All');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { updateDoctors, doctors: favoriteDoctors } = useFavorite();

    // Extract unique specialties from doctors data
    const specialties = useMemo(() => {
        // Get all unique specialty names from doctors
        // Also check specialities array if available
        const allSpecialties = doctors.flatMap((doc) => {
            const specialties: string[] = [];
            
            // Add main specialty
            if (doc.specialty && doc.specialty.trim() !== '') {
                specialties.push(doc.specialty);
            }
            
            // Add specialities array if available
            if (doc.specialities) {
                if (Array.isArray(doc.specialities)) {
                    doc.specialities.forEach((spec: any) => {
                        if (spec && String(spec).trim() !== '') {
                            specialties.push(String(spec));
                        }
                    });
                } else if (String(doc.specialities).trim() !== '') {
                    specialties.push(String(doc.specialities));
                }
            }
            
            return specialties;
        });

        // Get unique specialty names and filter out empty strings
        const uniqueSpecialtyNames = Array.from(
            new Set(allSpecialties.filter((spec) => spec && spec.trim() !== ''))
        ).sort();

        console.log('[DoctorsFilterContext] Extracted specialties:', {
            totalDoctors: doctors.length,
            uniqueSpecialties: uniqueSpecialtyNames,
            sampleDoctorSpecialties: doctors.slice(0, 3).map(d => ({
                id: d.id,
                name: d.name,
                specialty: d.specialty,
                specialities: d.specialities
            }))
        });

        // Create SpecialtyType array from unique specialties
        return uniqueSpecialtyNames.map((specialtyName, index) => {
            // Try to find matching image from specialtiesMock (case-insensitive)
            const normalizedName = specialtyName.toLowerCase();
            const matchedMock = specialtiesMock.find(
                (mock) => mock.name.toLowerCase() === normalizedName
            );

            return {
                id: index + 1,
                name: specialtyName,
                image: matchedMock?.image || '/icons/special-General-Practitioner.svg' // Default image
            };
        });
    }, [doctors]);

    const loadDoctors = useCallback(
        async (paramsOverride?: DoctorsSearchParams) => {
            setLoading(true);
            setError(null);
            try {
                // ✅ Use getTopRatedDoctors if useTopRated is true, otherwise use getDoctors
                const result = useTopRated
                    ? await getTopRatedDoctors()
                    : await getDoctors(paramsOverride);
                
                console.log(
                    `[DoctorsFilterContext] ${useTopRated ? 'getTopRatedDoctors' : 'getDoctors'} raw response:`,
                    result.raw
                );
                setDoctors(result.doctors);
                // Don't set filteredDoctors here - the useEffect will handle filtering
                // This ensures that searchTerm and other filters are always applied
                updateDoctors(result.doctors);
            } catch (err) {
                console.error(
                    `[DoctorsFilterContext] ${useTopRated ? 'getTopRatedDoctors' : 'getDoctors'} error:`,
                    err
                );
                setError(err instanceof Error ? err.message : 'Failed to fetch doctors');
                setDoctors([]);
                setFilteredDoctors([]);
                updateDoctors([]);
            } finally {
                setLoading(false);
            }
        },
        [updateDoctors, useTopRated]
    );

    useEffect(() => {
        void loadDoctors();
    }, [loadDoctors]);

    const toggleFilter = () => {
        setIsFilterOpen((prev) => !prev);
    };

    // Handle specialty selection with toggle functionality
    const handleSpecialtySelect = (specialtyName: string) => {
        if (selectedSpecialty === specialtyName) {
            // If clicking the same specialty, deselect it
            setSelectedSpecialty('');
        } else {
            // Otherwise, select the new specialty
            setSelectedSpecialty(specialtyName);
        }
    };

    // handle query params (like ?q=cardio)
    useEffect(() => {
        const q = params.get('q') || '';
        setSearchTerm(q);
    }, [params]);

    // Sync favorite status from FavoriteContext to doctors list
    useEffect(() => {
        setDoctors((prevDoctors) =>
            prevDoctors.map((doc) => {
                const favoriteDoc = favoriteDoctors.find((fav) => fav.id === doc.id);
                if (favoriteDoc) {
                    // Doctor is in favorites list, update status
                    return {
                        ...doc,
                        isFavorite: favoriteDoc.isFavorite ?? favoriteDoc.isFavourite ?? false,
                        isFavourite: favoriteDoc.isFavourite ?? favoriteDoc.isFavorite ?? false
                    };
                } else {
                    // Doctor is not in favorites list, set to false
                    return {
                        ...doc,
                        isFavorite: false,
                        isFavourite: false
                    };
                }
            })
        );
    }, [favoriteDoctors]);

    // handle filters logic
    useEffect(() => {
        // Start with all doctors
        let filtered = [...doctors];

        // Apply search filter first (search by name or specialty)
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase().trim();
            filtered = filtered.filter((doc) => {
                // Search in doctor name
                const name = doc.name || '';
                const nameMatch = name.toLowerCase().includes(searchLower);
                
                // Search in doctor specialty
                const specialty = doc.specialty || '';
                const specialtyMatch = specialty.toLowerCase().includes(searchLower);
                
                return nameMatch || specialtyMatch;
            });
            console.log(`[DoctorsFilterContext] Filtering by search term: "${searchTerm}"`, {
                totalDoctors: doctors.length,
                filteredCount: filtered.length,
                searchTerm: searchTerm
            });
        }

        // Apply gender filter
        if (selectedGender !== 'All') {
            filtered = filtered.filter((doc) => doc.gender === selectedGender);
        }

        // Apply specialty filter
        if (selectedSpecialty) {
            filtered = filtered.filter((doc) => doc.specialty === selectedSpecialty);
        }

        console.log(`[DoctorsFilterContext] Final filtered doctors:`, {
            totalDoctors: doctors.length,
            filteredCount: filtered.length,
            searchTerm: searchTerm || '(empty)',
            selectedGender,
            selectedSpecialty: selectedSpecialty || '(none)'
        });

        setFilteredDoctors(filtered);
    }, [doctors, searchTerm, selectedGender, selectedSpecialty]);

    return (
        <DoctorsFilterContext.Provider
            value={{
                searchTerm,
                filteredDoctors,
                loading,
                error,
                selectedGender,
                selectedSpecialty,
                specialties,
                isFilterOpen,
                setSearchTerm,
                setSelectedGender,
                setSelectedSpecialty,
                setIsFilterOpen,
                toggleFilter,
                handleSpecialtySelect,
                refreshDoctors: async (paramsOverride?: DoctorsSearchParams) => {
                    await loadDoctors(paramsOverride);
                }
            }}
        >
            {children}
        </DoctorsFilterContext.Provider>
    );
};

export const useDoctorsFilter = () => {
    const context = useContext(DoctorsFilterContext);
    if (context === undefined) {
        throw new Error('useDoctorsFilter must be used within a DoctorsFilterProvider');
    }
    return context;
};
