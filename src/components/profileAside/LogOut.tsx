import type { AppDispatch } from '@/store/Store';
import { logout } from '@/services/auth/Auth'
import Cookies from 'js-cookie';
import React from 'react'
import { useDispatch } from 'react-redux';

const LogOut: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = async () => {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) return;

        try {
            await dispatch(logout({ refreshToken })).unwrap();
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            Cookies.remove("refreshToken");
            Cookies.remove("accessToken");
            window.location.reload();
        }
    };
    return (
        <button type="button" onClick={handleLogout} className='flex items-center  gap-2 p-2"'>
            <img src="/icons/profile/Logout 4.svg" alt="Logout icon" loading="lazy" />
            <p className='text-[#FC4B4E]'>Logout</p>
        </button>
    )
}

export default LogOut
