import React from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useFavorite } from '@/context/FavoriteContext';
import { type DoctorsType } from '@/api/doctors/Doctors';
import { cn } from '@/lib/utils';

interface BtnFavoriteProps {
    id: number;
    doctorData?: DoctorsType;
}

const BtnFavorite: React.FC<BtnFavoriteProps> = ({ id, doctorData }) => {
    const { doctors: favoriteDoctors, toggleFavorite } = useFavorite();

    // Try to get doctor data from DoctorsFilterContext if available
    let doctorFromContext: DoctorsType | undefined;
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { useDoctorsFilter } = require('@/context/DoctorsFilterContext');
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { filteredDoctors } = useDoctorsFilter();
        doctorFromContext = filteredDoctors?.find((doc: DoctorsType) => doc.id === id);
    } catch {
        // DoctorsFilterContext not available, ignore
    }

    // Get doctor data - priority: provided data > context data > favorite doctors list
    const doctor = doctorData || doctorFromContext || favoriteDoctors.find((doc) => doc.id === id);

    // Check if doctor is favorite - ONLY check FavoriteContext (source of truth)
    const favoriteDoc = favoriteDoctors.find((doc) => doc.id === id);
    const isFavorite = favoriteDoc?.isFavorite === true || favoriteDoc?.isFavourite === true;

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Always pass doctor data if available
        // The cache in FavoriteContext will be used as fallback
        if (doctor) {
            toggleFavorite(id, doctor);
        } else {
            // If no doctor data, still try to toggle (cache will be used)
            toggleFavorite(id);
        }
    };

    return (
        <button
            onClick={handleToggle}
            className={cn(
                'cursor-pointer p-1.5 rounded-full transition-all duration-300',
                isFavorite ? 'bg-[#FC4B4E]/10 hover:bg-[#FC4B4E]/20' : 'hover:bg-gray-100'
            )}
        >
            {isFavorite ? (
                <GoHeartFill className="text-[#FC4B4E] text-[20px]" />
            ) : (
                <GoHeart className="text-[20px] text-gray-600" />
            )}
        </button>
    );
};

export default BtnFavorite;
