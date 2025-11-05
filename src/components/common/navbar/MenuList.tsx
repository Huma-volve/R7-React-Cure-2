import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

interface menuType {
    id: number;
    name: string;
    link: string;
}

const MenuPages: menuType[] = [
    { id: 1, name: 'Home', link: '/' },
    { id: 2, name: 'Doctors', link: '/doctors' },
    { id: 3, name: 'Booking', link: '/booking' },
    { id: 4, name: 'Contact Us', link: '/contact-us' },
];

const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

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
                            <img src="/icons/MenuBar.svg" width={16} height={12} alt="Menu Icon" />
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
                    className="w-auto border-0 relative z-[9999] p-0"
                    align="center"
                    side="bottom"
                >
                    <DropdownMenuGroup className="flex items-center flex-col bg-white">
                        {MenuPages.map((item) => {
                            const isActive = location.pathname === item.link;
                            return (
                                <DropdownMenuItem
                                    key={item.id}
                                    asChild
                                    className={`hover:bg-[#F5F6F7] cursor-pointer p-3 block w-full text-center transition-colors duration-200 ${isActive
                                            ? 'text-[var(--color-main)] font-semibold'
                                            : 'text-black'
                                        }`}
                                >
                                    <Link
                                        to={item.link}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default HamburgerMenu;
