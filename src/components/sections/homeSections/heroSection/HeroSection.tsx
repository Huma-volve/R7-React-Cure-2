import { Avatar, AvatarImage } from '@/components/ui/avatar';
// import { Container } from '@/components/ui/Container';
import { Link } from 'react-router';

const HeroSection = () => {
    return (
        <div className="relative w-full sm:h-[80vh] h-screen overflow-hidden lg:p-20 p-10">
            {/* <Container className="flex items-center justify-center"> */}
                <div className="content text-center relative">
                    <div className="flex items-center m-auto rounded-4xl py-2 px-4 mb-2 bg-[#E8EFF8] w-fit">
                        <img
                            src="/icons/Upgrade account.svg"
                            alt="Upgrade account"
                            className="mr-1"
                        />
                        <span className="text-[12px]">Upgrade your account</span>
                    </div>
                    <h3
                        className="text-[35px] sm:text-[40px] mb-3"
                        style={{ fontFamily: 'var(--font-secondary)' }}
                    >
                        Find and book top doctors near yor
                    </h3>
                    <p className="text-[17px] sm:text-[20px] text-(--color-text) max-w-lg mb-4 m-auto">
                        Easily find top-rated specialists near you and book appointments in just a
                        few clicks. Whether you need an in-person visit consultation, we're here to
                        connect you with the right care—fast, simple, and secure.
                    </p>
                    <div className="flex items-center m-auto rounded-4xl py-2 px-4 mb-5 bg-[#E8EFF8] w-fit">
                        <div className=" flex -space-x-4 mr-2 ">
                            <Avatar>
                                <AvatarImage src="/image/Profile-image.png" alt="person one" />
                            </Avatar>
                            <Avatar>
                                <AvatarImage src="/image/person-1.png" alt="person two" />
                            </Avatar>
                            <Avatar>
                                <AvatarImage src="/image/person-2.png" alt="person three" />
                            </Avatar>
                        </div>
                        <span className="text-[14px]">10k+ happy patients </span>
                    </div>
                    <div className="flex items-center justify-center sm:flex-row flex-col gap-3 text-[14px]">
                        <Link
                            to="/doctors"
                            className="py-3.5 px-15 bg-(--bg-main) text-white hover:text-(--bg-main) duration-300 font-medium hover:bg-white border rounded-[10px] border-(--bg-main)"
                        >
                            Get started
                        </Link>
                        <Link
                            to="/booking"
                            className="group text-(--bg-main) border border-(--bg-main) hover:text-white hover:bg-(--bg-main) font-medium duration-300 py-3 px-4 rounded-[10px]"
                        >
                            <div className="flex items-center gap-2">
                                <img
                                    src="/icons/calender.svg"
                                    alt=""
                                    className="transition duration-300 group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
                                />
                                <span>Book Appointment</span>
                            </div>
                        </Link>
                    </div>
                    <div className="absolute hidden lg:left-[-180px] md:left-[-70px] top-[70%] -translate-y-1/2 md:flex flex-col items-center justify-center">
                        <img
                            src="/icons/location.svg"
                            alt="Location icon"
                            className="shadow-[#00000029] -mb-[15px]"
                        />
                        <span className="py-2 px-4 bg-[#F5F6F7] shadow-[0px_2px_12px_rgba(0, 0, 0, 0.1)] rounded-[23px]">
                            Doctors near you
                        </span>
                    </div>
                    <div className="absolute hidden lg:-right-5 lg:-bottom-20 md:right-0 md:-bottom-20 md:flex flex-col items-center justify-center">
                        <img
                            src="/icons/mouse.svg"
                            alt="Mouse icon"
                            className="shadow-[#00000029]"
                        />
                        <span className="block relative top-[-25px] right-[-70px] rotate-30 py-2 px-4 bg-[#F5F6F7] shadow-[0px_2px_12px_rgba(0, 0, 0, 0.1)] rounded-[23px]">
                            Book Now
                        </span>
                    </div>
                </div>
            {/* </Container> */}
        </div>
    );
};

export default HeroSection;
