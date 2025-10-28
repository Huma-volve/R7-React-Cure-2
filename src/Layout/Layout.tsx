import { lazy } from 'react';
import { Outlet } from "react-router-dom"
const Navbar = lazy(() => import('../components/navbar/Navbar'));
const Footer = lazy(() => import('../components/footer/Footer'));


export default function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}
