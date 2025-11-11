import React from "react";
import { SlidersHorizontal, MapPin, Filter } from "lucide-react";

interface ViewToggleProps {
  viewMode: "map" | "list";
  onToggleView: () => void;
  onOpenSort: () => void;
  onOpenFilter: () => void;
  activeFiltersCount: number;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  onToggleView,
  onOpenSort,
  onOpenFilter,
  activeFiltersCount,
}) => {
  return (
    <div className="absolute top-36 left-0 right-0 z-40 px-4 flex items-center gap-2">
      <button
        onClick={onOpenSort}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
      >
        <SlidersHorizontal size={16} />
        Sort
      </button>
      <button
        onClick={onOpenFilter}
        className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
      >
        <Filter size={16} />
        Filter
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </button>
      <button
        onClick={onToggleView}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
          viewMode === "map"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 border border-gray-200"
        }`}
      >
        <MapPin size={16} />
        Map
      </button>
    </div>
  );
};