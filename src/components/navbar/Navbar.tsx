import { BsHeartPulse } from 'react-icons/bs';
import { MenuList, Notifications, ProfileList } from '../common/navbar';
// import SearchBar from '../common/SearchBar';

export default function Navbar() {
    return (
        <nav className="py-10">
            {/* Logo */}
            <div className="logo">
                <BsHeartPulse className="text-(--color-primary) text-3xl" />
            </div>
            {/* Search Bar */}
            {/* <SearchBar /> */}
            <div className="right-content flex align-center gap-4">
                {/* Menu List */}
                <MenuList />

                {/* Notification */}
                <Notifications />

                {/* Profile */}
                <ProfileList />
            </div>
        </nav>
    );
}
