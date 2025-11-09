// components/DoctorStats.tsx
import React from 'react';
import { UsersIcon, AwardIcon, StarIcon, MessageCircleIcon, StarState } from '../icons';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  isSidebar?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, isSidebar = false }) => (
  <div className={`text-center flex flex-col ${isSidebar ? 'items-center' : 'gap-1'}`}>
    {isSidebar ? (
      <div className='lg:bg-white rounded-full  p-3 flex items-center justify-center mb-1'>
        {icon}
      </div>
    ) : (
      icon
    )}
    <div className={`font-semibold ${isSidebar ? 'text-xs' : 'text-sm'}`}>{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

interface DoctorStatsProps {
  isSidebar?: boolean;
  bookingCount?: number;
  experienceYears?: number;
  rating?: number;
  reviewsCount?: number;
}

const DoctorStats: React.FC<DoctorStatsProps> = ({ isSidebar = false, bookingCount, experienceYears, rating, reviewsCount}) => {
  const stats = [
    {
      icon: <UsersIcon className={isSidebar ? "w-6 h-6" : "w-8 h-8 mx-auto mb-1"} />,
      value: String(bookingCount || 0),
      label: 'patients'
    },
    {
      icon: <AwardIcon className={isSidebar ? "w-6 h-6" : "w-8 h-8 mx-auto mb-1"} />,
      value: String( experienceYears || 0),
      label: 'experience'
    },
    {
      icon: <StarState className={isSidebar ? "w-6 h-6" : "w-8 h-8 mx-auto mb-1"} />,
      value: String(Number(rating || 0).toFixed(1)),
      label: 'rating'
    },
    {
      icon: <MessageCircleIcon className={isSidebar ? "w-6 h-6" : "w-8 h-8 mx-auto mb-1"} />,
      value: String(reviewsCount || 0),
      label: 'reviews'
    }
  ];

  return (
    <div className={`grid grid-cols-4 gap-${isSidebar ? '3' : '4'} py-4 ${isSidebar ? 'border-y' : ''}`}>
      {stats.map((stat, index) => (
        <StatItem
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          isSidebar={isSidebar}
        />
      ))}
    </div>
  );
};

export default DoctorStats;