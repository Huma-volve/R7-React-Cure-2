// components/AppointmentBooking.tsx
import React from 'react';
import { CalendarIcon } from '../icons';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import PayPopup from '../PayPopup/PayPopup';

interface AppointmentBookingProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  isMobile?: boolean;
  doctorPrice?: number;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  doctorPrice
}) => {
  const morningTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '12:30 PM', '1:00 PM', '2:00 PM'];
  const eveningTimes = ['5:30 PM', '7:00 PM', '9:00 PM', '10:00 PM'];

  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  
  const handleClose = () => {
    setIsPaymentOpen(false);
  }

  const formatSelectedDateTime = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[selectedDate.getDay()];
    const monthName = months[selectedDate.getMonth()];
    const date = selectedDate.getDate();
    
    return `${dayName}, ${monthName} ${date} - ${selectedTime}`;
  };

  return (
    <div className="mb-6 border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Choose date and time</h3>
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <DayPicker
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          mode="single"
          disabled={(date) => date < new Date()}
          className="border rounded-lg p-2"
        />
      </div>

      {/* Time Selector - Morning */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Morning Slots
        </label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {morningTimes.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-2 rounded-lg text-sm transition-all ${
                time === selectedTime
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selector - Evening */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Evening Slots
        </label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {eveningTimes.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-2 rounded-lg text-sm transition-all ${
                time === selectedTime
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Date and Time Summary */}
      <div className="flex items-center justify-between mt-6 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CalendarIcon />
          <span>{formatSelectedDateTime()}</span>
        </div>
        <button 
          onClick={() => setIsPaymentOpen(true)} 
          className="px-6 py-2 w-[123px] h-12 border border-[#145DB8] text-[#145DB8] hover:text-white hover:bg-[#145DB8] rounded-lg text-sm duration-300 cursor-pointer active:bg-[#0d2849]"
        >
          Book
        </button>
      </div>

      {/* Payment Popup */}
      {isPaymentOpen && (
        <div 
          className="fixed inset-0 bg-[#00000068] bg-opacity-10 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative my-auto overflow-y-auto"
          >
            <PayPopup 
              onClose={handleClose}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;