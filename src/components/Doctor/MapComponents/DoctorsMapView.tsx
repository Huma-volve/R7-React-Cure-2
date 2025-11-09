import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Star } from "lucide-react";
import { ChangeMapView } from "./ChangeMapView.tsx";
import { doctorIcon, userIcon } from "./MapUtils.ts";
import type { Doctor } from "@/services/DoctorService.ts";

interface DoctorsMapViewProps {
  mapCenter: [number, number];
  userLocation: [number, number];
  doctors: Doctor[];
}

export const DoctorsMapView: React.FC<DoctorsMapViewProps> = ({
  mapCenter,
  userLocation,
  doctors,
}) => {
  return (
    <div className="w-full h-full pt-52">
      <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ChangeMapView center={mapCenter} />

        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="text-center p-2">
              <p className="font-bold text-blue-600">📍 Your Location</p>
            </div>
          </Popup>
        </Marker>

        {doctors.map((doc) => (
          <Marker
            key={doc.id}
            position={[doc.latitude, doc.longitude]}
            icon={doctorIcon}
          >
            <Popup>
              <div className="p-2 min-w-[150px]">
                <div className="font-bold text-gray-800 text-sm">{doc.name}</div>
                <div className="text-blue-600 text-xs mt-1">{doc.specialization}</div>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  <span>{doc.rating || "4.8"}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};