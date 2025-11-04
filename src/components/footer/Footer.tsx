import { Link } from 'react-router';
import { Container } from '../ui/Container';

export default function Footer() {
    return (
        <footer className="relative py-14 lg:py-20 bg-[#05162C] text-white pb-10!">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-10 border-b border-white/10 pb-10 gap-8">
                    {/* --- Column 1: Brand Info (3 columns) --- */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="/icons/White-BsHeartPulse.svg"
                                alt="Cure Logo"
                                className="w-12.5 h-12.5 me-2"
                            />
                            <h3
                                className="text-[32px]"
                                style={{ fontFamily: 'var(--font-secondary)' }}
                            >
                                Cure
                            </h3>
                        </div>
                        <p
                            className="text-[20px] mb-6 leading-relaxed max-w-[360px]"
                            style={{ fontFamily: 'var(--font-secondary)' }}
                        >
                            Cure helps you find trusted doctors, book appointments, and manage your
                            health—quickly and easily.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-10 h-10 flex items-center justify-center">
                                <img src="/icons/facebook.svg" alt="" className="w-6 h-6" />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center">
                                <img src="/icons/whatsapp.svg" alt="" className="w-6 h-6" />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center">
                                <img src="/icons/youtube.svg" alt="" className="w-6 h-6" />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center">
                                <img src="/icons/linkedin.svg" alt="" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* --- Spacer column --- */}
                    <div className="hidden lg:block lg:col-span-1"></div>

                    {/* --- Column 2: Company --- */}
                    <div className="lg:col-span-2">
                        <h4
                            className="text-lg font-semibold mb-4"
                            style={{ fontFamily: 'var(--font-secondary)' }}
                        >
                            Company
                        </h4>
                        <ul className="space-y-2 text-white">
                            <li>
                                <Link to="/" className="hover:text-[#6292CF] transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="doctors" className="hover:text-[#6292CF] transition">
                                    Doctors
                                </Link>
                            </li>
                            <li>
                                <Link to="/faqs" className="hover:text-[#6292CF] transition">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link to="contact-us" className="hover:text-[#6292CF] transition">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* --- Column 3: Support --- */}
                    <div className="lg:col-span-2">
                        <h4
                            className="text-lg font-semibold mb-4"
                            style={{ fontFamily: 'var(--font-secondary)' }}
                        >
                            Support
                        </h4>
                        <ul className="space-y-2 text-white">
                            <li>
                                <Link to="/support" className="hover:text-[#6292CF] transition">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-[#6292CF] transition">
                                    How it works
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:text-[#6292CF] transition">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-[#6292CF] transition">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* --- Column 4: Contact Info --- */}
                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold mb-4 style={{ fontFamily: 'var(--font-secondary)' }}">
                            Contact Info
                        </h4>
                        <ul className="space-y-3 text-white text-sm">
                            <li className='flex items-start gap-2'>
                                <img src="/icons/phone.svg" alt="phone" className='w-4 h-4' />
                                <div>
                                    <h6 className='mb-1'>Phone</h6>
                                    <p>080 707 555-321</p>
                                </div>
                            </li>
                            <li className='flex items-start gap-2'>
                                <img src="/icons/mail-icon.svg" alt="mail" className='w-4 h-4' />
                                <div>
                                    <h6 className='mb-1'>Email</h6>
                                    <p>demo@example.com</p>
                                </div>
                            </li>
                            <li className='flex items-start gap-2'>
                                <img src="/icons/location-footer.svg" alt="location" className='w-4 h-4' />
                                <div>
                                    <h6 className='mb-1'>Address</h6>
                                    <p>526 Melrose Street, Water Mill, 11976 New York</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* --- Bottom Bar --- */}
                <div
                    className="flex flex-col md:flex-row items-center justify-between pt-6 text-white text-[16px]"
                    style={{ fontFamily: 'var(--font-secondary)' }}
                >
                    <p>©2024 Techvio - All Rights Reserved</p>
                    <div className="flex gap-4 mt-3 md:mt-0">
                        <Link to="/terms" className="hover:text-[#6292CF] transition">
                            Terms & Conditions
                        </Link>
                        <span>|</span>
                        <Link to="/privacy" className="hover:text-[#6292CF] transition">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
