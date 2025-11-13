import { getProfile } from '@/api/profile/profile';
import LogOut from '@/components/profileAside/LogOut';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { AppDispatch, RootState } from '@/store/Store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.profile);

    // ✅ Open file input when clicking icon


    React.useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="w-12 cursor-pointer border-0 p-0 shadow-none outline-none
                        focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none
                        transition-colors duration-200 hover:bg-transparent"
                >
                    <img src="/image/Profile-image.png" alt="Profile" loading='lazy' />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-75 sm:w-89 bg-[#F5F6F7] pt-4 relative z-9999 rounded-xl border-0 mt-2 mr-4"
                align="center"
                side="bottom"
                sideOffset={10}
            >
                <DropdownMenuGroup>
                    <div className="flex items-center mb-4 justify-between gap-2 px-2">
                        <Link to="/profile" className="flex items-center gap-2">
                            <div className="profile-info">
                                <p className="font-semibold sm:text-[20px] text-[18px]" style={{ fontFamily: "var(--font-secondary)" }}>{data?.fullName}</p>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <img
                                        src="/icons/LocationPerson.svg"
                                        alt="Location icon"
                                        loading='lazy'
                                    />
                                    <span className='text-[12px] sm:text-[14px]'>{data?.address}</span>
                                </p>
                            </div>
                        </Link>
                    </div>

                    <Link to="/payment">
                        <DropdownMenuItem className="mb-3 cursor-pointer text-[16px] hover:bg-gray-300! transition-colors">
                            <img src="/icons/Banknote 3.svg" alt="Payment Method" loading='lazy' />
                            Payment Method
                            <DropdownMenuShortcut>
                                <img
                                    src="/icons/solar_alt-arrow-right-linear.svg"
                                    alt="arrow right icon"
                                    loading='lazy'
                                />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>

                    <Link to="/favorites">
                        <DropdownMenuItem className="mb-3 cursor-pointer hover:bg-gray-300! transition-colors">
                            <img src="/icons/Favorite.svg" alt="Favorite" />
                            Favorite
                            <DropdownMenuShortcut>
                                <img
                                    src="/icons/solar_alt-arrow-right-linear.svg"
                                    alt="arrow right icon"
                                    loading='lazy'
                                />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>


                    <Link to="/privacy">
                        <DropdownMenuItem className="mb-3 cursor-pointer text-[16px] hover:bg-gray-300! transition-colors">
                            <img src="/icons/Lock Keyhole Minimalistic.svg" alt="Privacy" loading='lazy' />
                            Privacy Policy
                            <DropdownMenuShortcut>
                                <img
                                    src="/icons/solar_alt-arrow-right-linear.svg"
                                    alt="arrow right icon"
                                    loading='lazy'
                                />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>

                <DropdownMenuItem className="text-[#FC4B4E]! font-semibold text-[16px] hover:bg-gray-300! cursor-pointer transition-colors">
                    <LogOut />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileList;
