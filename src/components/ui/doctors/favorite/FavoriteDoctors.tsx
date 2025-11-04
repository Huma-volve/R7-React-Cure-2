import { Link } from 'react-router-dom';
import { type DoctorsType } from '@/api/doctors/Doctors';
import BtnFavorite from './BtnFavorite';

interface FavoriteDoctorsProps {
    doctors: DoctorsType[];
    onSelect?: () => void;
}

const FavoriteDoctors = ({ doctors, onSelect }: FavoriteDoctorsProps) => {
    if (!doctors || doctors.length === 0) {
        return <p className="p-3 text-center text-gray-600">No doctors found.</p>;
    }

    return (
        <ul className="divide-y divide-gray-200">
            {doctors.map((doc) => (
                <li
                    key={doc.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <Link
                        to={`/doctors/${doc.id}`}
                        className="flex items-center gap-3 w-full"
                        onClick={onSelect}
                    >
                        <img
                            src={doc.image}
                            alt={doc.name}
                            className="rounded-2xl object-cover w-16 h-16"
                        />
                        <div className="flex flex-col">
                            <div className="sm:mb-2 mb-1">
                                <p
                                    className="text-black text-md sm:text-lg font-georgia"
                                    style={{
                                        fontFamily: 'var(--font-secondary)'
                                    }}
                                >
                                    {doc.name}
                                </p>
                                <p
                                    className="sm:text-sm text-[12px]"
                                    style={{ color: 'var(--color-text)' }}
                                >
                                    {doc.specialty}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 sm:text-sm text-[13px] text-black">
                                <div className="flex items-center gap-1">
                                    <img src="/icons/Star.svg" alt="rating" />
                                    <span>4.9</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <img src="/icons/Time.svg" alt="time" />
                                    <span>9:30am - 8:00pm</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <BtnFavorite id={doc.id} />
                </li>
            ))}
        </ul>
    );
};

export default FavoriteDoctors;
