// DoctorDetails.tsx
import AboutSection from '@/components/Doctor/AboutSection';
import AppointmentBooking from '../../components/Doctor/AppointmentBooking/AppointmentBooking';
import DoctorCardInfo from '@/components/Doctor/DoctorCardInfo/DoctorCardInfo';
import DoctorInfoSidebar from '@/components/Doctor/DoctorInfoSidebar';
import DoctorStats from '@/components/Doctor/DoctorStats/DoctorStats';
import PriceFooter from '@/components/Doctor/PriceFooter';
import ReviewsSection from '@/components/Doctor/ReviewsSection';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDoctors, fetchDoctorById } from '@/store/doctorSlice';
import { useParams } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { BackwardArrow, ChatIcon } from '@/components/Doctor/icons';

export default function DoctorDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams(); // دا اللي جاي من الـ URL
  
  // Get data from Redux
  const { currentDoctor, loading, error } = useAppSelector((state) => state.doctor);
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [showMore, setShowMore] = useState(false);



  useEffect(() => {
    if (id) {
      dispatch(fetchDoctorById(Number(id))); // هنا لازم تمرر الـ id بشكل صريح
    }
    dispatch(fetchDoctors());
  }, [id, dispatch]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌ Error</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => dispatch(fetchDoctorById(1))}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No Doctor Data
  if (!currentDoctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No doctor information available</p>
      </div>
    );
  }

  // const reviews = [
  //   {
  //     name: 'Nabila Reyna',
  //     time: '30 min ago',
  //     rating: 4.5,
  //     text: 'Excellent service! Dr. Jessica Turner was attentive and thorough. The clinic was clean, and the staff were friendly. Highly recommend for in-person care!'
  //   },
  //   {
  //     name: 'Ferry Ichsan A',
  //     time: '4 week ago',
  //     rating: 4.5,
  //     text: 'Quick and easy appointment! Dr. Jessica Turner was professional, and the staff made me feel comfortable. Highly recommend!'
  //   }
  // ];

  return (
    <div className="min-h-screen">
      {/* Mobile View */}
      <div className="lg:hidden mx-5">
        <MobileHeader />
        
        <div className="bg-white p-4">
          <DoctorCardInfo doctor={currentDoctor} />
          <DoctorStats
          bookingCount={currentDoctor.bookingCount} 
          experienceYears={currentDoctor.experienceYears}
          rating={currentDoctor.rating}
          reviewsCount={currentDoctor.reviewsCount}
          isSidebar 
           />
          <AboutSection text={currentDoctor.about} showMore={showMore} setShowMore={setShowMore} />
          <ReviewsSection rating={currentDoctor.rating} reviews={currentDoctor.reviews} isMobile />
          <PriceFooter price={currentDoctor.pricePerHour} />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block max-w-7xl mx-auto p-6">
        <DesktopBreadcrumb />
        
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <AppointmentBooking
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              doctorPrice={currentDoctor.price}
            />
            <ReviewsSection  rating={currentDoctor.rating} reviews={currentDoctor.reviews}/>
          </div>

          <DoctorInfoSidebar 
            text={currentDoctor.about} 
            showMore={showMore} 
            setShowMore={setShowMore}
            doctor={currentDoctor}
          />
        </div>
      </div>
    </div>
  );
}

// Mobile Header Component
const MobileHeader: React.FC = () => (
  <div className="bg-white px-4 py-3 flex items-center justify-between">
    <button 
      onClick={() => window.history.back()}
      className="mr-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
    <h1 className="text-lg font-semibold">Doctor Details</h1>
    <button className="p-2 bg-white  rounded-full cursor-pointer hover:bg-[#b9d9ff] text-white transition duration-500">
        <ChatIcon />
    </button>
  </div>
);

// Desktop Breadcrumb Component
const DesktopBreadcrumb: React.FC = () => (
  <div className="flex items-center gap-8 mb-6">
    <button 
      onClick={() => window.history.back()}
      className=' cursor-pointer hover:text-6xl w-6 h-6 flex items-center justify-center hover:text-gray-600 '>
      <BackwardArrow/>
    </button>
    <span className="text-gray-700">Make an appointment</span>
  </div>
);