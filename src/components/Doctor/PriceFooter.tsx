// components/PriceFooter.tsx
import React from 'react';
import { Link } from 'react-router';

const PriceFooter: React.FC = () => {
  return (
    <div className="fixed lg:block bottom-0 left-0 w-full  bg-white shadow-lg p-4">
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
          <button className='w-full text-center cursor-pointer'>
            Book Appointment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PriceFooter;