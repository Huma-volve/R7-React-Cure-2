import React from "react";
import { ResultsHeader } from "./ResultsHeader";
import { ViewToggle } from "./ViewToggle";
import { DoctorsListView } from "./DoctorsListView";
import { DoctorsMapView } from "./DoctorsMapView";
import type { Doctor } from "@/services/DoctorService.ts";

interface ResultsScreenProps {
  doctors: Doctor[];
  locationName: string;
  mapCenter: [number, number];
  userLocation: [number, number];
  viewMode: "map" | "list";
  onBack: () => void;
  onToggleView: () => void;
  onOpenSort: () => void;
  onOpenFilter: () => void;
  activeFiltersCount: number;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  doctors,
  locationName,
  mapCenter,
  userLocation,
  viewMode,
  onBack,
  onToggleView,
  onOpenSort,
  onOpenFilter,
  activeFiltersCount,
}) => {
  return (
    <div className="relative w-full h-screen bg-gray-50">
      <ResultsHeader locationName={locationName} onBack={onBack} />
      <ViewToggle
        viewMode={viewMode}
        onToggleView={onToggleView}
        onOpenSort={onOpenSort}
        onOpenFilter={onOpenFilter}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Results Count */}
      <div className="absolute top-52 left-4 z-40">
        <p className="text-blue-600 font-semibold text-sm">{doctors.length} Results</p>
      </div>

      {/* Content */}
      {viewMode === "list" ? (
        <DoctorsListView doctors={doctors} />
      ) : (
        <DoctorsMapView mapCenter={mapCenter} userLocation={userLocation} doctors={doctors} />
      )}
    </div>
  );
};