import DoctorCardInfo from '@/components/Doctor/DoctorCardInfo/DoctorCardInfo';
import { useState } from 'react';
// import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Heart, Check } from 'lucide-react';
import { Link } from 'react-router';

// Estimation Data - Replace with real API data later
const estimationData = {
  doctor: {
    id: 1,
    name: "Dr. Jessica Turner",
    specialty: "Pulmonologist",
    image: "/api/placeholder/80/80",
    rating: 4.5,
    location: "129,El-Nasr Street, Cairo",
    pricePerHour: 350
  },
  availableSlots: [
    {
      date: "2025-07-20",
      dayName: "Sunday",
      times: ["9:00 AM", "10:00 AM", "11:00 AM", "12:30 PM", "4:00 PM", "5:30 PM", "7:00 PM"]
    },
    {
      date: "2025-07-21",
      dayName: "Monday",
      times: ["9:00 AM", "10:00 AM", "11:00 AM", "5:30 PM", "7:00 PM", "9:00 PM"]
    },
    {
      date: "2025-07-22",
      dayName: "Tuesday",
      times: ["10:00 AM", "11:00 AM", "12:30 PM", "4:00 PM", "5:30 PM"]
    },
    {
      date: "2025-07-23",
      dayName: "Wednesday",
      times: ["9:00 AM", "11:00 AM", "4:00 PM", "7:00 PM", "9:00 PM", "10:00 PM"]
    },
    {
      date: "2025-07-24",
      dayName: "Thursday",
      times: ["9:00 AM", "10:00 AM", "11:00 AM", "12:30 PM", "5:30 PM", "7:00 PM"]
    },
    {
      date: "2025-07-25",
      dayName: "Friday",
      times: ["10:00 AM", "11:00 AM", "4:00 PM", "5:30 PM", "7:00 PM"]
    },
    {
      date: "2025-07-26",
      dayName: "Saturday",
      times: ["9:00 AM", "10:00 AM", "12:30 PM", "4:00 PM", "5:30 PM", "7:00 PM", "9:00 PM"]
    }
  ]
};

export default function AppointmentBooking() {
  const [showBooking] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6)); // July 2025
  const [selectedDate, setSelectedDate] = useState("2025-07-20");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Get calendar days
  const getDaysInMonth = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false
      });
    }

    return days;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getAvailableTimesForDate = (date: string) => {
    const slot = estimationData.availableSlots.find(s => s.date === date);
    return slot ? slot.times : [];
  };

  const isDateAvailable = (date: string) => {
    return estimationData.availableSlots.some(s => s.date === date);
  };

  const getSelectedDateInfo = () => {
    const slot = estimationData.availableSlots.find(s => s.date === selectedDate);
    if (!slot) return null;

    const date = new Date(selectedDate);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${slot.dayName}, ${month} ${day}, ${year}`;
  };

  // const handleConfirmBooking = () => {
  //   if (selectedDate && selectedTime) {

  //       }
  // };

  if (!showBooking) {

    // Booking View
    const availableTimes = getAvailableTimesForDate(selectedDate);

    return (
      <div className=" ">
        <div className="max-w-2xl mx-auto bg-white min-h-screen">
          {/* Header */}
          <div className="bg-white px-4 py-4 flex items-center gap-3 ">
            <Link to={'/doctordetails'}>
              <button>
                {/* <ChevronLeft className="w-6 h-6" /> */}
              </button>
            </Link>
            <h1 className="text-lg font-semibold">Book Appointment</h1>
          </div>

          {/* Doctor Mini Info */}
          <DoctorCardInfo doctor={estimationData.doctor} />

          {/* Select Day */}
          <div className="p-4 bg-white">
            <h3 className="font-semibold mb-3">Select a day</h3>

            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg mb-4"
            >
              <div className="flex items-center gap-2 text-gray-700">
                {/* <Calendar className="w-5 h-5" /> */}
                <span>{getSelectedDateInfo()}</span>
              </div>
              {/* <ChevronRight className={`w-5 h-5 transition-transform ${showDatePicker ? 'rotate-90' : ''}`} /> */}
            </button>

            {showDatePicker && (
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded">
                    {/* <ChevronLeft className="w-5 h-5" /> */}
                  </button>
                  <span className="font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded">
                    {/* <ChevronRight className="w-5 h-5" /> */}
                  </button>
                </div>

                {/* Calendar */}
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-blue-600 mb-2">
                      {day}
                    </div>
                  ))}

                  {getDaysInMonth(currentMonth).map((dayObj, index) => {
                    const isAvailable = dayObj.isCurrentMonth && isDateAvailable(dayObj.date || '');
                    const isSelected = dayObj.date === selectedDate;

                    return (
                      <button
                        key={index}
                        disabled={!isAvailable}
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedDate(dayObj.date || '');
                            setSelectedTime(null);
                            setShowDatePicker(false);
                          }
                        }}
                        className={`
                        aspect-square rounded-full flex items-center justify-center text-sm
                        ${!dayObj.isCurrentMonth ? 'text-gray-300' : ''}
                        ${isSelected ? 'bg-blue-600 text-white font-bold' : ''}
                        ${isAvailable && !isSelected ? 'hover:bg-blue-50 text-gray-700' : ''}
                        ${!isAvailable && dayObj.isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : ''}
                      `}
                      >
                        {dayObj.day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Select Time */}
          <div className="p-4 bg-white border-t">
            <h3 className="font-semibold mb-3">Select time</h3>

            {availableTimes.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`
                    py-3 px-4 rounded-lg font-medium transition
                    ${selectedTime === time
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                  `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {/* <Clock className="w-12 h-12 mx-auto mb-2 text-gray-400" /> */}
                <p>No available times for this date</p>
              </div>
            )}
          </div>

          {/* Confirm Button */}
          <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4">
            <div className="flex flex-col items-center justify-between">
              {selectedTime && (
                <div className="mb-3 p-3 bg-blue-50 rounded-lg flex items-center gap-2 text-sm">
                  {/* <Calendar className="w-4 h-4 text-blue-600" /> */}
                  <span className="text-gray-700">
                    {getSelectedDateInfo()} - {selectedTime}
                  </span>
                </div>
              )}
              <div className='flex justify-between items-center w-full mb-4'>
                <div>
                  <span className="text-2xl">Price</span>
                  <span className="text-sm text-gray-400">\hour</span>
                </div>
                <span className="text-red-500 text-xl">350$</span>
              </div>

              {/* Book Button */}
              <Link to={'/paypage'} className='w-full'>
                <button
                  // onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedTime}
                  className={`
                w-full py-3 rounded-lg font-semibold transition
                ${selectedDate && selectedTime
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
              `}
                >
                  Confirm Booking - {estimationData.doctor.pricePerHour}$
                </button>
              </Link>

            </div>
          </div>
        </div>
      </div>
    );
  }
}