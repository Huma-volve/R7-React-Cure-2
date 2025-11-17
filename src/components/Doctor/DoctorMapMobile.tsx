import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { ConfirmLocationScreen } from "./MapComponents/ConfirmLocationScreen";
import { LoadingScreen } from "./MapComponents/LoadingScreen";
import { ResultsScreen } from "./MapComponents/ResultsScreen";
import { FilterModal, type FilterOptions } from "./MapComponents/FilterModal";
import { SortModal, type SortOption } from "./MapComponents/SortModal";
import { reverseGeocode, searchLocation as searchLocationUtil } from "./MapComponents/MapUtils";
import { searchDoctors, type Doctor } from "@/services/DoctorService.ts";

const DoctorMapMobile: React.FC = () => {
  const [step, setStep] = useState<"confirm" | "loading" | "results">("confirm");
  const [searchAddress, setSearchAddress] = useState("");
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number]>([30.0444, 31.2357]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([30.0444, 31.2357]);
  const [locationName, setLocationName] = useState("129, El-Nasr Street, Cairo");
  const [viewMode, setViewMode] = useState<"map" | "list">("list");
  
  // Filter & Sort States
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    specializations: [],
    minRating: 0,
    maxDistance: 50,
    availability: [],
    gender: "all",
  });
  const [sortBy, setSortBy] = useState<SortOption>("distance");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);
          setMapCenter(coords);
          
          // Get location name
          const name = await reverseGeocode(coords[0], coords[1]);
          if (name) setLocationName(name);
        },
        () => {
          console.log("Location access denied. Using default location.");
        }
      );
    }
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [allDoctors, filters, sortBy]);

  const reverseGeocodeLocation = async (lat: number, lng: number) => {
    const name = await reverseGeocode(lat, lng);
    if (name) setLocationName(name);
  };

  const handleSearchLocation = async () => {
    const result = await searchLocationUtil(searchAddress);
    if (result) {
      setUserLocation(result.location);
      setMapCenter(result.location);
      setLocationName(result.displayName);
      setSearchAddress("");
    } else {
      alert("Location not found. Please try again.");
    }
  };

  const handleConfirmLocation = async () => {
    setStep("loading");
    
    try {
      // البحث عن الأطباء بناءً على الموقع المحدد
      console.log("🔍 Searching for doctors at:", userLocation);
      const doctorsList = await searchDoctors(userLocation);
      console.log("✅ Doctors found:", doctorsList);
      
      setAllDoctors(doctorsList);
      
      // انتظار قليلاً لعرض شاشة التحميل
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setStep("results");
    } catch (error) {
      console.error("❌ Error fetching doctors:", error);
      alert("حدث خطأ أثناء البحث عن الأطباء");
      setStep("confirm");
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);
          setMapCenter(coords);
          reverseGeocodeLocation(coords[0], coords[1]);
        },
        () => {
          alert("لا يمكن الوصول إلى موقعك الحالي");
        }
      );
    }
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "map" ? "list" : "map"));
  };

  const applyFiltersAndSort = () => {
    let result = [...allDoctors];

    // Apply Filters
    if (filters.specializations.length > 0) {
      result = result.filter((doc) =>
        filters.specializations.includes(doc.specialization)
      );
    }

    if (filters.minRating > 0) {
      result = result.filter((doc) => (doc.rating || 0) >= filters.minRating);
    }

    if (filters.gender !== "all") {
      result = result.filter(
        (doc) => (doc as any).gender?.toLowerCase() === filters.gender
      );
    }

    // Apply Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "distance":
          const distA = calculateDistance(userLocation, [a.latitude, a.longitude]);
          const distB = calculateDistance(userLocation, [b.latitude, b.longitude]);
          return distA - distB;
        case "price-low":
          return ((a as any).price || 0) - ((b as any).price || 0);
        case "price-high":
          return ((b as any).price || 0) - ((a as any).price || 0);
        case "experience":
          return ((b as any).experience || 0) - ((a as any).experience || 0);
        default:
          return 0;
      }
    });

    setFilteredDoctors(result);
  };

  const calculateDistance = (
    point1: [number, number],
    point2: [number, number]
  ): number => {
    const [lat1, lon1] = point1;
    const [lat2, lon2] = point2;
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleApplySort = (newSort: SortOption) => {
    setSortBy(newSort);
  };

  const getActiveFiltersCount = (): number => {
    let count = 0;
    if (filters.specializations.length > 0) count++;
    if (filters.minRating > 0) count++;
    if (filters.availability.length > 0) count++;
    if (filters.gender !== "all") count++;
    if (filters.maxDistance < 50) count++;
    return count;
  };

  if (step === "confirm") {
    return (
      <ConfirmLocationScreen
        mapCenter={mapCenter}
        userLocation={userLocation}
        locationName={locationName}
        searchAddress={searchAddress}
        setSearchAddress={setSearchAddress}
        onSearchLocation={handleSearchLocation}
        onConfirmLocation={handleConfirmLocation}
        onGetCurrentLocation={getCurrentLocation}
      />
    );
  }

  if (step === "loading") {
    return <LoadingScreen mapCenter={mapCenter} />;
  }

  return (
    <>
      <ResultsScreen
        doctors={filteredDoctors}
        locationName={locationName}
        mapCenter={mapCenter}
        userLocation={userLocation}
        viewMode={viewMode}
        onBack={() => setStep("confirm")}
        onToggleView={toggleViewMode}
        onOpenSort={() => setShowSortModal(true)}
        onOpenFilter={() => setShowFilterModal(true)}
        activeFiltersCount={getActiveFiltersCount()}
      />

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />

      <SortModal
        isOpen={showSortModal}
        onClose={() => setShowSortModal(false)}
        onApply={handleApplySort}
        currentSort={sortBy}
      />
    </>
  );
};

export default DoctorMapMobile;
