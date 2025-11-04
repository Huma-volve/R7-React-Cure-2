import React, { useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';

interface BtnFavoriteProps {
    id: number;
}

const BtnFavorite: React.FC<BtnFavoriteProps> = ({ id }) => {
    const [favorites, setFavorites] = useState<number[]>([]);

    // Toggle favorite per doctor
    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
        );
    };

    return (
        <button onClick={() => toggleFavorite(id)} className="cursor-pointer">
            {favorites.includes(id) ? (
                <GoHeartFill className="text-[#FC4B4E] text-[20px]" />
            ) : (
                <GoHeart className="text-[20px]" />
            )}
        </button>
    );
};

export default BtnFavorite;
