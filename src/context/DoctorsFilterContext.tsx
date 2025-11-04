import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DoctorsList, type DoctorsType } from '@/api/doctors/Doctors';
import { specialtiesMock, type SpecialtyType } from '@/api/doctors/specialties';

interface DoctorsFilterContextType {
    // State
    searchTerm: string;
    filteredDoctors: DoctorsType[];
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
}

const DoctorsFilterContext = createContext<DoctorsFilterContextType | undefined>(undefined);

export const DoctorsFilterProvider = ({ children }: { children: ReactNode }) => {
    const [params] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState<DoctorsType[]>(DoctorsList);
    const [selectedGender, setSelectedGender] = useState<'Male' | 'Female' | 'All'>('All');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [specialties] = useState<SpecialtyType[]>(specialtiesMock);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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

    // handle filters logic
    useEffect(() => {
        let filtered = DoctorsList;

        if (searchTerm.trim()) {
            filtered = filtered.filter(
                (doc) =>
                    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedGender !== 'All') {
            filtered = filtered.filter((doc) => doc.gender === selectedGender);
        }

        if (selectedSpecialty) {
            filtered = filtered.filter((doc) => doc.specialty === selectedSpecialty);
        }

        setFilteredDoctors(filtered);
    }, [searchTerm, selectedGender, selectedSpecialty]);

    return (
        <DoctorsFilterContext.Provider
            value={{
                searchTerm,
                filteredDoctors,
                selectedGender,
                selectedSpecialty,
                specialties,
                isFilterOpen,
                setSearchTerm,
                setSelectedGender,
                setSelectedSpecialty,
                setIsFilterOpen,
                toggleFilter,
                handleSpecialtySelect
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
