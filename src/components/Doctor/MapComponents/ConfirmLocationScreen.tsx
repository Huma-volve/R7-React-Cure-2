import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Navigation, SearchIcon } from "lucide-react";
import { BackwardArrow } from "../icons.tsx";
import { ChangeMapView } from "./ChangeMapView.tsx";
import { userIcon } from "./MapUtils.ts";

interface ConfirmLocationScreenProps {
  mapCenter: [number, number];
  userLocation: [number, number];
  locationName: string;
  searchAddress: string;
  setSearchAddress: (value: string) => void;
  onSearchLocation: () => void;
  onConfirmLocation: () => void;
  onGetCurrentLocation: () => void;
}

export const ConfirmLocationScreen: React.FC<ConfirmLocationScreenProps> = ({
  mapCenter,
  userLocation,
  locationName,
  searchAddress,
  setSearchAddress,
  onSearchLocation,
  onConfirmLocation,
  onGetCurrentLocation,
}) => {
  return (
    <div className="relative w-full h-screen bg-white">
      {/* الخريطة */}
      <MapContainer
        center={mapCenter}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView center={mapCenter} />
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="text-center p-2">
              <p className="font-bold text-blue-600">📍 Your Location</p>
              <p className="text-xs text-gray-600 mt-1">{locationName}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Search bar فوق الخريطة */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-1000 bg-white rounded-3xl shadow-lg p-6 flex items-center gap-5 w-[90%] max-w-md">
        <button onClick={() => window.history.back()}>
          <BackwardArrow className="text-blue-500" />
        </button>
        <input
          type="text"
          placeholder="Search fro Location..."
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onSearchLocation()}
          className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
        />
        <button
          onClick={onSearchLocation}
          className="border border-[#F5F6F7] hover:bg-[#F5F6F7] p-2 rounded-xl transition"
        >
          <SearchIcon size={18} />
        </button>
      </div>

      {/* Confirm location button تحت */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-1000 w-[90%] max-w-md">
        <button
          onClick={onConfirmLocation}
          className="w-full bg-[#145DB8] text-white py-4 rounded-xl text-base font-semibold shadow-md hover:bg-[#103f77] active:bg-white active:border active:border-[#145DB8] active:text-[#145DB8] transition duration-300"
        >
          Confirm location
        </button>
      </div>

      {/* Current Location Button */}
      <button
        onClick={onGetCurrentLocation}
        className="absolute bottom-24 right-4 z-1000 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition"
      >
        <Navigation size={24} className="text-blue-600" />
      </button>
    </div>
  );
};