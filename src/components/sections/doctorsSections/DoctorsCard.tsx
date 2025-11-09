import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface DoctorCardProps {
    id: number;
    name: string;
    image: string;
    specialty: string;
    hospital: string;
    rate: number;
    availability: string;
    price: number;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
    id,
    name,
    image,
    specialty,
    hospital,
    rate,
    availability,
    price
}) => {
    return (
        <CardContent className="p-0 group transition-all duration-300 shadow-[0_0_12px_rgba(0,0,0,0.1)] hover:shadow-[0_0_16px_rgba(0,0,0,0.2)] rounded-xl">
            <div className="p-4 flex flex-col h-full">
                {/* ====== Doctor Info ====== */}
                <div className="flex items-center gap-3 mb-3">
                    {/* Doctor Image */}
                    <Link to={`/doctordetails/${id}`} className="shrink-0">
                        <Avatar className="w-[70px] h-[70px] sm:w-[85px] sm:h-20 md:w-[95px] md:h-[90px] rounded-[10px] overflow-hidden cursor-pointer hover:scale-[1.05] transition-transform duration-300">
                            <AvatarImage
                                className="w-[97px] h-[88px] object-cover"
                                src={image}
                                alt={name}
                            />
                            <AvatarFallback className="bg-muted text-muted-foreground">
                                {name
                                    .split(' ')
                                    .map((n: any) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                    </Link>

                    {/* Doctor Details */}
                    <div className="flex-1 min-w-0">
                        <Link to={`/doctordetails/${id}`}>
                            <h3
                                className="text-[15px] sm:text-[16px] md:text-[17px] font-semibold truncate cursor-pointer transition-colors duration-300 group-hover:text-(--color-main)"
                                style={{ fontFamily: 'var(--font-secondary)' }}
                            >
                                {name}
                            </h3>
                        </Link>

                        <p className="text-[13px] sm:text-[14px] text-(--color-text) truncate">
                            {specialty} | {hospital}
                        </p>

                        <div className="flex items-center gap-2 mt-1 text-[13px] sm:text-[14px] flex-wrap">
                            <div className="flex items-center gap-1">
                                <img src="/icons/Star.svg" alt="" className="w-3.5 h-3.5" />
                                <span>{rate}</span>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                                <img src="/icons/Time.svg" alt="" className="w-3.5 h-3.5" />
                                <span className="text-muted-foreground">{availability}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ====== Price Section ====== */}
                <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-[16px]">
                        Price
                        <span className="text-[12px]">/hour</span>
                    </span>
                    <span className="text-[16px] text-[#FC4B4E]">${price}</span>
                </div>

                {/* ====== Booking Button ====== */}
                <Link to="/booking">
                    <Button className="w-full rounded-lg cursor-pointer bg-(--bg-main) text-white border border-(--bg-main) hover:text-(--bg-main) hover:bg-transparent duration-300">
                        Book appointment
                    </Button>
                </Link>
            </div>
        </CardContent>
    );
};

export default DoctorCard;
