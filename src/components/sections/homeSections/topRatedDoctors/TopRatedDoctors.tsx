import { DoctorsList } from '@/api/doctors/Doctors';
import { Container } from '@/components/ui/Container';
import React from 'react';
import { Link } from 'react-router';
import DoctorsCard from '../../doctorsSections/DoctorsCard';
import { Carousel, CarouselContent } from '@/components/ui/carousel';

const TopRatedDoctors: React.FC = () => {
    return (
        <section className="relative py-15 sm:py-20 overflow-hidden">
            <Container>
                <div className="topDoctors">
                    <div className="TextContent flex items-center justify-between mb-5">
                        <div>
                            <h2
                                className="md:text-[40px] text-3xl mb-3"
                                style={{ fontFamily: 'var(--font-secondary)' }}
                            >
                                Top-Rated Doctors Chosen by Patients
                            </h2>
                            <p className="text-(--color-text) md:text-[20px] text-[17px] md:max-w-2xl mb-3">
                                Explore our highest-rated doctors, trusted by real patients for
                                their expertise, care, and service. Book with confidence today.
                            </p>
                        </div>
                        <Link
                            to="/topDoctors"
                            className="text-(--bg-main) border border-(--bg-main) hover:bg-(--bg-main) hover:text-white duration-300 py-3 px-4 rounded-[10px]"
                        >
                            View All
                        </Link>
                    </div>
                </div>
            </Container>
            {/* Cards Full Width Start */}
            <div className="relative w-screen max-w-none -mr-[calc((100vw-theme('spacing.container'))/2)] right-1/2 translate-x-1/2 pr-0 sm:pr-[unset]">
                <div className="cardsContent">
                    <Carousel className="w-full overflow-visible">
                        <CarouselContent className="py-5 lg:ps-30 ps-10 pe-8 sm:pe-0 gap-5">
                            {DoctorsList.map((doctor) => (
                                <DoctorsCard key={doctor.id} {...doctor} />
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default TopRatedDoctors;
