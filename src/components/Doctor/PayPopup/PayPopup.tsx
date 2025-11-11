import DoctorCardInfo from "@/components/Doctor/DoctorCardInfo/DoctorCardInfo";
import {  CalendarIcon, Paypal, Visa } from "@/components/Doctor/icons";
import { useState } from "react";
import { Plus, Check, X, Loader2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { createBooking, resetBookingState } from "@/store/doctorSlice";
import { BsCashCoin } from "react-icons/bs";
import { Link } from "react-router";
import SuccessBookingPopup from "../SuccessBookingPopup";
import { FaCcStripe } from "react-icons/fa";

interface PayPopupProps {
  onClose?: () => void;
  selectedDate?: Date;
  selectedTime?: string;
  selectedSlotId?: number | null;
}

const PayPopup = ({ onClose, selectedDate, selectedTime, selectedSlotId }: PayPopupProps) => {
  const dispatch = useAppDispatch();
  const [selectedMethod, setSelectedMethod] = useState("cash");
  
  const { currentDoctor, bookingLoading, bookingError } = useAppSelector((state) => state.doctor);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const paymentOptions = [
    { id: "cash", label: "Cash", icon: <BsCashCoin size={30}/> },
    { id: "paypal", label: "PayPal", icon: <Paypal/> },
    { id: "stripe", label: "Credit Card (Stripe)", icon: <FaCcStripe size={30} /> },
  ];

  const formatAppointmentDate = () => {
    if (!selectedDate) return "Monday, 20th Aug 2024 | 10:00 AM";
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[selectedDate.getDay()];
    const monthName = months[selectedDate.getMonth()];
    const date = selectedDate.getDate();
    const year = selectedDate.getFullYear();
    
    return `${dayName}, ${date}${getOrdinalSuffix(date)} ${monthName} ${year} | ${selectedTime || '10:00 AM'}`;
  };

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const formatDateTimeForAPI = () => {
    if (!selectedDate || !selectedTime) return new Date().toISOString();
    
    const timeParts = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeParts) return new Date().toISOString();
    
    let hours = parseInt(timeParts[1]);
    const minutes = timeParts[2];
    const period = timeParts[3].toUpperCase();
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const formattedHours = hours.toString().padStart(2, '0');
    
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}T${formattedHours}:${minutes}:00`;
  };

  // تحديد Payment Code حسب الطريقة المختارة
  const getPaymentCode = () => {
    switch (selectedMethod) {
      case "paypal":
        return 0; // PayPal
      case "stripe":
        return 1; // Stripe
      case "cash":
        return 2; // Cash
      default:
        return 2;
    }
  };

  // تحديد Status حسب طريقة الدفع
  const getBookingStatus = () => {
    // إذا Cash يكون pending، وإلا يكون 0
    return selectedMethod === "cash" ? "pending" : 0;
  };

  const handlePayment = async () => {
    if (!currentDoctor || !selectedSlotId) {
      alert("Doctor or Slot information is missing.");
      return;
    }

    console.log("Current Doctor:", currentDoctor);
    console.log("Selected Payment Method:", selectedMethod);

    const appointmentAt = formatDateTimeForAPI();

    const bookingData = {
      DoctorId: Number(currentDoctor.id),
      SlotId: Number(selectedSlotId),
      Amount: Number(currentDoctor?.pricePerHour || currentDoctor?.price || 300.0),
      Payment: Number(getPaymentCode()),
      Status: Number(getBookingStatus()),
      AppointmentAt: String(appointmentAt),
    };

    console.log("Booking data being sent:", bookingData);

    try {
      const result = await dispatch(createBooking(bookingData)).unwrap();

      console.log("✅ Booking Success:", result);

      //success popup if it was cash
      if (selectedMethod === "cash") {
        setShowSuccessPopup(true);
        setTimeout(() => {
          dispatch(resetBookingState());
          if (onClose) onClose();
        }, 2000);
      } 
      
      // Redireact if it's paypal or stripe
      else if (result?.paymentUrl) {
        console.log(" Redirecting to payment URL:", result.paymentUrl);
        window.location.href = result.paymentUrl; // Redirect للدفع
      } else {
        console.warn(" No payment URL received from API");
        alert("Payment URL not available. Please try again.");
      }

    } catch (error: any) {
      console.error(" Booking Error:", error);
      alert(` Booking failed: ${error || "Unknown error"}`);
    }
  };

  return (
    <div className="w-full lg:fixed lg:inset-0 lg:bg-black/50 lg:flex lg:items-center lg:justify-center z-10000">
      <div className="w-full px-4 py-6 lg:px-8 lg:w-[600px] lg:rounded-2xl lg:shadow-2xl lg:bg-white lg:my-0 lg:max-h-screen lg:overflow-y-auto relative">
        
        <button
          onClick={() => onClose && onClose()}
          className="hidden lg:block absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={22} />
        </button>

        <div className="mb-8">
          {currentDoctor ? <DoctorCardInfo doctor={currentDoctor} /> : null}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <CalendarIcon />
            <span className="ml-2 text-sm text-gray-600">
              {formatAppointmentDate()}
            </span>
          </div>
          <Link to={"/bookappointment"}>
            <button className="text-[#145DB8] font-medium hover:underline">
              Reschedule
            </button>
          </Link>
        </div>

        <div className="p-2 bg-white rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Payment Method
          </h2>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedMethod(option.id)}
                className={`flex items-center justify-between py-4 px-8 lg:py-4 lg:px-6 rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === option.id
                    ? "bg-[#EDF7EE]"
                    : "border-2 border-transparent hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === option.id
                        ? "bg-[#4CAF50] border-[#4CAF50]"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {selectedMethod === option.id && (
                      <Check size={16} className="text-white" />
                    )}
                  </div>
                  <span
                    className={`text-base ${
                      selectedMethod === option.id
                        ? "text-[#4CAF50] font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </span>
                </div>

                <div>{option.icon}</div>
              </div>
            ))}

            {selectedMethod !== "cash" && (
              <button className="w-full py-4 px-8 lg:py-2 lg:px-4 border-2 border-dashed border-[#145DB8] rounded-lg text-[#145DB8] hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium">
                <Plus size={20} />
                Add new card
              </button>
            )}
          </div>
        </div>

        {bookingError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">:( {bookingError}</p>
          </div>
        )}

        <SuccessBookingPopup
          isOpen={showSuccessPopup}
          onClose={() => {
            setShowSuccessPopup(false);
            if (onClose) onClose();
          }}
          doctorName={`Dr. ${currentDoctor?.fullName || "Unknown"}`}
          appointmentDate={selectedDate ? formatAppointmentDate().split("|")[0].trim() : ""}
          appointmentTime={selectedTime || "10:00 AM"}
        />

        <div className="flex flex-col md:flex-col md:items-center md:justify-between gap-4 mt-10">
          <div className="text-lg text-gray-700 flex items-center gap-2 justify-between w-full">
            <div className="flex items-end">
              <h1 className="font-medium text-3xl">Price</h1>  
              <span className="text-md text-gray-400">/hour</span>
            </div>

            <div>
              <span className="font-semibold text-xl text-red-500">
                {currentDoctor?.pricePerHour || currentDoctor?.price || 350}$
              </span>
            </div>
          </div>
          <button
            onClick={handlePayment}
            disabled={bookingLoading}
            className="w-full cursor-pointer bg-[#145DB8] hover:bg-[#143761] active:bg-white active:outline active:outline-[#145DB8] active:text-[#145DB8] duration-300 text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {bookingLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </>
            ) : selectedMethod === "cash" ? (
              "Confirm Booking"
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayPopup;