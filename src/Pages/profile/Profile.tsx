import Aside from '@/components/profileAside/Aside'
import ProfileForm from '@/components/profileAside/ProfileForm'
import React from 'react'

const Profile: React.FC = () => {
    return (
        <section className="md:py-8! py-6! px-8! md:px-12! w-full flex flex-col items-center md:flex-row gap-8 h-full">
            <Aside />
            <ProfileForm />
        </section>
    )
}

export default Profile
