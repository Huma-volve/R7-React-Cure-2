import { useDoctorsFilter } from '@/context/DoctorsFilterContext';
import React from 'react';

const DoctorsFilter: React.FC = () => {
    const { selectedGender, setSelectedGender } = useDoctorsFilter();

    return (
        <div>
            {/* Gender Filter */}
            <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">Gender</h4>
                <div className="flex gap-2">
                    {['All', 'Male', 'Female'].map((gender) => (
                        <button
                            key={gender}
                            onClick={() => setSelectedGender(gender as 'Male' | 'Female' | 'All')}
                            className={`px-4 py-1 rounded-md border text-sm font-medium transition-all ${
                                selectedGender === gender
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {gender}
                        </button>
                    ))}
                </div>
            </div>

            {/* Consultation Type */}
            <div>
                <h4 className="font-semibold text-sm mb-3">Consultation Type</h4>
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input type="checkbox" className="accent-blue-600" /> In-clinic
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-blue-600" /> Home Visit
                </label>
            </div>
        </div>
    );
};

export default DoctorsFilter;
