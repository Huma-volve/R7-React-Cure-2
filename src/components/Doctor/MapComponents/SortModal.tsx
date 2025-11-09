import React, { useState } from "react";
import { X, Check } from "lucide-react";

export type SortOption =
  | "distance"
  | "rating"
  | "price-low"
  | "price-high"
  | "experience"
  | "availability";

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (sortBy: SortOption) => void;
  currentSort: SortOption;
}

const SORT_OPTIONS: { value: SortOption; label: string; description: string }[] = [
  {
    value: "distance",
    label: "Nearest First",
    description: "Sort by distance from your location",
  },
  {
    value: "rating",
    label: "Highest Rated",
    description: "Sort by patient reviews and ratings",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
    description: "Sort by consultation fees (lowest first)",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
    description: "Sort by consultation fees (highest first)",
  },
  {
    value: "experience",
    label: "Most Experienced",
    description: "Sort by years of practice",
  },
  {
    value: "availability",
    label: "Available Now",
    description: "Sort by immediate availability",
  },
];

export const SortModal: React.FC<SortModalProps> = ({
  isOpen,
  onClose,
  onApply,
  currentSort,
}) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>(currentSort);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(selectedSort);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-9999 bg-black/50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[80vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Sort By</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedSort(option.value)}
                className={`w-full p-4 rounded-xl text-left transition ${
                  selectedSort === option.value
                    ? "bg-blue-50 border-2 border-blue-600"
                    : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-base ${
                        selectedSort === option.value ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                  {selectedSort === option.value && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleApply}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Apply
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