import { BackwardArrow } from "@/components/Doctor/icons"
import PayPopup from "@/components/Doctor/PayPopup/PayPopup"
import { useLocation, useNavigate } from "react-router-dom"

interface LocationState {
  selectedSlotId: number;
  selectedDate: string;
  selectedTime: string;
  doctorId: number;
  price: number;
}

const PayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state?.selectedSlotId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-600">No booking data found</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center relative mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="cursor-pointer absolute left-5"
        >
          <BackwardArrow />
        </button>
        <h1 className="text-gray-800 font-semibold text-lg">
          Book Appointment
        </h1>
      </div>
      <PayPopup 
        selectedDate={new Date(state.selectedDate)}
        selectedTime={state.selectedTime}
        selectedSlotId={state.selectedSlotId}
        onClose={() => navigate(-1)}
      />
    </>
  )
}

export default PayPage