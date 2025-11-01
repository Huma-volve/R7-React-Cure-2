import { BsHeartPulse } from 'react-icons/bs';
import { Link } from 'react-router';
import { HamburgerMenu, Notifications, ProfileList } from '../common/navbar/';
import SearchBar from '../common/SearchBar';
import { Container } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="!py-10 flex items-center justify-between w-full">
            {/* Logo */}
            <div className="logo">
                <BsHeartPulse className="text-(--color-primary) text-3xl" />
            </div>
            {/* Search Bar */}
            <SearchBar />
            <div className="right-content flex align-center gap-4">
                {/* Menu List */}
                <HamburgerMenu />

                {/* Notification */}
                <Notifications />

                {/* Profile */}
                <ProfileList />
            </div>
            <Container className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4 gap-2">
                <div className="flex items-center justify-between w-full sm:w-auto sm:flex-none mb-2 sm:mb-0">
                    {/* Logo */}
                    <div className="logo">
                        <Link to="/" className="cursor-pointer">
                            <img
                                src="/icons/BsHeartPulse.svg"
                                alt="Logo"
                                className="w-8 h-8"
                            />
                        </Link>
                    </div>

                    {/* Right Content for Small Screen*/}
                    <div className="sm:hidden flex items-center gap-4">
                        <HamburgerMenu />
                        <Notifications />
                        <ProfileList />
                    </div>
                </div>

                {/* Search Bar*/}
                <div className="w-full sm:flex-1">
                    <SearchBar />
                </div>

                {/* Right Content for large screen*/}
                <div className="hidden sm:flex items-center gap-4">
                    <HamburgerMenu />
                    <Notifications />
                    <ProfileList />
                </div>
            </Container>
        </nav>
    );
}
