import { getProfile } from '@/api/profile/profile';
import type { AppDispatch, RootState } from '@/store/Store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserInfo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.profile);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    // ✅ Open file input when clicking icon
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    // ✅ Handle selected image
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log("Selected Image:", file);
        }
    };

    React.useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div className="flex flex-col gap-3">
            <div className="relative">
                <picture className="flex items-center  justify-center">
                    <img
                        className="w-28 h-28 rounded-full object-cover"
                        src="/icons/profile/profile.jpg"
                        alt="user image"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = "/icons/profile/fallback.jpg"; }}
                    />

                </picture>
                <nav onClick={handleImageClick} role="button" className="flex flex-col gap-2 items-center bg-[#ffffffce] rounded-full absolute z-50 bottom-0 right-9 p-2 cursor-pointer">
                    <img src="/icons/profile/addImage.svg" alt="icon" loading="lazy" />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                </nav>

            </div>

            <div className="flex flex-col items-center gap-2">
                <h1 className="noto-serif text-lg">{data?.fullName || "User Name"}</h1>

                <nav className="flex items-center gap-2">
                    <img src="/icons/profile/Location.svg" alt="location icon" loading="lazy" />
                    <span className="text-sm text-[#6D7379]">
                        {data?.address && data.address !== "" ? data.address : "129, El-Nasr Street, Cairo"}
                    </span>
                </nav>
            </div>
        </div>
    );
};

export default UserInfo;
