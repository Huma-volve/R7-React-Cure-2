import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import type React from 'react';
import { Link } from 'react-router';

interface CardProps {
    image: string;
    imagePlaceholder: string;
    title: string;
    description: string;
    url: string;
    style: string[];
}

const steps: CardProps[] = [
    {
        imagePlaceholder: 'image1',
        title: 'Search for a Doctor',
        description:
            'Easily browse by specialty, location, or doctor name to find the right healthcare provider for your needs.',
        image: '/image/HowItWorks-1.png',
        url: '/doctors',
        style: ['']
    },
    {
        imagePlaceholder: 'image2',
        title: 'Choose a Date & Time',
        description:
            'View real-time availability and pick a slot that works best for your schedule.',
        image: '/image/HowItWorks-2.png',
        url: '/booking',
        style: ['h-[20rem] mb-[-112px]']
    },
    {
        imagePlaceholder: 'image3',
        title: 'Book & Pay Online',
        description:
            'Confirm your appointment and pay securely using various payment options—credit card, mobile wallet.',
        image: '/image/HowItWorks-3.png',
        url: '/booking',
        style: ['']
    }
];

const HowItWorks: React.FC = () => {
    return (
        <section className="lg:py-10 py-5 bg-white relative">
            <div className="container mx-auto px-4 text-center">
                {/* Section Title */}
                <h2
                    className="text-2xl md:text-[32px] font-semibold text-gray-900 lg:mb-12 mb-8"
                    style={{ fontFamily: 'var(--font-secondary)' }}
                >
                    How it works
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <Card
                            key={index}
                            className="group border border-[#99A2AB] rounded-[30px] p-0 overflow-hidden text-start justify-between transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-2"
                        >
                            {/* Image Placeholder */}
                            <Link to={step.url}>
                                <div
                                    className={`h-52 flex items-center justify-center ${step.style}`}
                                >
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="object-contain w-[90%] h-full"
                                    />
                                </div>
                            </Link>

                            <CardContent className="flex flex-col justify-start bg-white p-5 transition-all duration-300">
                                <Link to={step.url}>
                                    <CardTitle
                                        className="text-[16px] md:text-lg lg:text-xl font-semibold text-black transition-colors duration-300 group-hover:text-(--color-main)"
                                        style={{ fontFamily: 'var(--font-secondary)' }}
                                    >
                                        {step.title}
                                    </CardTitle>
                                    <CardDescription className="text-(--color-text)]text-sm md:text-base leading-relaxed">
                                        {step.description}
                                    </CardDescription>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
