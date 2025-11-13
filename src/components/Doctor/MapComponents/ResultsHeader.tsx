import React from "react";
import { ArrowLeft, MapPin, Search } from "lucide-react";

interface ResultsHeaderProps {
  locationName: string;
  onBack: () => void;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({ locationName, onBack }) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center gap-3 mb-3">
        <button onClick={onBack}>
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-blue-600 flex items-center gap-1">
            <MapPin size={12} />
            Your location
          </p>
          <p className="text-sm font-semibold text-gray-800 truncate">{locationName}</p>
        </div>

      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search for specialty, doctor"
          className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg text-sm"
        />
      </div>
    </div>
  );
};