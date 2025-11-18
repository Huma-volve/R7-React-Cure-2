import React, { useState } from "react";
import { X, Star } from "lucide-react";

export interface FilterOptions {
  specializations: string[];
  minRating: number;
  maxDistance: number;
  availability: string[];
  gender: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const SPECIALIZATIONS = [
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Dentistry",
  "Ophthalmology",
  "Psychiatry",
  "General Medicine",
];



export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      specializations: [],
      minRating: 0,
      maxDistance: 50,
      availability: [],
      gender: "all",
    };
    setFilters(resetFilters);
  };

  const toggleSpecialization = (spec: string) => {
    setFilters((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter((s) => s !== spec)
        : [...prev.specializations, spec],
    }));
  };



  return (
    <div className="fixed inset-0 z-9999 bg-black/50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Filter Doctors</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Specialization */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Specialization</h3>
            <div className="flex flex-wrap gap-2">
              {SPECIALIZATIONS.map((spec) => (
                <button
                  key={spec}
                  onClick={() => toggleSpecialization(spec)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    filters.specializations.includes(spec)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Minimum Rating</h3>
            <div className="flex gap-2">
              {[0, 3, 3.5, 4, 4.5, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilters((prev) => ({ ...prev, minRating: rating }))}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition ${
                    filters.minRating === rating
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Star
                    size={14}
                    className={filters.minRating === rating ? "fill-white" : "fill-yellow-400"}
                  />
                  {rating === 0 ? "All" : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">Maximum Distance</h3>
              <span className="text-blue-600 font-semibold">{filters.maxDistance} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.maxDistance}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxDistance: parseInt(e.target.value) }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>


        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};