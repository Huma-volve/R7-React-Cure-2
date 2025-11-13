import React from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useFavorite } from '@/context/FavoriteContext';
import { type DoctorsType } from '@/api/doctors/Doctors';
import { cn } from '@/lib/utils';

// نحاول نستورد الـ context بطريقة عادية
// لكن لو الملف مش موجود، نسيبه undefined (ممكن يحصل وقت الـ build)
let useDoctorsFilter: (() => { filteredDoctors: DoctorsType[] }) | undefined;
try {
    // dynamic import داخل try/catch
    useDoctorsFilter = (await import('@/context/DoctorsFilterContext')).useDoctorsFilter;
} catch {
    // ignore if context not found
}

interface BtnFavoriteProps {
    id: number;
    doctorData?: DoctorsType;
}

const BtnFavorite: React.FC<BtnFavoriteProps> = ({ id, doctorData }) => {
    const { doctors: favoriteDoctors, toggleFavorite } = useFavorite();

    // Try to get doctor data from DoctorsFilterContext if available
    let doctorFromContext: DoctorsType | undefined;
    if (useDoctorsFilter) {
        try {
            const { filteredDoctors } = useDoctorsFilter();
            doctorFromContext = filteredDoctors?.find((doc) => doc.id === id);
        } catch {
            // ignore context errors
        }
    }

    const doctor = doctorData || doctorFromContext || favoriteDoctors.find((doc) => doc.id === id);

    const favoriteDoc = favoriteDoctors.find((doc) => doc.id === id);
    const isFavorite = favoriteDoc?.isFavorite === true || favoriteDoc?.isFavourite === true;

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (doctor) {
            toggleFavorite(id, doctor);
        } else {
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
