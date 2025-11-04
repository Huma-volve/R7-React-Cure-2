import { useState, useEffect } from 'react';
import type { SpecialtyType } from '@/api/doctors/specialties';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface SpecialtiesCarouselProps {
    specialties: SpecialtyType[];
    selectedSpecialty: string;
    onSelect: (name: string) => void;
}

const SpecialtiesCarousel: React.FC<SpecialtiesCarouselProps> = ({
    specialties,
    selectedSpecialty,
    onSelect
}) => {
    const [api, setApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());

        api.on('select', () => {
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        });
    }, [api]);

    return (
        <div>
            <h2
                className="md:text-[24px] text-[18px] mb-3"
                style={{ fontFamily: 'var(--font-secondary)' }}
            >
                Choose Specialties
            </h2>

            <div className="relative">
                <Carousel setApi={setApi} className="w-full">
                    <CarouselContent className="-ml-2 py-3 md:-ml-4">
                        {specialties.map((spec) => (
                            <CarouselItem key={spec.id} className="pl-2 basis-auto md:pl-4">
                                <Card
                                    className={cn(
                                        'cursor-pointer border transition-all hover:shadow-md rounded-2xl p-0 relative w-fit',
                                        selectedSpecialty === spec.name
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200'
                                    )}
                                    onClick={() => onSelect(spec.name)}
                                >
                                    <CardContent className="flex items-center gap-2 px-3 py-2 whitespace-nowrap">
                                        <img
                                            src={spec.image}
                                            alt={spec.name}
                                            className="w-5 h-5 object-contain opacity-70 shrink-0"
                                        />
                                        <p className="text-sm text-(--color-text) font-medium truncate max-w-[120px] md:max-w-[150px]">
                                            {spec.name}
                                        </p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons Overlay */}
                    {canScrollPrev && (
                        <button
                            onClick={() => api?.scrollPrev()}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-300 hover:bg-gray-50 shadow-lg hover:shadow-xl h-10 w-10 rounded-full flex items-center justify-center transition-all pointer-events-auto cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                    )}

                    {canScrollNext && (
                        <button
                            onClick={() => api?.scrollNext()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-300 hover:bg-gray-50 shadow-lg hover:shadow-xl h-10 w-10 rounded-full flex items-center justify-center transition-all pointer-events-auto cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    )}
                </Carousel>
            </div>
        </div>
    );
};

export default SpecialtiesCarousel;
