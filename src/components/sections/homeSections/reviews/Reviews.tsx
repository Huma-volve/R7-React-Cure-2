import React from 'react';

const reviews = [
    {
        name: 'Amr Sherif',
        image: '/image/review.png',
        rating: 5,
        text: `Quick and easy booking! I found a great dermatologist near me and booked an appointment in just a few minutes.`
    },
    {
        name: 'Mohamed Nasser',
        image: '/image/review-1.png',
        rating: 4,
        text: `Very professional doctors and great customer support. Highly recommended!`
    },
    {
        name: 'Laila Ahmed',
        image: '/image/review-2.png',
        rating: 5,
        text: `Booking process was smooth, and I got my consultation the same day. Amazing platform!`
    },
    {
        name: 'Mohamed Ali',
        image: '/image/review-3.png',
        rating: 5,
        text: `The platform helped me find a specialist without any hassle. Thank you!`
    },
    {
        name: 'Mostafa Hatem',
        image: '/image/review-4.png',
        rating: 5,
        text: `Best experience ever! The doctor was kind and very knowledgeable.`
    }
];

const clampIndex = (n: number, len: number) => {
    // wrap-around positive
    return ((n % len) + len) % len;
};

const Reviews: React.FC = () => {
    const len = reviews.length;
    const [active, setActive] = React.useState(2); // start with middle-ish
    const autoplayRef = React.useRef<number | null>(null);

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const offsets = isMobile ? [-1, 0, 1] : [-2, -1, 0, 1, 2];

    // autoplay loop
    // React.useEffect(() => {
    //     autoplayRef.current = window.setInterval(() => {
    //         setActive((s) => clampIndex(s + 1, len));
    //     }, 3800);
    //     return () => {
    //         if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    //     };
    // }, [len]);

    // pause on hover
    const handleMouseEnter = () => {
        if (autoplayRef.current) window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
    };
    const handleMouseLeave = () => {
        if (!autoplayRef.current) {
            autoplayRef.current = window.setInterval(() => {
                setActive((s) => clampIndex(s + 1, len));
            }, 3800);
        }
    };

    return (
        <section className="py-14 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto text-center px-4">
                <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#152233] font-medium mb-6 leading-tight"
                    style={{ fontFamily: 'var(--font-secondary)' }}
                >
                    Reviews
                    <br />
                    That Speak for Themselves
                </h2>

                {/* stars based on active rating */}
                <div className="flex justify-center mb-4">
                    {Array.from({ length: reviews[active].rating }).map((_, i) => (
                        <div key={i} className="w-6 h-6">
                            <img
                                src="/icons/review star.svg"
                                alt="review star"
                                className="w-full h-full"
                            />
                        </div>
                    ))}
                </div>

                {/* review text */}
                <blockquote className="max-w-2xl mx-auto text-[#505462] text-base md:text-lg mb-10 px-2">
                    “{reviews[active].text}”
                </blockquote>

                {/* avatars row */}
                <div
                    className="relative flex justify-center items-center mt-8"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* container that holds the circular avatars in a centered row */}
                    <div className="w-full max-w-4xl mx-auto flex justify-center items-end relative h-[150px] md:h-[200px]">
                        {offsets.map((offset) => {
                            const idx = clampIndex(active + offset, len);
                            const item = reviews[idx];

                            // classes based on offset (0 center, ±1 nearby, ±2 far)
                            // center = bigger and lifted
                            // ±1 = medium and a bit lower
                            // ±2 = small and lowest
                            let sizeCls = 'w-12 h-12 md:w-20 md:h-20'; // default small
                            let translateY = 'translate-y-6 md:translate-y-8';
                            let z = 10; // stacking

                            if (offset === 0) {
                                sizeCls = 'w-20 h-20 md:w-36 md:h-36';
                                translateY = '-translate-y-6 md:-translate-y-8';
                                z = 30;
                            } else if (Math.abs(offset) === 1) {
                                sizeCls = 'w-16 h-16 md:w-28 md:h-28';
                                translateY = 'translate-y-8 md:translate-y-0';
                                z = 20;
                            } else if (Math.abs(offset) === 2) {
                                sizeCls = 'w-15 h-15 md:w-20 md:h-20';
                                translateY = 'translate-y-10 md:translate-y-4';
                                z = 15;
                            }

                            // horizontal spacing: use offset multiplier to spread left/right
                            // multiply by 75% of md width to visually space on large screens
                            const leftPercent = 50 + offset * (offset === 0 ? 0 : 18); // simple spacing that centers
                            // We'll place absolute positions so items overlap nicely
                            // compute inline style for horizontal position in percent
                            const style: React.CSSProperties = {
                                left: `${leftPercent}%`,
                                transform: undefined // we use class transforms for y scaling
                            };

                            // Add scale slightly for active
                            const scaleCls = offset === 0 ? 'scale-105 md:scale-110' : 'scale-100';

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActive(idx)}
                                    aria-label={`Show review by ${item.name}`}
                                    className={`absolute -translate-x-1/2 transition-all duration-500 ease-out transform ${translateY} ${scaleCls}`}
                                    style={{ ...style, zIndex: z }}
                                >
                                    <div
                                        className={`rounded-full overflow-hidden border-4 cursor-pointer border-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] ${sizeCls} flex items-center justify-center bg-gray-100`}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* name of active reviewer */}
                {/* <div className="mt-6 text-[#152233] text-lg md:text-xl font-medium">
                    {reviews[active].name}
                </div> */}
            </div>
        </section>
    );
};

export default Reviews;
