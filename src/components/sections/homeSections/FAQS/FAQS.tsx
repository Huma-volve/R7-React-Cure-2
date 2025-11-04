import { Container } from '@/components/ui/Container';
import React from 'react';

const FAQS: React.FC = () => {
    return (
        <section className="relative py-14 md:py-20">
            <Container>
                <div className="title text-center">
                    <div className="flex items-center m-auto rounded-4xl py-2 px-4 mb-2 bg-[#E8EFF8] w-fit">
                        <span className="sm:text-[14px] text-[12px] text-(--color-main)">
                            Frequently Asked Questions
                        </span>
                    </div>
                    <h2
                        className="md:text-[40px] text-[30px]"
                        style={{ fontFamily: 'var(--font-secondary)' }}
                    >
                        Got Questions ? We’ve got Answers!
                    </h2>
                </div>
            </Container>
        </section>
    );
};

export default FAQS;
