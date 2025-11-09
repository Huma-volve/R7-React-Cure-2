import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { BackwardArrow } from '@/components/Doctor/icons';
import DoctorCardInfo from '@/components/Doctor/DoctorCardInfo/DoctorCardInfo';

export default function AppointmentBooking() {
  const navigate = useNavigate();
  const { currentDoctor } = useAppSelector((state) => state.doctor);
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // استخراج المواعيد المتاحة من بيانات الدكتور
  const availableSlots = useMemo(() => {
    if (!currentDoctor?.availableSlots) return [];
    return currentDoctor.availableSlots.filter(slot => !slot.isBooked);
  }, [currentDoctor]);

  // تجميع المواعيد حسب التاريخ
  const groupedSlots = useMemo(() => {
    const grouped: { [date: string]: any[] } = {};
    
    availableSlots.forEach(slot => {
      const slotDate = new Date(slot.dateTime);
      const dateKey = slotDate.toISOString().split('T')[0];
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      // تحويل الوقت من 24 ساعة إلى 12 ساعة مع AM/PM
      const [hours, minutes] = slot.startTime.split(':');
      const hour = parseInt(hours);
      const timeFormatted = `${hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
      
      grouped[dateKey].push({
        ...slot,
        formattedTime: timeFormatted
      });
    });
    
    return grouped;
  }, [availableSlots]);

  // الحصول على المواعيد للتاريخ المحدد
  const selectedDateKey = selectedDate.toISOString().split('T')[0];
  const availableTimes = groupedSlots[selectedDateKey] || [];

  // التواريخ المتاحة للحجز
  const availableDates = useMemo(() => {
    return availableSlots.map(slot => new Date(slot.dateTime));
  }, [availableSlots]);

  // دالة للتحقق من التاريخ المتاح
  const isDateAvailable = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return !!groupedSlots[dateKey];
  };

  // تعيين أول موعد متاح عند التحميل
  useEffect(() => {
    if (availableSlots.length > 0) {
      const firstSlot = availableSlots[0];
      const firstDate = new Date(firstSlot.dateTime);
      setSelectedDate(firstDate);
      
      const [hours, minutes] = firstSlot.startTime.split(':');
      const hour = parseInt(hours);
      const timeFormatted = `${hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
      setSelectedTime(timeFormatted);
      setSelectedSlotId(firstSlot.id);
    }
  }, [availableSlots]);

  const getSelectedDateInfo = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[selectedDate.getDay()];
    const monthName = months[selectedDate.getMonth()];
    const date = selectedDate.getDate();
    const year = selectedDate.getFullYear();
    
    return `${dayName}, ${monthName} ${date}, ${year}`;
  };

  const handleTimeSelect = (time: string, slotId: number) => {
    setSelectedTime(time);
    setSelectedSlotId(slotId);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      setSelectedDate(date);
      setShowDatePicker(false);
      
      // اختيار أول موعد متاح في هذا اليوم
      const dateKey = date.toISOString().split('T')[0];
      const firstSlot = groupedSlots[dateKey]?.[0];
      if (firstSlot) {
        setSelectedTime(firstSlot.formattedTime);
        setSelectedSlotId(firstSlot.id);
      } else {
        setSelectedTime(null);
        setSelectedSlotId(null);
      }
    }
  };

  // ✅ دالة للانتقال لصفحة الدفع مع تمرير البيانات
  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime || !selectedSlotId) return;
    
    navigate('/paypage', {
      state: {
        selectedSlotId,
        selectedDate: selectedDate.toISOString(),
        selectedTime,
        doctorId: currentDoctor?.id,
        price: currentDoctor?.pricePerHour || currentDoctor?.price
      }
    });
  };

  if (!currentDoctor) {
    return (
      <div className="max-w-2xl mx-auto bg-white min-h-screen p-4">
        <p className="text-center text-gray-500">Loading doctor information...</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-2xl mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center justify-center relative gap-3">
          <button 
            onClick={() => window.history.back()}
            className='left-10 top-[18px] absolute cursor-pointer hover:text-6xl w-6 h-6 flex items-center justify-center'>
            <BackwardArrow/>
          </button>
          <h1 className="text-lg font-semibold">Book Appointment</h1>
        </div>

        {/* Doctor Mini Info */}
        <div className="p-4">
          <DoctorCardInfo doctor={currentDoctor} />
        </div>

        {/* Select Day */}
        <div className="p-4 bg-white">
          <h3 className="font-semibold mb-3">Select a day</h3>
          
          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg mb-4"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{getSelectedDateInfo()}</span>
            </div>
            <svg 
              className={`w-5 h-5 transition-transform ${showDatePicker ? 'rotate-90' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {showDatePicker && (
            <div className="border border-gray-200 rounded-lg p-4 mb-4 flex justify-center">
              <DayPicker
                selected={selectedDate}
                onSelect={handleDateSelect}
                mode="single"
                disabled={(date) => {
                  const isPast = date < new Date();
                  const isUnavailable = !isDateAvailable(date);
                  return isPast || isUnavailable;
                }}
                modifiers={{
                  available: (date) => isDateAvailable(date)
                }}
                modifiersStyles={{
                  available: { 
                    fontWeight: 'bold',
                    color: '#2563eb'
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Select Time */}
        <div className="p-4">
          <h3 className="font-semibold mb-3">Select time</h3>
          
          {availableTimes.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleTimeSelect(slot.formattedTime, slot.id)}
                  className={`
                    py-3 px-4 rounded-lg font-medium transition
                    ${selectedTime === slot.formattedTime 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {slot.formattedTime}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No available times for this date</p>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 z-20">
          <div className="flex flex-col items-center justify-between max-w-2xl mx-auto">
            {selectedTime && (
              <div className="mb-3 p-3 bg-blue-50 rounded-lg flex items-center gap-2 text-sm w-full">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700">
                  {getSelectedDateInfo()} - {selectedTime}
                </span>
              </div>
            )}
            
            <div className='flex justify-between items-center w-full mb-4'>
              <div>
                <span className="text-2xl">Price</span>
                <span className="text-sm text-gray-400">/hour</span>
              </div>
              <span className="text-red-500 text-xl">
                {currentDoctor.pricePerHour || currentDoctor.price || 350}$
              </span>
            </div>
            
            {/* Book Button - استخدام onClick بدلاً من Link */}
            <button 
              onClick={handleConfirmBooking}
              disabled={!selectedDate || !selectedTime || !selectedSlotId}
              className={`
                w-full py-3 rounded-lg font-semibold transition
                ${selectedDate && selectedTime && selectedSlotId
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Confirm Booking - {currentDoctor.pricePerHour || currentDoctor.price || 350}$
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}