import Aside from '@/components/profileAside/Aside'
import ProfileForm from '@/components/profileAside/ProfileForm'
import { Container } from '@/components/ui/Container'
import React from 'react'

const Profile: React.FC = () => {
    return (
        <section className='h-screen'>
            <Container className="flex flex-col items-center md:flex-row  h-full gap-8 w-full">
                <Aside />
                <ProfileForm />
            </Container>
        </section>
    )
}

export default Profile
