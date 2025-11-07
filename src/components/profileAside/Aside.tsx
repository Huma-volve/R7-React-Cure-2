import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import UserInfo from './UserInfo'
import Cookies from 'js-cookie'
import type { AppDispatch } from "@/store/Store";
import { useDispatch } from 'react-redux'
import { logout } from '@/services/auth/Auth'

const Aside: React.FC = () => {
    const navigate = useNavigate()
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
            navigate("/login");
            window.location.reload();
        }
    };


    return (
        <aside className='flex flex-col items-center gap-12 h-auto w-full md:w-[25%]  bg-[#F5F6F7] rounded-lg py-16! px-4! '>
            <UserInfo />
            <div className=" flex-col gap-4 w-full hidden md:flex">
                <NavLink aria-current="page" to="/profile" className='flex items-center gap-2  border border-[#6D7379] p-2! rounded-lg'><img src="/icons/profile/User Rounded.svg" alt="user icon" loading="lazy" />
                    <p>Personal information</p>
                </NavLink>
                <NavLink to="/payment" className='flex items-center gap-2  border border-[#6D7379] p-2! rounded-lg'><img src="/icons/profile/Banknote 3.svg" alt="bank icon" loading="lazy" />
                    <p>Payment Method</p>
                </NavLink>
                <NavLink to="/favorites" className='flex items-center gap-2  border border-[#6D7379] p-2! rounded-lg'><img src="/icons/profile/hart.svg" alt="like icon" loading="lazy" />
                    <p>Favorite</p>
                </NavLink>
                <NavLink to="/privacy" className='flex items-center gap-2  border border-[#6D7379] p-2! rounded-lg'><img src="/icons/profile/Lock Keyhole Minimalistic.svg" alt="lock icon" loading="lazy" />
                    <p>Privacy Policy</p>
                </NavLink>
                <button onClick={handleLogout} className='flex items-center  gap-2 p-2"'>
                    <img src="/icons/profile/Logout 4.svg" alt="Logout icon" loading="lazy" />
                    <p className='text-[#FC4B4E]'>Logout</p>
                </button>
            </div>
        </aside>
    )
}

export default Aside
