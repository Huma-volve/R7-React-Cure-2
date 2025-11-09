import { useNavigate } from "react-router";

interface SuccessBookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName?: string;
  appointmentDate?: string;
  appointmentTime?: string;
}

const SuccessBookingPopup = ({
  isOpen,
  onClose,
  doctorName = "Dr. David Patel",
  appointmentDate = "June 30, 2023",
  appointmentTime = "10:00 AM",
}: SuccessBookingPopupProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDone = () => {
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-[#0000007b] backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[48px] shadow-2xl max-w-md w-full p-8 text-center animate-scaleIn">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-[#6292CF] rounded-full flex items-center justify-center shadow-lg">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
              >
                <path
                  d="M32.8799 6.18001L16.3799 12.36C13.2299 13.56 10.6499 17.28 10.6499 20.67V44.97C10.6499 47.4 12.2399 50.61 14.1899 52.05L30.6899 64.38C33.5999 66.57 38.3699 66.57 41.2799 64.38L57.7799 52.05C59.7299 50.58 61.3199 47.4 61.3199 44.97V20.67C61.3199 17.31 58.7399 13.56 55.5899 12.39L39.0899 6.21001C37.4099 5.55001 34.5899 5.55001 32.8799 6.18001Z"
                  fill="white"
                />
                <path
                  d="M31.9797 42.69C31.4097 42.69 30.8397 42.48 30.3897 42.03L25.5597 37.2C24.6897 36.33 24.6897 34.89 25.5597 34.02C26.4297 33.15 27.8697 33.15 28.7397 34.02L31.9797 37.26L43.2897 25.95C44.1597 25.08 45.5997 25.08 46.4697 25.95C47.3397 26.82 47.3397 28.26 46.4697 29.13L33.5697 42.03C33.1197 42.48 32.5497 42.69 31.9797 42.69Z"
                  fill="#145DB8"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Congratulations!
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-base leading-relaxed mb-8 px-2">
          Your appointment with{" "}
          <span className="font-semibold text-gray-700">{doctorName}</span> is
          confirmed for{" "}
          <span className="font-semibold text-gray-700">
            {appointmentDate}
          </span>
          , at{" "}
          <span className="font-semibold text-gray-700">{appointmentTime}</span>
          .
        </p>

        {/* Done Button */}
        <button
          onClick={handleDone}
          className="w-full bg-[#05162C] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#122c4f] transition duration-300 active:bg-white active:border-2 active:border-[#05162C] active:text-[#05162C] cursor-pointer mb-4"
        >
          Done
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SuccessBookingPopup;