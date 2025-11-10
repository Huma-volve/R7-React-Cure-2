import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef,
    type ReactNode
} from 'react';
import { type DoctorsType } from '@/api/doctors/Doctors';
import { getFavoriteDoctors, toggleDoctorFavorite } from '@/api/services/doctorsService';

interface FavoriteContextType {
    doctors: DoctorsType[];
    toggleFavorite: (id: number, doctorData?: DoctorsType) => void;
    updateDoctors: (updatedDoctors: DoctorsType[]) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
    // Store all doctors (for reference) and favorites separately
    const [doctors, setDoctors] = useState<DoctorsType[]>([]);
    // Use ref for cache to avoid dependency issues
    const allDoctorsCache = useRef<Map<number, DoctorsType>>(new Map());

    // Load favorite doctors from API on mount
    useEffect(() => {
        const loadFavoriteDoctors = async () => {
            try {
                // ✅ Try to load from API first
                const result = await getFavoriteDoctors();
                console.log('[FavoriteContext] getFavoriteDoctors success:', result.doctors.length);
                
                // Mark all as favorite since they came from favorites API
                const favoriteDoctors = result.doctors.map((doc) => ({
                    ...doc,
                    isFavorite: true,
                    isFavourite: true
                }));
                
                setDoctors(favoriteDoctors);
            } catch (error) {
                console.warn('[FavoriteContext] Failed to load favorites from API, using localStorage:', error);
                
                // ✅ Fallback to localStorage if API fails
                const savedDoctors = localStorage.getItem('doctors');
                if (savedDoctors) {
                    try {
                        const parsed = JSON.parse(savedDoctors);
                        const hasFavorites = parsed.some(
                            (doc: DoctorsType) => doc.isFavorite === true || doc.isFavourite === true
                        );
                        if (hasFavorites || parsed.length > 0) {
                            setDoctors(parsed);
                        }
                    } catch (parseError) {
                        console.error('Error loading doctors from localStorage:', parseError);
                    }
                }
            }
        };

        void loadFavoriteDoctors();

        // Load cache of all doctors from localStorage
        const savedCache = localStorage.getItem('doctorsCache');
        if (savedCache) {
            try {
                const cacheArray = JSON.parse(savedCache);
                const cacheMap = new Map<number, DoctorsType>();
                cacheArray.forEach((doc: DoctorsType) => {
                    cacheMap.set(doc.id, doc);
                });
                allDoctorsCache.current = cacheMap;
            } catch (error) {
                console.error('Error loading doctors cache from localStorage:', error);
            }
        }
    }, []);

    // Save doctors to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('doctors', JSON.stringify(doctors));
    }, [doctors]);

    // Save cache to localStorage whenever doctors change (cache is updated via updateDoctors)
    useEffect(() => {
        const cacheArray = Array.from(allDoctorsCache.current.values());
        if (cacheArray.length > 0) {
            localStorage.setItem('doctorsCache', JSON.stringify(cacheArray));
        }
    }, [doctors]);

    const toggleFavorite = useCallback(async (id: number, doctorData?: DoctorsType) => {
        // Update local state first (optimistic update)
        // This ensures the UI updates immediately regardless of API status
        setDoctors((prevDoctors) => {
            const existingDoctor = prevDoctors.find((doc) => doc.id === id);

            if (existingDoctor) {
                // Doctor exists, toggle favorite status
                const newFavoriteStatus = !existingDoctor.isFavorite;

                // If removing from favorites, remove from list
                if (!newFavoriteStatus) {
                    return prevDoctors.filter((doc) => doc.id !== id);
                }

                // Otherwise, update favorite status
                return prevDoctors.map((doc) =>
                    doc.id === id
                        ? { ...doc, isFavorite: newFavoriteStatus, isFavourite: newFavoriteStatus }
                        : doc
                );
            } else {
                // Doctor doesn't exist, need to add it
                // Try to get doctor data from multiple sources
                let doctorToAdd: DoctorsType | undefined = doctorData;

                // If doctorData not provided, try to get it from cache
                if (!doctorToAdd) {
                    doctorToAdd = allDoctorsCache.current.get(id);
                }

                // If still not found, try to find it in previous doctors list
                if (!doctorToAdd) {
                    doctorToAdd = prevDoctors.find((doc) => doc.id === id);
                }

                if (doctorToAdd) {
                    // Doctor data found, add it with favorite = true
                    const newDoctor = {
                        ...doctorToAdd,
                        isFavorite: true,
                        isFavourite: true
                    };
                    return [...prevDoctors, newDoctor];
                } else {
                    // No doctor data available - this shouldn't happen if BtnFavorite works correctly
                    // But we'll log a warning and return unchanged
                    console.warn(`[FavoriteContext] Cannot add doctor ${id} - no data provided`);
                    return prevDoctors;
                }
            }
        });

        // ✅ Call API to sync favorite status with server
        try {
            const payloads = [
                { doctorId: id },
                { DoctorId: id },
                { id: id },
                { doctorProfileId: id }
            ];

            for (const payload of payloads) {
                const result = await toggleDoctorFavorite(payload as { doctorId: number });
                if (result.success) {
                    console.log('[FavoriteContext] toggleFavorite API success for doctor:', id);
                    break;
                }
            }
        } catch (error) {
            // Silently ignore - local state is already updated
            console.warn('[FavoriteContext] toggleFavorite API error (local state updated):', error);
        }
    }, []);

    const updateDoctors = useCallback((updatedDoctors: DoctorsType[]) => {
        // Update cache with all doctors (for reference when re-adding favorites)
        updatedDoctors.forEach((doc) => {
            allDoctorsCache.current.set(doc.id, doc);
        });

        // Merge new doctors with existing favorites
        // Preserve favorite status from localStorage
        setDoctors((prevFavorites) => {
            // Create a map of existing favorites for quick lookup
            const favoritesMap = new Map(prevFavorites.map((doc) => [doc.id, doc]));

            // Update favorites with new doctor data while preserving favorite status
            const updatedFavorites = updatedDoctors.map((newDoc) => {
                const existingFavorite = favoritesMap.get(newDoc.id);
                if (
                    existingFavorite &&
                    (existingFavorite.isFavorite || existingFavorite.isFavourite)
                ) {
                    // Preserve favorite status from localStorage
                    return {
                        ...newDoc,
                        isFavorite: true,
                        isFavourite: true
                    };
                }
                return newDoc;
            });

            // Add any favorites that are not in the new doctors list
            const missingFavorites = prevFavorites.filter(
                (fav) =>
                    (fav.isFavorite === true || fav.isFavourite === true) &&
                    !updatedDoctors.some((doc) => doc.id === fav.id)
            );

            return [...updatedFavorites, ...missingFavorites];
        });
    }, []);

    return (
        <FavoriteContext.Provider value={{ doctors, toggleFavorite, updateDoctors }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => {
    const context = useContext(FavoriteContext);
    if (context === undefined) {
        throw new Error('useFavorite must be used within a FavoriteProvider');
    }
    return context;
};
