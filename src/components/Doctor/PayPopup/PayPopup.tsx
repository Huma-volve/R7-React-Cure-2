import DoctorCardInfo from "@/components/Doctor/DoctorCardInfo/DoctorCardInfo";
import { CalendarIcon } from "@/components/Doctor/icons";
import { useState } from "react";
import { Plus, Check, X } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

interface PayPopupProps {
  onClose?: () => void;
  selectedDate?: Date;
  selectedTime?: string;
}

const PayPopup = ({ onClose, selectedDate, selectedTime }: PayPopupProps) => {
  const [selectedMethod, setSelectedMethod] = useState("credit-cart");
  
  // Get doctor data from Redux
  const { currentDoctor } = useAppSelector((state) => state.doctor);

  const paymentOptions = [
    { id: "credit-cart", label: "Credit Cart", icon: "VISA" },
    { id: "paypal", label: "PayPal", icon: "PP" },
    { id: "apple-pay", label: "Apple Pay", icon: "AP" },
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

  const handlePayment = () => {
    // هنا تقدر تضيف الـ API call للدفع
    console.log("Payment processing...", {
      method: selectedMethod,
      doctorId: currentDoctor?.id,
      price: currentDoctor?.price,
      date: selectedDate,
      time: selectedTime
    });
    
    // After successful payment
    alert("Payment successful! 🎉");
    if (onClose) onClose();
  };

  return (
    <div
      className="
        w-full
        lg:fixed lg:inset-0 lg:bg-black/50 lg:flex lg:items-center lg:justify-center
        z-50
      "
    >
      <div
        className="
          w-full px-4 py-6 lg:px-8 
          lg:w-[600px] lg:rounded-2xl lg:shadow-2xl lg:bg-white lg:my-0
          lg:max-h-screen lg:overflow-y-auto relative
        "
      >
        {/* ❌ زر الإغلاق للـ Popup */}
        <button
          onClick={() => onClose && onClose()}
          className="hidden lg:block absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover-text-2xl transition"
        >
          <X size={22} />
        </button>

        {/* Doctor Info */}
        <div className="mb-8">
          <DoctorCardInfo doctor={currentDoctor} />
        </div>

        {/* Appointment Info */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <CalendarIcon />
            <span className="ml-2 text-sm text-gray-600">
              {formatAppointmentDate()}
            </span>
          </div>
          <button className="text-[#145DB8] font-medium hover:underline">
            Reschedule
          </button>
        </div>

        {/* Payment Method Section */}
        <div className="p-2 bg-white rounded-lg ">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Payment Method
          </h2>

          <div className="space-y-2">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedMethod(option.id)}
                className={`flex items-center justify-between py-4 px-8 lg:py-4 lg:px-6 rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === option.id
                    ? "bg-[#EDF7EE]  "
                    : " border-2 border-transparent hover:border-gray-200"
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

                <div
                  className={`px-3 py-1 rounded text-sm font-bold ${
                    option.id === "credit-cart"
                      ? "bg-blue-600 text-white"
                      : option.id === "paypal"
                      ? "bg-blue-700 text-white"
                      : "bg-black text-white"
                  }`}
                >
                  {option.icon}
                </div>
              </div>
            ))}

            {/* Add Card Button */}
            <button
              className="w-full py-4 px-8 lg:py-2 lg:px-4  border-2 border-dashed border-[#145DB8] rounded-lg text-[#145DB8] hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={20} />
              Add new card
            </button>
          </div>
        </div>

        {/* Total and Pay Button */}
        <div className=" flex flex-col md:flex-col md:items-center md:justify-between gap-4 mt-10">
          <div className="text-lg text-gray-700 flex items-center gap-2 justify-between w-full">
            <div className="flex items-end">
              <h1 className="font-medium text-3xl">Price</h1>  
              <span className="text-md text-gray-400">/hour</span>
            </div>

            <div>
              <span className="font-semibold text-xl text-red-500">
                {currentDoctor?.price || 350}$
              </span>
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="w-full cursor-pointer bg-[#145DB8] hover:bg-[#143761] active:bg-white active:outline active:outline-[#145DB8] active:text-[#145DB8] duration-300 text-white py-3 px-6 rounded-xl font-semibold"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayPopup;