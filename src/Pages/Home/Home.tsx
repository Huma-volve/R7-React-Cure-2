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
            <div className="absolute inset-0 overflow-visible">
                <img
                    src="/icons/lg-circle.svg"
                    alt="large circle"
                    className="absolute top-0 left-[50%] md:block hidden -translate-x-1/2"
                />
                =                <img
                    src="/icons/md-circle.svg"
                    alt="medium circle"
                    className="absolute top-[-140px] md:block hidden left-[50%] -translate-x-1/2"
                />
                <img
                    src="/icons/sm-circle.svg"
                    alt="small circle"
                    className="absolute top-[70px] left-[50%] -translate-x-1/2"
                />
            </div>

            <HeroSection />

            <HowItWorks />

            <FindDoctors />

            <TopRatedDoctors />

            <Reviews />

            <Faq />

            <OurApps />
        </div>
    );
};

export default Home;
