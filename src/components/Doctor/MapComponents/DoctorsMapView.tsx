import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router";
import type { Doctor } from "@/services/DoctorService.ts";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom doctor marker icon (Red Medical Icon)
const doctorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// User location marker icon (Blue Dot)
const userIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Component to update map center dynamically
function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

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
  console.log("🗺️ DoctorsMapView - Rendering map");
  console.log("📍 Map Center:", mapCenter);
  console.log("👤 User Location:", userLocation);
  console.log("👨‍⚕️ Total Doctors:", doctors.length);
  
  // Filter doctors with valid coordinates
  const doctorsWithCoords = doctors.filter((doc) => {
    const hasCoords = doc.latitude && doc.longitude;
    if (!hasCoords) {
      console.warn(`⚠️ Doctor ${doc.fullName} missing coordinates`);
    }
    return hasCoords;
  });

  console.log("✅ Doctors with coordinates:", doctorsWithCoords.length);

  return (
    <div className="absolute top-60 left-0 w-full h-[calc(100vh-240px)] z-10">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full rounded-t-3xl"
        style={{ zIndex: 10 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ChangeMapView center={mapCenter} />

        {/* User Location Marker - Blue Dot */}
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="text-center p-2">
              <p className="font-bold text-blue-600">📍 Your Location</p>
              <p className="text-xs text-gray-600 mt-1">You are here</p>
            </div>
          </Popup>
        </Marker>

        {/* Doctor Markers - Red Medical Icons */}
        {doctorsWithCoords.map((doc) => {
          console.log(`📌 Adding marker: ${doc.fullName} at [${doc.latitude}, ${doc.longitude}]`);
          
          return (
            <Marker 
              key={doc.id} 
              position={[doc.latitude, doc.longitude]} 
              icon={doctorIcon}
            >
              <Popup>
                <div className="p-3 min-w-[220px]">
                  {/* Doctor Image */}
                  {doc.imgUrl && (
                    <img
                      src={doc.imgUrl}
                      alt={doc.fullName}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                  )}
                  
                  {/* Doctor Name */}
                  <div className="font-bold text-gray-800 mb-1 text-base">
                    {doc.fullName}
                  </div>
                  
                  {/* Specialization */}
                  <div className="text-blue-600 font-semibold text-sm mb-2">
                    {doc.specialistTitle}
                  </div>
                  
                  {/* Address */}
                  {doc.address && (
                    <div className="text-gray-600 text-xs mb-2 flex items-center gap-1">
                      <MapPin size={12} className="shrink-0" /> 
                      <span className="line-clamp-2">{doc.address}</span>
                    </div>
                  )}
                  
                  {/* Rating & Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-xs">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">
                        {doc.rating || "N/A"}
                      </span>
                    </div>
                    {doc.price && (
                      <div className="text-sm font-bold text-green-600">
                        {doc.price} EGP
                      </div>
                    )}
                  </div>

                  {/* Distance */}
                  {doc.distance && (
                    <div className="text-xs text-gray-500 mb-3">
                      📍 {doc.distance.toFixed(1)} km away
                    </div>
                  )}
                  
                  {/* Book Button */}
                  <Link to={`/doctordetails/${doc.id}`}>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                      Book Appointment
                    </button>
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Info Badge */}
      {doctorsWithCoords.length > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-full px-5 py-2.5 text-sm font-bold z-[1000] border-2 border-blue-500">
          <span className="text-blue-600">{doctorsWithCoords.length}</span>
          <span className="text-gray-700"> doctor{doctorsWithCoords.length !== 1 ? 's' : ''} nearby</span>
        </div>
      )}

      {/* No Doctors Message */}
      {doctorsWithCoords.length === 0 && doctors.length > 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl rounded-lg p-6 text-center z-[1000]">
          <MapPin className="mx-auto mb-3 text-gray-400" size={48} />
          <p className="text-lg font-semibold text-gray-800">No map locations available</p>
          <p className="text-sm text-gray-600 mt-2">
            {doctors.length} doctor(s) found but coordinates are missing
          </p>
        </div>
      )}
    </div>
  );
};