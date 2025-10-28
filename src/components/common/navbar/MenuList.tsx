import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-12 cursor-pointer bg-[#F5F6F7] border-0 shadow-none outline-none
                        focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none
                        hover:bg-[#E9EAEB] transition-colors duration-200"
                    >
                        {!isOpen ? (
                            <img
                                src="/assets/icons/MenuBar.svg"
                                width={16}
                                height={12}
                                alt="Menu Icon"
                            />
                        ) : (
                            <img
                                src="/assets/icons/CloseMenu.svg"
                                width={11}
                                height={11}
                                alt="Menu Icon"
                            />
                        )}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="w-auto border-0 p-0 shadow-none"
                    align="end"
                    side="left"
                >
                    <DropdownMenuGroup className="flex items-center gap-2 px-2">
                        <DropdownMenuItem asChild className="bg-[#F5F6F7] cursor-pointer p-2">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `transition-colors duration-200 ${
                                        isActive
                                            ? 'text-(--color-main)! font-semibold'
                                            : 'text-black'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="bg-[#F5F6F7] cursor-pointer p-2">
                            <NavLink
                                to="/booking"
                                className={({ isActive }) =>
                                    `transition-colors duration-200 ${
                                        isActive
                                            ? 'text-(--color-main)! font-semibold'
                                            : 'text-black'
                                    }`
                                }
                            >
                                Booking
                            </NavLink>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default HamburgerMenu;
