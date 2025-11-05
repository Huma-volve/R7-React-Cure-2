// components/DoctorInfoSidebar.tsx
import React from 'react';
import { VerifiedBadgeIcon } from './icons';
import AboutSection from './AboutSection';
import DoctorStats from './DoctorStats/DoctorStats';

interface DoctorInfoSidebarProps {
  doctor: {
    id: number;
    fullName: string;
    about: string;
    imgUrl: string;
    specialityId?: number;
    specialistTitle?: string;
    address: string;
    rating: number;
    distance?: number | null;
    isFavourite?: boolean;
    price?: number;
    pricePerHour?: number;
    startDate?: string | null;
    endDate?: string | null;
    specialities: string | string[];
    experienceYears?: number;
    email?: string;
    reviewsCount?: number;
    bookingCount?: number;
  }
  showMore: boolean;
  setShowMore: (value: boolean) => void;
  text?: string;
}

const DoctorInfoSidebar: React.FC<DoctorInfoSidebarProps> = ({ doctor, text, showMore, setShowMore }) => {
  return (
    <div className="bg-[#F5F6F7] rounded-lg p-6 shadow-sm h-fit relative z-1 fixed">
      <div className="flex items-start justify-center mb-4">
        <div className="flex gap-3 flex-col">
          {/* Doctor Profile Image */}
          <div className="relative">
            <div className="p-[3px] rounded-full bg-linear-to-tl from-blue-900 to-transparent w-30 h-30 flex items-center justify-center">
              <img
                src={doctor.imgUrl || '/images/Dr.JessicaTurner.jpg'}
                alt={doctor.fullName || 'Doctor'}
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-[-2px] bg-white/40 rounded-full p-1">
              <VerifiedBadgeIcon />
            </div>
          </div>

          <div className='text-center'>
            <h2 className="font-semibold text-lg">{doctor.fullName}</h2>
            <p className="text-gray-500 text-sm">{doctor.specialities}</p>
          </div>
        </div>
      </div>

      <DoctorStats
        bookingCount={doctor.bookingCount}
        experienceYears={doctor.experienceYears}
        rating={doctor.rating}
        reviewsCount={doctor.reviewsCount}
        isSidebar
      />
      <AboutSection text={text || ''} showMore={showMore} setShowMore={setShowMore} />

      {/* Location */}
      <div className="mt-4">
        <h3 className="font-semibold mb-3">Location</h3>
        <div className="bg-gray-100 rounded-lg h-40 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Map placeholder */}
          </div>
        </div>
        <div className="flex items-start gap-2 mt-2 text-sm text-gray-600">
          <span>129,El-Nasr Street, Cairo, Egypt</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoSidebar;