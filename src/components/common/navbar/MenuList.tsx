import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
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
                                src="/icons/MenuBar.svg"
                                width={16}
                                height={12}
                                alt="Menu Icon"
                            />
                        ) : (
                            <img
                                src="/icons/CloseMenu.svg"
                                width={11}
                                height={11}
                                alt="Close Icon"
                            />
                        )}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="w-48 border bg-white rounded-md shadow-lg"
                    align="end"
                    side="left"
                >
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `block w-full px-3 py-2 transition-colors duration-200 ${isActive
                                        ? 'text-[var(--color-main)] font-semibold'
                                        : 'text-black'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `block w-full px-3 py-2 transition-colors duration-200 ${isActive
                                        ? 'text-[var(--color-main)] font-semibold'
                                        : 'text-black'
                                    }`
                                }
                            >
                                About
                            </NavLink>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <NavLink
                                to="/services"
                                className={({ isActive }) =>
                                    `block w-full px-3 py-2 transition-colors duration-200 ${isActive
                                        ? 'text-[var(--color-main)] font-semibold'
                                        : 'text-black'
                                    }`
                                }
                            >
                                Services
                            </NavLink>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    `block w-full px-3 py-2 transition-colors duration-200 ${isActive
                                        ? 'text-[var(--color-main)] font-semibold'
                                        : 'text-black'
                                    }`
                                }
                            >
                                Contact
                            </NavLink>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <NavLink
                                to="/booking"
                                className={({ isActive }) =>
                                    `block w-full px-3 py-2 transition-colors duration-200 ${isActive
                                        ? 'text-[var(--color-main)] font-semibold'
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
