import { getProfile } from '@/api/profile/profile';
import type { AppDispatch, RootState } from '@/store/Store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserInfo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.profile);

    React.useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col gap-3">
            <div className="relative">
                <picture className="flex items-center justify-center">
                    <img
                        className="rounded-full w-[100px] h-[100px] object-cover"
                        src={
                            data?.imgUrl
                                ? `/public/icons/profile/user.png`
                                : "/public/icons/profile/profile.jpg"
                        }
                        alt="user image"
                        loading="lazy"
                    />
                </picture>
                <nav className="flex flex-col gap-2 items-center bg-[#ffffffce] rounded-full absolute z-20 bottom-0 right-8 p-2 cursor-pointer">
                    <img src="/public/icons/profile/addImage.svg" alt="icon" loading="lazy" />
                </nav>
            </div>

            <div className="flex flex-col items-center gap-2">
                {/* ✅ الاسم الحقيقي من API */}
                <h1 className="noto-serif text-lg">{data?.fullName || "User Name"}</h1>

                {/* ✅ العنوان من API أو Placeholder */}
                <nav className="flex items-center gap-2">
                    <img src="/public/icons/profile/Location.svg" alt="location icon" loading="lazy" />
                    <span className="text-sm text-[#6D7379]">
                        {data?.address && data.address !== "" ? data.address : "129, El-Nasr Street, Cairo"}
                    </span>
                </nav>
            </div>
        </div>
    );
};

export default UserInfo;
