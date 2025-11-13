// components/AppointmentBooking.tsx
import React, { useEffect, useMemo } from 'react';
import { CalendarIcon } from '../icons';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import PayPopup from '../PayPopup/PayPopup';
import { useAppSelector } from '@/store/hooks';

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
  setSelectedTime}) => {
  const { currentDoctor } = useAppSelector((state) => state.doctor);
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  const [selectedSlotId, setSelectedSlotId] = React.useState<number | null>(null);

  // استخراج المواعيد المتاحة من بيانات الدكتور
  const availableSlots = useMemo(() => {
    if (!currentDoctor?.availableSlots) return [];

    return currentDoctor.availableSlots.filter(slot => !slot.isBooked);
  }, [currentDoctor]);

  // تجميع المواعيد حسب التاريخ والفترة
  const groupedSlots = useMemo(() => {
    const grouped: { [date: string]: { morning: any[], evening: any[] } } = {};

    availableSlots.forEach(slot => {
      const slotDate = new Date(slot.dateTime);
      const dateKey = slotDate.toISOString().split('T')[0];

      if (!grouped[dateKey]) {
        grouped[dateKey] = { morning: [], evening: [] };
      }

      // تحويل الوقت من 24 ساعة إلى 12 ساعة مع AM/PM
      const [hours, minutes] = slot.startTime.split(':');
      const hour = parseInt(hours);
      const timeFormatted = `${hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;

      const slotWithFormatted = {
        ...slot,
        formattedTime: timeFormatted
      };

      // تصنيف الوقت (صباحي أو مسائي)
      if (hour < 17) {
        grouped[dateKey].morning.push(slotWithFormatted);
      } else {
        grouped[dateKey].evening.push(slotWithFormatted);
      }
    });

    return grouped;
  }, [availableSlots]);

  // الحصول على المواعيد للتاريخ المحدد
  const selectedDateKey = selectedDate.toISOString().split('T')[0];
  const morningSlots = groupedSlots[selectedDateKey]?.morning || [];
  const eveningSlots = groupedSlots[selectedDateKey]?.evening || [];

  // التواريخ المتاحة للحجز

  // تعيين أول موعد متاح عند التحميل
  useEffect(() => {
    if (availableSlots.length > 0 && !selectedTime) {
      const firstSlot = availableSlots[0];
      setSelectedDate(new Date(firstSlot.dateTime));

      const [hours, minutes] = firstSlot.startTime.split(':');
      const hour = parseInt(hours);
      const timeFormatted = `${hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
      setSelectedTime(timeFormatted);
      setSelectedSlotId(firstSlot.id);
    }
  }, [availableSlots]);

  const handleClose = () => {
    setIsPaymentOpen(false);
  };

  const handleTimeSelect = (time: string, slotId: number) => {
    setSelectedTime(time);
    setSelectedSlotId(slotId);
  };

  const formatSelectedDateTime = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[selectedDate.getDay()];
    const monthName = months[selectedDate.getMonth()];
    const date = selectedDate.getDate();

    return `${dayName}, ${monthName} ${date} - ${selectedTime}`;
  };

  // دالة للتحقق من التاريخ المتاح
  const isDateAvailable = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return !!groupedSlots[dateKey];
  };

  return (
    <div className="mb-6 border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Choose date and time</h3>
      </div>

      {availableSlots.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No available slots for this doctor</p>
        </div>
      ) : (
        <>
          {/* Date Picker */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <DayPicker
              selected={selectedDate}
              onSelect={(date: Date | undefined) => {
                if (date && isDateAvailable(date)) {
                  setSelectedDate(date);
                  // اختيار أول موعد متاح في هذا اليوم
                  const dateKey = date.toISOString().split('T')[0];
                  const firstSlot = groupedSlots[dateKey]?.morning[0] || groupedSlots[dateKey]?.evening[0];
                  if (firstSlot) {
                    setSelectedTime(firstSlot.formattedTime);
                    setSelectedSlotId(firstSlot.id);
                  }
                }
              }}
              mode="single"
              disabled={(date: Date) => {
                const isPast = date < new Date();
                const isUnavailable = !isDateAvailable(date);
                return isPast || isUnavailable;
              }}
              modifiers={{
                available: (date: Date) => isDateAvailable(date)
              }}
              modifiersStyles={{
                available: {
                  fontWeight: 'bold',
                  color: '#145DB8'
                }
              }}
              className="border rounded-lg p-2"
            />
          </div>

          {/* Time Selector - Morning */}
          {morningSlots.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Morning Slots
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {morningSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleTimeSelect(slot.formattedTime, slot.id)}
                    className={`p-2 rounded-lg text-sm transition-all ${slot.formattedTime === selectedTime
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {slot.formattedTime}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Time Selector - Evening */}
          {eveningSlots.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evening Slots
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {eveningSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleTimeSelect(slot.formattedTime, slot.id)}
                    className={`p-2 rounded-lg text-sm transition-all ${slot.formattedTime === selectedTime
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {slot.formattedTime}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Date and Time Summary */}
          <div className="flex items-center justify-between mt-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarIcon />
              <span>{formatSelectedDateTime()}</span>
            </div>
            <button
              onClick={() => setIsPaymentOpen(true)}
              disabled={!selectedTime}
              className="px-6 py-2 w-[123px] h-12 border border-[#145DB8] text-[#145DB8] hover:text-white hover:bg-[#145DB8] rounded-lg text-sm duration-300 cursor-pointer active:bg-[#0d2849] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book
            </button>
          </div>
        </>
      )}

      {/* Payment Popup */}
      {isPaymentOpen && (
        <div
          className="fixed inset-0 bg-[#00000068] bg-opacity-10 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative my-auto overflow-y-auto max-h-[90vh]"
          >
            <PayPopup
              onClose={handleClose}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedSlotId={selectedSlotId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;