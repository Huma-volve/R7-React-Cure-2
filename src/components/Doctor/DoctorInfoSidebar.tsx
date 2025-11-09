// components/DoctorInfoSidebar.tsx
import React from 'react';
import { ChatIcon, FavoriteHeart, VerifiedBadgeIcon } from './icons';
import AboutSection from './AboutSection';
import DoctorStats from './DoctorStats/DoctorStats';
import DoctorDetailsMap from './DoctorDetailsMap';

interface DoctorInfoSidebarProps {
  doctor: {
    specialities: string | string[];
    specialistTitle?: string;
    address: string;
    rating: number;
    distance?: number | null;
    isFavourite?: boolean;
    price?: number;
    pricePerHour?: number;
    startDate?: string | null;
    endDate?: string | null;
    experienceYears?: number;
    email?: string;
    reviewsCount?: number;
    imgUrl?: string;
    phoneNumber?: string;
    latitude?: number;
    longitude?: number;
    langtude?: number;
    fullName?: string; 
    bookingCount?: number;
  }
  showMore: boolean;
  setShowMore: (value: boolean) => void;
  text?: string;
}

const DoctorInfoSidebar: React.FC<DoctorInfoSidebarProps> = ({ doctor, text, showMore, setShowMore }) => {
    // const displaySpecialities = Array.isArray(doctor.specialities) 
    // ? doctor.specialities.join(', ') 
    // : doctor.specialities;

    const longitude = doctor.longitude || doctor.langtude || 0;
    const latitude = doctor.latitude || 0;

  return (
    <div className="bg-[#F5F6F7] rounded-lg p-6 shadow-sm h-fit relative z-1">

      <div className='p-2 bg-white absolute top-4 left-4 rounded-full cursor-pointer hover:bg-[#fca5a6] transition duration-500'>
        <FavoriteHeart />
      </div>      
      <div className='p-2 bg-white absolute top-4 right-4 rounded-full cursor-pointer hover:bg-[#b9d9ff] text-white transition duration-500'>
        <ChatIcon />
      </div>

      <div className="flex items-start justify-center mb-4">
        <div className="flex gap-3 flex-col">
          <div className="relative">
            <div className="p-[3px] rounded-full bg-linear-to-tl from-blue-900 to-transparent w-30 h-30 flex items-center justify-center">
              <img
                src={doctor.imgUrl || '/public/images/magdyYacob.jpg'}
                alt={doctor.fullName || 'Doctor'}
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 -right-0.5 bg-white/40 rounded-full p-1">
              <VerifiedBadgeIcon />
            </div>
          </div>

          <div className='text-center'>
            <h2 className="font-semibold text-lg">{doctor.fullName}</h2>
            <p className="text-gray-500 text-sm">{doctor.specialities}</p>
            <p className="text-gray-500 text-sm">{doctor.address}</p>
            <p className="text-gray-500 text-sm">{doctor.phoneNumber}</p>
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
          <DoctorDetailsMap 
            latitude={latitude}
            longitude={longitude}
            doctorName={doctor.fullName}
            address={doctor.address}
          />
        </div>
        <div className="flex items-start gap-2 mt-2 text-sm text-gray-600">
          <span>{doctor.address || '129,El-Nasr Street, Cairo, Egypt'}</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoSidebar;