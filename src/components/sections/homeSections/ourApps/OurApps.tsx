import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import React from 'react';

const OurApps: React.FC = () => {
    return (
        <section className="relative z-2 lg:-mb-12 -mb-8">
            <Container>
                <div className="app bg-[#6292CF] rounded-[20px] py-3 px-5 grid md:grid-cols-2 grid-cols-1">
                    <div className="contentText">
                        <h2
                            className="md:text-[40px] text-[30px] text-white mb-2"
                            style={{ fontFamily: 'var(--font-secondary)' }}
                        >
                            Your Health, One Tap Away
                        </h2>
                        <p className='text-[13px] md:text-[17px] text-white'>Book appointments, chat with doctors, and manage your health anytime—right from your phone. Download the app now and stay connected wherever you are.</p>
                        <div className="flex items-center gap-4 flex-wrap mt-10">
                            <Button className='flex items-center bg-[#05162C] py-7 px-5 cursor-pointer hover:bg-[#283647] duration-300 text-white'>
                                <img src="/icons/logos_google-play-icon.svg" alt="" />
                                <div>
                                    <p className='md:text-[12px] text-[10px]'>Got IT ON</p>
                                    <h4 className='md:text-[20px] text-[16px]'>Google Play</h4>
                                </div>
                            </Button>
                            <Button className='flex items-center bg-[#05162C] py-7 px-5 cursor-pointer hover:bg-[#283647] duration-300 text-white'>
                                <img src="/icons/apple-icon.svg" alt="" />
                                <div>
                                    <p className='md:text-[12px] text-[10px]'>Got IT ON</p>
                                    <h4 className='md:text-[20px] text-[16px]'>Google Play</h4>
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div className="image max-w-[450px] max-h-[275px] overflow-hidden">
                        <img src="/image/iPhone 12 Pro.png" alt="iPhone 12 Pro" className='w-full h-full object-cover' />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default OurApps;
