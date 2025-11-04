import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

const ProfileList = () => {
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
                            <img
                                src="/image/Profile-image.png"
                                alt="Profile"
                                className="w-15 h-15 rounded-full"
                                loading='lazy'
                            />
                            <div className="profile-info">
                                <p className="font-semibold sm:text-[20px] text-[18px]" style={{ fontFamily: "var(--font-secondary)" }}>John Doe</p>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <img
                                        src="/icons/LocationPerson.svg"
                                        alt="Location icon"
                                        loading='lazy'
                                    />
                                    <span className='text-[12px] sm:text-[15px]'>129,El-Nasr Street, Cairo</span>
                                </p>
                            </div>
                        </Link>
                        <Link to="/settings">
                            <img src="/icons/Settings.svg" alt="Settings" loading='lazy' />
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

                    <Link to="/settings">
                        <DropdownMenuItem className="mb-3 cursor-pointer text-[16px] hover:bg-gray-300! transition-colors">
                            <img src="/icons/Settings-1.svg" alt="Settings" loading='lazy' />
                            Settings
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
                    <img src="/icons/Logout 4.svg" alt="Logout" loading='lazy' />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileList;
