import { Link } from 'react-router';
import { HamburgerMenu, Notifications, ProfileList } from '../common/navbar';
import SearchBar from '../common/SearchBar';
import { Container } from '../ui/Container';

export default function Navbar() {
    return (
        <nav className="lg:py-10 py-6 mb-3 z-999 bg-white relative">
            <Container className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4 gap-2">
                <div className="flex items-center justify-between w-full sm:w-auto sm:flex-none mb-2 sm:mb-0">
                    {/* Logo */}
                    <div className="logo">
                        <Link to="/" className="cursor-pointer">
                            <img src="/icons/BsHeartPulse.svg" alt="Logo" className="w-8 h-8" />
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
