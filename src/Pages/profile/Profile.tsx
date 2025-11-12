import Aside from '@/components/profileAside/Aside'
import ProfileForm from '@/components/profileAside/ProfileForm'
import { Container } from '@/components/ui/Container'
import React from 'react'

const Profile: React.FC = () => {
    return (
        <section className=' min-h-screen pt-8 pb-16'>
            <Container className="flex flex-col items-center h-full md:flex-row gap-8 w-full">
                <Aside />
                <ProfileForm />
            </Container>
        </section>
    )
}

export default Profile
