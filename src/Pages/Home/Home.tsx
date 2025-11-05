import Faq from '@/components/common/homeFaq/Faq';
import FindDoctors from '@/components/sections/homeSections/findDoctors/FindDoctors';
import HeroSection from '@/components/sections/homeSections/heroSection/HeroSection';
import HowItWorks from '@/components/sections/homeSections/howItWork/HowItWork';
import OurApps from '@/components/sections/homeSections/ourApps/OurApps';
import Reviews from '@/components/sections/homeSections/reviews/Reviews';
import TopRatedDoctors from '@/components/sections/homeSections/topRatedDoctors/TopRatedDoctors';

const Home = () => {
    return (
        <div className="relative overflow-visible bg-white">
            {/* Circles Background */}
            <div className="absolute inset-0 overflow-visible">
                {/* Large circle */}
                <img
                    src="/icons/lg-circle.svg"
                    alt="large circle"
                    className="absolute top-0 left-[50%] md:block hidden -translate-x-1/2"
                />
                {/* Medium circle */}
                <img
                    src="/icons/md-circle.svg"
                    alt="medium circle"
                    className="absolute top-[-140px] md:block hidden left-[50%] -translate-x-1/2"
                />
                {/* Small circle */}
                <img
                    src="/icons/sm-circle.svg"
                    alt="small circle"
                    className="absolute top-[70px] left-[50%] -translate-x-1/2"
                />
            </div>

            {/* Hero Section */}
            <HeroSection />

            {/* How It Work Section */}
            <HowItWorks />

            {/* Find Doctors Section */}
            <FindDoctors />

            {/* Top Rated Doctors Section */}
            <TopRatedDoctors />

            {/* Review Section */}
            <Reviews />

            {/* FAQS Section */}
            <Faq />


            {/* Our Apps Section */}
            <OurApps />
        </div>
    );
};

export default Home;
