import React from 'react'
import { NavLink } from 'react-router'
import UserInfo from './UserInfo'
import LogOut from './LogOut'

const Aside: React.FC = () => {
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
                <LogOut />
            </div>
        </aside>
    )
}

export default Aside
