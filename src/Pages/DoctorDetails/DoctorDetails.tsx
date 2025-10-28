import React, { useState } from 'react';
import { Heart, Star, MapPin, Users, Briefcase, ThumbsUp, MessageSquare, Calendar, ChevronLeft, Edit } from 'lucide-react';
import { Link } from 'react-router';
import DoctorCardInfo from '@/components/DoctorCardInfo/DoctorCardInfo';
import ReviewPopup from '@/components/ReviewPopup/ReviewPopup';

export default function DoctorDetails() {
  const [selectedDate, setSelectedDate] = useState('Mon-14');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');

    const [showMore, setShowMore] = useState(false);

  const text =
    "Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory and lung-related conditions. She has worked in several major hospitals and specializes in chronic asthma management and advanced pulmonary care.";

  const shortText = text.slice(0, 120) + "...";

  const dates = [
    { day: 'Fri', date: '12' },
    { day: 'Sat', date: '13' },
    { day: 'Sun', date: '14' },
    { day: 'Mon', date: '15' },
    { day: 'Tue', date: '16' },
    { day: 'Wed', date: '17' },
    { day: 'Thu', date: '18' },
  ];

  const morningTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '12:30 AM', '5:30 PM', '7:00 PM'];
  const eveningTimes = ['9:00 PM', '10:00 PM'];

  const reviews = [
    {
      name: 'Nabila Reyna',
      time: '30 min ago',
      rating: 4.5,
      text: 'Excellent service! Dr. Jessica Turner was attentive and thorough. The clinic was clean, and the staff were friendly. Highly recommend for in-person care!'
    },
    {
      name: 'Ferry Ichsan A',
      time: '4 week ago',
      rating: 4.5,
      text: 'Quick and easy appointment! Dr. Jessica Turner was professional, and the staff made me feel comfortable. Highly recommend!'
    }
  ];

  return (
    <div className="min-h-screen ">

      {/* Mobile View */}
      <div className="lg:hidden mx-5">
        {/* Header */}
        <div className="bg-white px-4 py-3 flex items-center justify-between ">
          <ChevronLeft className="w-6 h-6" />
          <h1 className="text-lg font-semibold">Doctor Details</h1>
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <span className="text-xl">−</span>
          </button>
        </div>

        {/* Doctor Info Card */}
        <div className="bg-white p-4">


          <DoctorCardInfo />
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 py-4 ">
            <div className="text-center flex flex-col gap-1">

              <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none" className="w-8 h-8 mx-auto mb-1 text-gray-700">
              <path d="M11.4545 2.54541C8.11997 2.54541 5.40906 5.25632 5.40906 8.59086C5.40906 11.8618 7.96724 14.509 11.3018 14.6236C11.4036 14.6109 11.5054 14.6109 11.5818 14.6236C11.6072 14.6236 11.62 14.6236 11.6454 14.6236C11.6581 14.6236 11.6581 14.6236 11.6709 14.6236C14.9291 14.509 17.4872 11.8618 17.5 8.59086C17.5 5.25632 14.7891 2.54541 11.4545 2.54541Z" fill="#05162C"/>
              <path d="M17.92 18.0089C14.3691 15.6416 8.5782 15.6416 5.00184 18.0089C3.38548 19.0907 2.49457 20.5543 2.49457 22.1198C2.49457 23.6852 3.38548 25.1361 4.98911 26.2052C6.77093 27.4016 9.11275 27.9998 11.4546 27.9998C13.7964 27.9998 16.1382 27.4016 17.92 26.2052C19.5237 25.1234 20.4146 23.6725 20.4146 22.0943C20.4018 20.5289 19.5237 19.0779 17.92 18.0089Z" fill="#05162C"/>
              <path d="M25.4418 9.34203C25.6455 11.8111 23.8891 13.9748 21.4582 14.2675C21.4455 14.2675 21.4455 14.2675 21.4327 14.2675H21.3946C21.3182 14.2675 21.2418 14.2675 21.1782 14.2929C19.9436 14.3566 18.8109 13.962 17.9582 13.2366C19.2691 12.0657 20.02 10.3093 19.8673 8.40022C19.7782 7.36931 19.4218 6.42749 18.8873 5.62567C19.3709 5.38385 19.9309 5.23113 20.5036 5.18022C22.9982 4.96385 25.2255 6.82203 25.4418 9.34203Z" fill="#05162C"/>
              <path d="M27.9873 21.1144C27.8855 22.349 27.0964 23.418 25.7728 24.1435C24.5 24.8435 22.8964 25.1744 21.3055 25.1362C22.2218 24.309 22.7564 23.278 22.8582 22.1835C22.9855 20.6053 22.2346 19.0908 20.7328 17.8817C19.88 17.2071 18.8873 16.6726 17.8055 16.278C20.6182 15.4635 24.1564 16.0108 26.3328 17.7671C27.5037 18.709 28.1018 19.8926 27.9873 21.1144Z" fill="#05162C"/>
              </svg>              
              <div className="font-semibold text-sm">2,000+</div>
              <div className="text-xs text-gray-500">patients</div>
            </div>
            <div className="text-center flex flex-col gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none" className="w-8 h-8 mx-auto mb-1 text-gray-700">
              <path d="M15.2727 19.0909C20.0174 19.0909 23.8636 15.387 23.8636 10.8181C23.8636 6.24924 20.0174 2.54541 15.2727 2.54541C10.5281 2.54541 6.68182 6.24924 6.68182 10.8181C6.68182 15.387 10.5281 19.0909 15.2727 19.0909Z" fill="#05162C"/>
              <path d="M20.0964 19.8673C20.5164 19.651 21 19.9692 21 20.4401V26.6128C21 27.7583 20.1982 28.3183 19.2055 27.8473L15.7946 26.231C15.5018 26.1037 15.0437 26.1037 14.7509 26.231L11.34 27.8473C10.3473 28.3055 9.54547 27.7455 9.54547 26.6001L9.57093 20.4401C9.57093 19.9692 10.0673 19.6637 10.4746 19.8673C11.9127 20.5928 13.5418 21.0001 15.2727 21.0001C17.0037 21.0001 18.6455 20.5928 20.0964 19.8673Z" fill="#05162C"/>
              </svg>
              <div className="font-semibold text-sm">10+</div>
              <div className="text-xs text-gray-500">experience</div>
            </div>
            <div className="text-center flex flex-col gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" className="w-7 h-7 mx-auto mb-1 text-gray-700">
              <path d="M10.0711 17.5205C9.73408 17.5318 9.40262 17.613 9.15022 17.7656L6.12092 19.5654C3.95353 20.8456 2.63552 19.8954 3.20588 17.4365L3.92854 14.3184C4.04252 13.71 3.80181 12.886 3.38361 12.4678L0.861153 9.94531C-0.62162 8.46243 -0.140237 6.96722 1.92561 6.6123L5.15803 6.08008C5.70282 5.9913 6.34869 5.50971 6.58967 5.01562L8.37678 1.44043C8.8474 0.51152 9.45707 0.0316004 10.0711 0V17.5205Z" fill="#05162C"/>
              <path d="M10.0711 0.00165274C10.7303 -0.0320948 11.395 0.450936 11.9002 1.45478L13.6873 5.029C13.9281 5.52331 14.5749 5.99205 15.1199 6.09345L18.3524 6.62568C20.418 6.96801 20.8996 8.46415 19.4168 9.95966L16.8943 12.4821C16.4761 12.9004 16.2354 13.7243 16.3748 14.32L17.0975 17.4382C17.6676 19.8967 16.3487 20.8598 14.1815 19.5671L11.1522 17.7673C10.8597 17.5905 10.4616 17.5092 10.0711 17.5222V0.00165274Z" fill="#05162C"/>
              </svg>              
              <div className="font-semibold text-sm">4.5</div>
              <div className="text-xs text-gray-500">rating</div>
            </div>
            <div className="text-center flex flex-col gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none" className="w-8 h-8 mx-auto mb-1 text-gray-700">
                <path d="M16.7872 7.63623H8.64177C8.31086 7.63623 7.99268 7.64896 7.68723 7.68714C4.26359 7.97987 2.54541 10.0035 2.54541 13.7326V18.8235C2.54541 23.9144 4.58177 24.9199 8.64177 24.9199H9.15086C9.43086 24.9199 9.79996 25.1108 9.96541 25.3271L11.4927 27.3635C12.1672 28.2671 13.2618 28.2671 13.9363 27.3635L15.4636 25.3271C15.6545 25.0726 15.96 24.9199 16.2781 24.9199H16.7872C20.5163 24.9199 22.54 23.2144 22.8327 19.778C22.8709 19.4726 22.8836 19.1544 22.8836 18.8235V13.7326C22.8836 9.67259 20.8472 7.63623 16.7872 7.63623ZM8.27268 17.818C7.55996 17.818 6.99996 17.2453 6.99996 16.5453C6.99996 15.8453 7.57268 15.2726 8.27268 15.2726C8.97268 15.2726 9.54541 15.8453 9.54541 16.5453C9.54541 17.2453 8.97268 17.818 8.27268 17.818ZM12.7145 17.818C12.0018 17.818 11.4418 17.2453 11.4418 16.5453C11.4418 15.8453 12.0145 15.2726 12.7145 15.2726C13.4145 15.2726 13.9872 15.8453 13.9872 16.5453C13.9872 17.2453 13.4272 17.818 12.7145 17.818ZM17.169 17.818C16.4563 17.818 15.8963 17.2453 15.8963 16.5453C15.8963 15.8453 16.469 15.2726 17.169 15.2726C17.869 15.2726 18.4418 15.8453 18.4418 16.5453C18.4418 17.2453 17.869 17.818 17.169 17.818Z" fill="#05162C"/>
                <path d="M27.9746 8.64177V13.7327C27.9746 16.2781 27.1855 18.009 25.6073 18.9636C25.2255 19.1927 24.78 18.8872 24.78 18.4418L24.7928 13.7327C24.7928 8.64177 21.8782 5.72723 16.7873 5.72723L9.03641 5.73996C8.59096 5.73996 8.2855 5.2945 8.51459 4.91268C9.46914 3.3345 11.2 2.54541 13.7328 2.54541H21.8782C25.9382 2.54541 27.9746 4.58177 27.9746 8.64177Z" fill="#05162C"/>
                </svg>              
                <div className="font-semibold text-sm">1,872</div>
              <div className="text-xs text-gray-500">reviews</div>
            </div>
          </div>


          {/* About Me */}
    <div className="mt-4">
      <h3 className="font-semibold mb-2">About me</h3>
      <p className="text-gray-600 text-sm">
        {showMore ? text : shortText}{" "}
        <span
          className="text-blue-500 cursor-pointer font-medium"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Read less" : "Read more"}
        </span>
      </p>
    </div>          

          {/* Reviews */}
          <div className="mt-6 ">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Reviews and Rating</h3>
              <button className="text-blue-500 text-sm flex items-center gap-1">
                <Edit className="w-4 h-4" />
                add review
              </button>
            </div>
            
            <div className='flex justify-between items-center mt-6'>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-4xl ">4.5</span>
              <span className="text-4xl">/5</span>
            </div>
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.78338 13.3334C4.87505 12.9251 4.70838 12.3417 4.41671 12.0501L2.39171 10.0251C1.75838 9.39175 1.50838 8.71675 1.69171 8.13341C1.88338 7.55008 2.47505 7.15008 3.35838 7.00008L5.95838 6.56675C6.33338 6.50008 6.79171 6.16675 6.96671 5.82508L8.40005 2.95008C8.81671 2.12508 9.38338 1.66675 10 1.66675C10.6167 1.66675 11.1834 2.12508 11.6 2.95008L13.0334 5.82508C13.1417 6.04175 13.3667 6.25008 13.6084 6.39175L4.63338 15.3667C4.51671 15.4834 4.31671 15.3751 4.35005 15.2084L4.78338 13.3334Z" fill="#F9E000"/>
                  <path d="M15.5834 12.0501C15.2834 12.3501 15.1167 12.9251 15.2167 13.3334L15.7917 15.8417C16.0334 16.8834 15.8834 17.6667 15.3667 18.0417C15.1584 18.1917 14.9084 18.2667 14.6167 18.2667C14.1917 18.2667 13.6917 18.1084 13.1417 17.7834L10.7 16.3334C10.3167 16.1084 9.68337 16.1084 9.30004 16.3334L6.85837 17.7834C5.93337 18.3251 5.14171 18.4167 4.63337 18.0417C4.44171 17.9001 4.30004 17.7084 4.20837 17.4584L14.3417 7.32508C14.725 6.94174 15.2667 6.76674 15.7917 6.85841L16.6334 7.00008C17.5167 7.15008 18.1084 7.55008 18.3 8.13341C18.4834 8.71674 18.2334 9.39174 17.6 10.0251L15.5834 12.0501Z" fill="#F9E000"/>
                  </svg>                
                ))}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.78338 13.3334C4.87505 12.9251 4.70838 12.3417 4.41671 12.0501L2.39171 10.0251C1.75838 9.39175 1.50838 8.71675 1.69171 8.13341C1.88338 7.55008 2.47505 7.15008 3.35838 7.00008L5.95838 6.56675C6.33338 6.50008 6.79171 6.16675 6.96671 5.82508L8.40005 2.95008C8.81671 2.12508 9.38338 1.66675 10 1.66675C10.6167 1.66675 11.1834 2.12508 11.6 2.95008L13.0334 5.82508C13.1417 6.04175 13.3667 6.25008 13.6084 6.39175L4.63338 15.3667C4.51671 15.4834 4.31671 15.3751 4.35005 15.2084L4.78338 13.3334Z" fill="#F9E000" fillOpacity="0.35"/>
                  <path d="M15.5834 12.0501C15.2834 12.3501 15.1167 12.9251 15.2167 13.3334L15.7917 15.8417C16.0334 16.8834 15.8834 17.6667 15.3667 18.0417C15.1584 18.1917 14.9084 18.2667 14.6167 18.2667C14.1917 18.2667 13.6917 18.1084 13.1417 17.7834L10.7 16.3334C10.3167 16.1084 9.68337 16.1084 9.30004 16.3334L6.85837 17.7834C5.93337 18.3251 5.14171 18.4167 4.63337 18.0417C4.44171 17.9001 4.30004 17.7084 4.20837 17.4584L14.3417 7.32508C14.725 6.94174 15.2667 6.76674 15.7917 6.85841L16.6334 7.00008C17.5167 7.15008 18.1084 7.55008 18.3 8.13341C18.4834 8.71674 18.2334 9.39174 17.6 10.0251L15.5834 12.0501Z" fill="#F9E000" fillOpacity="0.35"/>
                  </svg>              </div>
              <span className="text-sm text-gray-600">1250+ Reviews</span>
            </div>
            </div>

            {/* Review Card */}
            <div className="bg-gray-50 rounded-lg p-3 mt-6">
              <div className="flex items-start gap-3 mb-2">
                <img
                  src="/api/placeholder/40/40"
                  alt={reviews[0].name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">{reviews[0].name}</div>
                      <div className="text-xs text-gray-500">{reviews[0].time}</div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-yellow-600">{reviews[0].rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{reviews[0].text}</p>
            </div>
          </div>

          {/* Price */}
          <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4">
            <div className="flex flex-col items-center justify-between">
              <div className='flex justify-between items-center w-full mb-4'>
                <div>
                  <span className="text-2xl">Price</span>
                  <span className="text-sm text-gray-400">\hour</span>
                </div>
                <span className="text-red-500 text-xl">350$</span>
              </div>
                        
              {/* Book Button */}
              <Link to={'/bookappointment'} className="w-full bg-[#145DB8] hover:bg-[#173d6c] duration-300 text-white py-3 rounded-lg font-semibold">
                <button className='w-full text-center cursor-pointer '>
                Book Appointment
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>




      {/* Desktop View */}
      <div className="hidden lg:block max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-gray-700">Make an appointment</span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Appointment Booking */}
          <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
            {/* Date and Time Selection */}
            <div className="mb-6 border rounded-xl p-4 ">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Choose date and time</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>November, 2024</span>
                </div>
              </div>

              {/* Date Selector */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(`${date.day}-${date.date}`)}
                    className={`p-3 rounded-lg text-center ${
                      date.day === 'Mon' && date.date === '15'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-xs mb-1">{date.day}</div>
                    <div className="font-semibold">{date.date}</div>
                  </button>
                ))}
              </div>

              {/* Time Selector */}
              <div className="grid grid-cols-6 gap-2 mb-4">
                {morningTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg text-sm ${
                      time === '11:00 AM'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-6 gap-2">
                {eveningTimes.map((time) => (
                  <button
                    key={time}
                    className="p-2 rounded-lg text-sm bg-gray-50 text-gray-700 hover:bg-gray-100"
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Selected Time */}
              <div className="flex items-center justify-between mt-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {/* calender vector */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M9.1665 10.8333H13.3332M6.6665 10.8333H6.67399M10.8332 14.1667H6.6665M13.3332 14.1667H13.3257" stroke="#145DB8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 1.66666V3.33332M5 1.66666V3.33332" stroke="#145DB8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.08301 10.2027C2.08301 6.57161 2.08301 4.75607 3.12644 3.62803C4.16987 2.5 5.84925 2.5 9.20801 2.5H10.7913C14.1501 2.5 15.8295 2.5 16.8729 3.62803C17.9163 4.75607 17.9163 6.57161 17.9163 10.2027V10.6306C17.9163 14.2617 17.9163 16.0773 16.8729 17.2053C15.8295 18.3333 14.1501 18.3333 10.7913 18.3333H9.20801C5.84925 18.3333 4.16987 18.3333 3.12644 17.2053C2.08301 16.0773 2.08301 14.2617 2.08301 10.6306V10.2027Z" stroke="#145DB8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 6.66666H17.5" stroke="#145DB8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>                  
                  <span>Monday, November 15 - 11:00AM</span>
                </div>
                <button className="px-6 py-2 w-[123px] h-12 border border- border-[#145DB8] text-[#145DB8]  hover:text-white hover:bg-[#145DB8] rounded-lg text-sm duration-300 cursor-pointer active:bg-[#0f3c73]">
                  Book
                </button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4 group cursor-pointer">
                  <h3 className="font-semibold">Reviews and Rating</h3>

                  <ReviewPopup />
                </div>



              <div className='flex justify-between items-center mt-6'>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-medium">4.5</span>
                <span className="text-4xl font-medium">/5</span>
              </div>

              <div className="flex items-center flex-col gap-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.78338 13.3334C4.87505 12.9251 4.70838 12.3417 4.41671 12.0501L2.39171 10.0251C1.75838 9.39175 1.50838 8.71675 1.69171 8.13341C1.88338 7.55008 2.47505 7.15008 3.35838 7.00008L5.95838 6.56675C6.33338 6.50008 6.79171 6.16675 6.96671 5.82508L8.40005 2.95008C8.81671 2.12508 9.38338 1.66675 10 1.66675C10.6167 1.66675 11.1834 2.12508 11.6 2.95008L13.0334 5.82508C13.1417 6.04175 13.3667 6.25008 13.6084 6.39175L4.63338 15.3667C4.51671 15.4834 4.31671 15.3751 4.35005 15.2084L4.78338 13.3334Z" fill="#F9E000"/>
                  <path d="M15.5834 12.0501C15.2834 12.3501 15.1167 12.9251 15.2167 13.3334L15.7917 15.8417C16.0334 16.8834 15.8834 17.6667 15.3667 18.0417C15.1584 18.1917 14.9084 18.2667 14.6167 18.2667C14.1917 18.2667 13.6917 18.1084 13.1417 17.7834L10.7 16.3334C10.3167 16.1084 9.68337 16.1084 9.30004 16.3334L6.85837 17.7834C5.93337 18.3251 5.14171 18.4167 4.63337 18.0417C4.44171 17.9001 4.30004 17.7084 4.20837 17.4584L14.3417 7.32508C14.725 6.94174 15.2667 6.76674 15.7917 6.85841L16.6334 7.00008C17.5167 7.15008 18.1084 7.55008 18.3 8.13341C18.4834 8.71674 18.2334 9.39174 17.6 10.0251L15.5834 12.0501Z" fill="#F9E000"/>
                  </svg>                   
                ))}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.78338 13.3334C4.87505 12.9251 4.70838 12.3417 4.41671 12.0501L2.39171 10.0251C1.75838 9.39175 1.50838 8.71675 1.69171 8.13341C1.88338 7.55008 2.47505 7.15008 3.35838 7.00008L5.95838 6.56675C6.33338 6.50008 6.79171 6.16675 6.96671 5.82508L8.40005 2.95008C8.81671 2.12508 9.38338 1.66675 10 1.66675C10.6167 1.66675 11.1834 2.12508 11.6 2.95008L13.0334 5.82508C13.1417 6.04175 13.3667 6.25008 13.6084 6.39175L4.63338 15.3667C4.51671 15.4834 4.31671 15.3751 4.35005 15.2084L4.78338 13.3334Z" fill="#F9E000" fillOpacity="0.35"/>
                  <path d="M15.5834 12.0501C15.2834 12.3501 15.1167 12.9251 15.2167 13.3334L15.7917 15.8417C16.0334 16.8834 15.8834 17.6667 15.3667 18.0417C15.1584 18.1917 14.9084 18.2667 14.6167 18.2667C14.1917 18.2667 13.6917 18.1084 13.1417 17.7834L10.7 16.3334C10.3167 16.1084 9.68337 16.1084 9.30004 16.3334L6.85837 17.7834C5.93337 18.3251 5.14171 18.4167 4.63337 18.0417C4.44171 17.9001 4.30004 17.7084 4.20837 17.4584L14.3417 7.32508C14.725 6.94174 15.2667 6.76674 15.7917 6.85841L16.6334 7.00008C17.5167 7.15008 18.1084 7.55008 18.3 8.13341C18.4834 8.71674 18.2334 9.39174 17.6 10.0251L15.5834 12.0501Z" fill="#F9E000" fillOpacity="0.35"/>
                  </svg>                 
                </div>
                <span className="text-sm text-[#6D7379]">1250+ Reviews</span>
              </div>
              </div>



              {/* Review Cards */}
              <div className="grid grid-cols-2 gap-4">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src="/api/placeholder/40/40"
                        alt={review.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-sm">{review.name}</div>
                          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M4.78338 13.3334C4.87505 12.9251 4.70838 12.3417 4.41671 12.0501L2.39171 10.0251C1.75838 9.39175 1.50838 8.71675 1.69171 8.13341C1.88338 7.55008 2.47505 7.15008 3.35838 7.00008L5.95838 6.56675C6.33338 6.50008 6.79171 6.16675 6.96671 5.82508L8.40005 2.95008C8.81671 2.12508 9.38338 1.66675 10 1.66675C10.6167 1.66675 11.1834 2.12508 11.6 2.95008L13.0334 5.82508C13.1417 6.04175 13.3667 6.25008 13.6084 6.39175L4.63338 15.3667C4.51671 15.4834 4.31671 15.3751 4.35005 15.2084L4.78338 13.3334Z" fill="#F9E000"/>
                            <path d="M15.5834 12.0501C15.2834 12.3501 15.1167 12.9251 15.2167 13.3334L15.7917 15.8417C16.0334 16.8834 15.8834 17.6667 15.3667 18.0417C15.1584 18.1917 14.9084 18.2667 14.6167 18.2667C14.1917 18.2667 13.6917 18.1084 13.1417 17.7834L10.7 16.3334C10.3167 16.1084 9.68337 16.1084 9.30004 16.3334L6.85837 17.7834C5.93337 18.3251 5.14171 18.4167 4.63337 18.0417C4.44171 17.9001 4.30004 17.7084 4.20837 17.4584L14.3417 7.32508C14.725 6.94174 15.2667 6.76674 15.7917 6.85841L16.6334 7.00008C17.5167 7.15008 18.1084 7.55008 18.3 8.13341C18.4834 8.71674 18.2334 9.39174 17.6 10.0251L15.5834 12.0501Z" fill="#F9E000"/>
                            </svg> 
                            <span className="text-sm font-semibold text-yellow-600">{review.rating}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{review.time}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Doctor Info */}
          <div className="bg-[#F5F6F7] rounded-lg p-6 shadow-sm h-fit relative z-1">
            <div className="flex items-start justify-center mb-4">
              <div className="flex gap-3 flex-col">
                {/* doctor profile image  */}
                  <div className="relative">
                    <div className="p-[3px] rounded-full bg-linear-to-tl from-blue-900 to-transparent w-30 h-30 flex items-center justify-center">
                     <img
                       src="/images/Dr.JessicaTurner.jpg"
                       alt="Dr. Jessica Turner"
                       className="w-28 h-28 rounded-full object-cover"
                     />
                  </div>

                    <div className="absolute bottom-1 right-[15px] bg-white/40 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" >
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.12023 1.74583C5.89206 1.68388 6.62475 1.38031 7.21423 0.878232C7.87983 0.311341 8.72554 0 9.59983 0C10.4741 0 11.3198 0.311341 11.9854 0.878232C12.5749 1.38031 13.3076 1.68388 14.0794 1.74583C14.9511 1.8155 15.7696 2.19339 16.3879 2.81175C17.0063 3.43011 17.3842 4.24851 17.4538 5.12023C17.515 5.89183 17.8186 6.62503 18.3214 7.21423C18.8883 7.87983 19.1997 8.72554 19.1997 9.59983C19.1997 10.4741 18.8883 11.3198 18.3214 11.9854C17.8194 12.5749 17.5158 13.3076 17.4538 14.0794C17.3842 14.9511 17.0063 15.7696 16.3879 16.3879C15.7696 17.0063 14.9511 17.3842 14.0794 17.4538C13.3076 17.5158 12.5749 17.8194 11.9854 18.3214C11.3198 18.8883 10.4741 19.1997 9.59983 19.1997C8.72554 19.1997 7.87983 18.8883 7.21423 18.3214C6.62475 17.8194 5.89206 17.5158 5.12023 17.4538C4.24851 17.3842 3.43011 17.0063 2.81175 16.3879C2.19339 15.7696 1.8155 14.9511 1.74583 14.0794C1.68388 13.3076 1.38031 12.5749 0.878232 11.9854C0.311341 11.3198 0 10.4741 0 9.59983C0 8.72554 0.311341 7.87983 0.878232 7.21423C1.38031 6.62475 1.68388 5.89206 1.74583 5.12023C1.8155 4.24851 2.19339 3.43011 2.81175 2.81175C3.43011 2.19339 4.24851 1.8155 5.12023 1.74583ZM14.0482 8.04823C14.2668 7.82191 14.3878 7.51879 14.385 7.20415C14.3823 6.88951 14.2561 6.58854 14.0336 6.36605C13.8111 6.14356 13.5101 6.01736 13.1955 6.01462C12.8809 6.01189 12.5778 6.13284 12.3514 6.35143L8.39983 10.303L6.84823 8.75143C6.62191 8.53284 6.31879 8.41189 6.00415 8.41462C5.68951 8.41736 5.38854 8.54356 5.16605 8.76605C4.94356 8.98854 4.81736 9.28951 4.81462 9.60415C4.81189 9.91879 4.93284 10.2219 5.15143 10.4482L7.55143 12.8482C7.77647 13.0732 8.08164 13.1996 8.39983 13.1996C8.71803 13.1996 9.0232 13.0732 9.24823 12.8482L14.0482 8.04823Z" fill="#145DB8"/>
                      </svg>                
                    </div>
                  </div>
                <div className='text-center'>
                  <h2 className="font-semibold text-lg">Dr. Jessica Turner</h2>
                  <p className="text-gray-500 text-sm">Pulmonologist</p>
                </div>
              </div>
            </div>
              <Heart className="w-6 h-6 text-gray-400 absolute top-8 right-8" />

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 py-4 border-y">
              <div className="text-center flex flex-col items-center">
                <div className='bg-white rounded-full shadow-md p-3 flex items-center justify-center mb-1 '>
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none" className="w-8 h-8 lg:w-6 lg:h-6  text-gray-700">
                <path d="M11.4545 2.54541C8.11997 2.54541 5.40906 5.25632 5.40906 8.59086C5.40906 11.8618 7.96724 14.509 11.3018 14.6236C11.4036 14.6109 11.5054 14.6109 11.5818 14.6236C11.6072 14.6236 11.62 14.6236 11.6454 14.6236C11.6581 14.6236 11.6581 14.6236 11.6709 14.6236C14.9291 14.509 17.4872 11.8618 17.5 8.59086C17.5 5.25632 14.7891 2.54541 11.4545 2.54541Z" fill="#05162C"/>
                <path d="M17.92 18.0089C14.3691 15.6416 8.5782 15.6416 5.00184 18.0089C3.38548 19.0907 2.49457 20.5543 2.49457 22.1198C2.49457 23.6852 3.38548 25.1361 4.98911 26.2052C6.77093 27.4016 9.11275 27.9998 11.4546 27.9998C13.7964 27.9998 16.1382 27.4016 17.92 26.2052C19.5237 25.1234 20.4146 23.6725 20.4146 22.0943C20.4018 20.5289 19.5237 19.0779 17.92 18.0089Z" fill="#05162C"/>
                <path d="M25.4418 9.34203C25.6455 11.8111 23.8891 13.9748 21.4582 14.2675C21.4455 14.2675 21.4455 14.2675 21.4327 14.2675H21.3946C21.3182 14.2675 21.2418 14.2675 21.1782 14.2929C19.9436 14.3566 18.8109 13.962 17.9582 13.2366C19.2691 12.0657 20.02 10.3093 19.8673 8.40022C19.7782 7.36931 19.4218 6.42749 18.8873 5.62567C19.3709 5.38385 19.9309 5.23113 20.5036 5.18022C22.9982 4.96385 25.2255 6.82203 25.4418 9.34203Z" fill="#05162C"/>
                <path d="M27.9873 21.1144C27.8855 22.349 27.0964 23.418 25.7728 24.1435C24.5 24.8435 22.8964 25.1744 21.3055 25.1362C22.2218 24.309 22.7564 23.278 22.8582 22.1835C22.9855 20.6053 22.2346 19.0908 20.7328 17.8817C19.88 17.2071 18.8873 16.6726 17.8055 16.278C20.6182 15.4635 24.1564 16.0108 26.3328 17.7671C27.5037 18.709 28.1018 19.8926 27.9873 21.1144Z" fill="#05162C"/>
                  </svg>   
                </div>                 
                <div className="font-semibold text-xs">2,000+</div>
                <div className="text-xs text-gray-500">patients</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className='bg-white rounded-full shadow-md p-3  flex items-center justify-center mb-1 '>
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none" className="w-8 h-8 lg:w-6 lg:h-6  text-gray-700">
                <path d="M15.2727 19.0909C20.0174 19.0909 23.8636 15.387 23.8636 10.8181C23.8636 6.24924 20.0174 2.54541 15.2727 2.54541C10.5281 2.54541 6.68182 6.24924 6.68182 10.8181C6.68182 15.387 10.5281 19.0909 15.2727 19.0909Z" fill="#05162C"/>
                <path d="M20.0964 19.8673C20.5164 19.651 21 19.9692 21 20.4401V26.6128C21 27.7583 20.1982 28.3183 19.2055 27.8473L15.7946 26.231C15.5018 26.1037 15.0437 26.1037 14.7509 26.231L11.34 27.8473C10.3473 28.3055 9.54547 27.7455 9.54547 26.6001L9.57093 20.4401C9.57093 19.9692 10.0673 19.6637 10.4746 19.8673C11.9127 20.5928 13.5418 21.0001 15.2727 21.0001C17.0037 21.0001 18.6455 20.5928 20.0964 19.8673Z" fill="#05162C"/>
                  </svg>
                </div>
                <div className="font-semibold text-xs">10+</div>
                <div className="text-xs text-gray-500">experience</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className='bg-white rounded-full shadow-md p-3 flex items-center justify-center mb-1 '>
                 <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" className="w-8 h-8 lg:w-6 lg:h-6  text-gray-700">
                <path d="M10.0711 17.5205C9.73408 17.5318 9.40262 17.613 9.15022 17.7656L6.12092 19.5654C3.95353 20.8456 2.63552 19.8954 3.20588 17.4365L3.92854 14.3184C4.04252 13.71 3.80181 12.886 3.38361 12.4678L0.861153 9.94531C-0.62162 8.46243 -0.140237 6.96722 1.92561 6.6123L5.15803 6.08008C5.70282 5.9913 6.34869 5.50971 6.58967 5.01562L8.37678 1.44043C8.8474 0.51152 9.45707 0.0316004 10.0711 0V17.5205Z" fill="#05162C"/>
                <path d="M10.0711 0.00165274C10.7303 -0.0320948 11.395 0.450936 11.9002 1.45478L13.6873 5.029C13.9281 5.52331 14.5749 5.99205 15.1199 6.09345L18.3524 6.62568C20.418 6.96801 20.8996 8.46415 19.4168 9.95966L16.8943 12.4821C16.4761 12.9004 16.2354 13.7243 16.3748 14.32L17.0975 17.4382C17.6676 19.8967 16.3487 20.8598 14.1815 19.5671L11.1522 17.7673C10.8597 17.5905 10.4616 17.5092 10.0711 17.5222V0.00165274Z" fill="#05162C"/>
                 </svg>  
                </div>             
                <div className="font-semibold text-xs">4.5</div>
                <div className="text-xs text-gray-500">rating</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className='bg-white rounded-full shadow-md p-3 flex items-center justify-center mb-1 '>
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none" className="w-8 h-8 lg:w-6 lg:h-6  text-gray-700">
                <path d="M16.7872 7.63623H8.64177C8.31086 7.63623 7.99268 7.64896 7.68723 7.68714C4.26359 7.97987 2.54541 10.0035 2.54541 13.7326V18.8235C2.54541 23.9144 4.58177 24.9199 8.64177 24.9199H9.15086C9.43086 24.9199 9.79996 25.1108 9.96541 25.3271L11.4927 27.3635C12.1672 28.2671 13.2618 28.2671 13.9363 27.3635L15.4636 25.3271C15.6545 25.0726 15.96 24.9199 16.2781 24.9199H16.7872C20.5163 24.9199 22.54 23.2144 22.8327 19.778C22.8709 19.4726 22.8836 19.1544 22.8836 18.8235V13.7326C22.8836 9.67259 20.8472 7.63623 16.7872 7.63623ZM8.27268 17.818C7.55996 17.818 6.99996 17.2453 6.99996 16.5453C6.99996 15.8453 7.57268 15.2726 8.27268 15.2726C8.97268 15.2726 9.54541 15.8453 9.54541 16.5453C9.54541 17.2453 8.97268 17.818 8.27268 17.818ZM12.7145 17.818C12.0018 17.818 11.4418 17.2453 11.4418 16.5453C11.4418 15.8453 12.0145 15.2726 12.7145 15.2726C13.4145 15.2726 13.9872 15.8453 13.9872 16.5453C13.9872 17.2453 13.4272 17.818 12.7145 17.818ZM17.169 17.818C16.4563 17.818 15.8963 17.2453 15.8963 16.5453C15.8963 15.8453 16.469 15.2726 17.169 15.2726C17.869 15.2726 18.4418 15.8453 18.4418 16.5453C18.4418 17.2453 17.869 17.818 17.169 17.818Z" fill="#05162C"/>
                <path d="M27.9746 8.64177V13.7327C27.9746 16.2781 27.1855 18.009 25.6073 18.9636C25.2255 19.1927 24.78 18.8872 24.78 18.4418L24.7928 13.7327C24.7928 8.64177 21.8782 5.72723 16.7873 5.72723L9.03641 5.73996C8.59096 5.73996 8.2855 5.2945 8.51459 4.91268C9.46914 3.3345 11.2 2.54541 13.7328 2.54541H21.8782C25.9382 2.54541 27.9746 4.58177 27.9746 8.64177Z" fill="#05162C"/>
                  </svg>  
                </div>            
                <div className="font-semibold text-xs">1,872</div>
                <div className="text-xs text-gray-500">reviews</div>
              </div>
            </div>

            {/* About */}
    <div className="mt-4">
      <h3 className="font-semibold mb-2">About me</h3>
      <p className="text-gray-600 text-sm">
        {showMore ? text : shortText}{" "}
        <span
          className="text-blue-500 cursor-pointer font-medium"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Read less" : "Read more"}
        </span>
      </p>
    </div>  

            {/* Location */}
            <div className="mt-4">
              <h3 className="font-semibold mb-3">Location</h3>
              <div className="bg-gray-100 rounded-lg h-40 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="flex items-start gap-2 mt-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>129,El-Nasr Street, Cairo, Egypt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}