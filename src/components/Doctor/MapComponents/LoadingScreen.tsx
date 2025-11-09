import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

interface LoadingScreenProps {
  mapCenter: [number, number];
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ mapCenter }) => {
  return (
    <div className="relative w-full h-screen bg-white flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 right-0 p-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">Loading location</h2>
      </div>

      {/* Map Background */}
      <div className="w-full h-full opacity-20">
        <MapContainer
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={false}
          zoomControl={false}
          dragging={false}
          className="w-full h-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>

      {/* User Avatar with Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Pulse Rings */}
          <div className="absolute inset-0 -m-8 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
          <div className="absolute inset-0 -m-4 bg-blue-500 rounded-full opacity-40 animate-pulse"></div>

          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-200">
            <img
              src="/public/image/Profile-image.png"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="absolute bottom-20 text-center">
        <div className="flex items-center justify-center gap-1">
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};