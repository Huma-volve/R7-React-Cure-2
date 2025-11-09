import React from "react";
import { Link } from "react-router-dom";

interface PriceFooterProps {
  price?: number | string; // النوع ممكن يكون رقم أو نص لو جاي من API
}

const PriceFooter: React.FC<PriceFooterProps> = ({ price }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 z-20">
      <div className="flex flex-col items-center justify-between max-w-2xl mx-auto">
        {/* Price Section */}
        <div className="flex justify-between items-center w-full mb-4">
          <div>
            <span className="text-2xl font-semibold">Price</span>
            <span className="text-sm text-gray-400">/hour</span>
          </div>
          <span className="text-red-500 text-xl f">
            {price ? `${price}$` : "N/A"}
          </span>
        </div>

        {/* Book Button */}
        <Link
          to="/bookappointment"
          className="w-full bg-[#145DB8] hover:bg-[#173d6c] duration-300 text-white py-3 rounded-lg font-semibold"
        >
          <button className="w-full text-center cursor-pointer">
            Book Appointment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PriceFooter;
