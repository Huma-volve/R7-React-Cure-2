import { Container } from '@/components/ui/Container';
import DoctorMapComponent from '@/components/Doctor/DoctorMapComponent';
import { Link } from 'react-router';

const FindDoctors: React.FC = () => {
    return (
        <section className="relative py-15 sm:py-20">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                    <div className="text-content mb-4">
                        <h2
                            className="md:text-[40px] text-3xl mb-3"
                            style={{ fontFamily: 'var(--font-secondary)' }}
                        >
                            Find Care Near You <br /> in Seconds
                        </h2>
                        <p className="text-(--color-text) md:text-[20px] text-[17px] md:max-w-md mb-3">
                            Allow location access or choose your city to instantly discover trusted
                            doctors and clinics around you—quick, easy, and local.
                        </p>
                        <Link
                            to="/map"
                            className="flex items-center gap-2 w-fit text-(--bg-main) border hover:border-black  border-(--bg-main) hover:text-black font-medium duration-300 py-3 px-4 rounded-[10px]"
                        >
                            <img src="/icons/Search-location.svg" alt="Search Icon" />
                            <span>Search by location</span>
                        </Link>
                    </div>
                    <div className="map-content relative max-w-[583px] w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[547px] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] overflow-hidden">
                        <DoctorMapComponent />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FindDoctors;
