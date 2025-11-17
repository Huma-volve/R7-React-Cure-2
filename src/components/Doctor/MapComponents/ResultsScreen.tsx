import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Star, List, Map as MapIcon, ChevronLeft, Filter, ArrowUpDown } from "lucide-react";
import { Link } from "react-router";
import { FilterMapToggle, MapToggle, SortMapToggle } from "../icons";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom doctor marker icon
const doctorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// User location marker icon
const userIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Component to update map center
function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

interface Doctor {
  id: number;
  fullName: string;
  specialistTitle: string;
  imgUrl?: string;
  rating?: number;
  price?: number;
  address?: string;
  latitude: number;
  longitude: number;
  about?: string;
  distance?: number;
}

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
  console.log("🗺️ ResultsScreen - Doctors:", doctors);
  console.log("📍 User Location:", userLocation);
  console.log("🎯 Map Center:", mapCenter);

  return (
    <div className="relative w-full h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex flex-col items-center justify-between z-10 ">

        <div className="flex-1 mx-4 flex flex-col  items-center ">
        <div className="flex items-center">
          <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ChevronLeft size={24} />
        </button>
          <h2 className="font-bold text-lg truncate">{locationName}</h2>
          </div>
          <p className="text-sm text-gray-600">{doctors.length} doctors found</p>
        </div>

        <div className="flex gap-[24px] w-full">
          <button
            onClick={onOpenFilter}
            className="relative  hover:bg-gray-100 rounded-[10px] transition duration-300 border border-[#BBC1C7] px-3 h-9 flex items-center gap-2 w-full justify-center"
          >
            <FilterMapToggle  />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
              
            )}Filter
          </button>
          <button
            onClick={onOpenSort}
            className=" hover:bg-gray-100 rounded-[10px] transition duration-300 border border-[#BBC1C7] px-3 h-9 flex items-center gap-2 w-full justify-center"
          >
            <SortMapToggle />
            Sort
          </button>
          <button
            onClick={onToggleView}
            className=" hover:bg-gray-100 rounded-[10px] transition duration-300 border border-[#BBC1C7] px-3 h-9 flex items-center gap-2 w-full justify-center"
          >
            {viewMode === "map" ? <List size={20} /> : <MapToggle  />}
            Map
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {viewMode === "list" ? (
          /* List View */
          <div className="h-full overflow-y-auto p-4 space-y-3">
            {doctors.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MapPin className="mx-auto mb-3 text-gray-400" size={48} />
                <p className="text-lg font-semibold">No doctors found</p>
                <p className="text-sm mt-2">Try adjusting your filters or search area</p>
              </div>
            ) : (
              doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    <Link to={`/doctordetails/${doc.id}`}>
                      <div className="shrink-0">
                        <img
                          src={doc.imgUrl || "https://via.placeholder.com/80x80?text=Dr"}
                          alt={doc.fullName}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base mb-1 truncate">
                        {doc.fullName}
                      </h3>
                      <p className="text-blue-600 text-sm mb-2">{doc.specialistTitle}</p>
                      <p className="text-gray-600 text-xs mb-2 flex items-center gap-1">
                        <MapPin size={12} className="shrink-0" />
                        <span className="truncate">{doc.address || "Location not specified"}</span>
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">{doc.rating || "N/A"}</span>
                        </div>
                        {doc.price && (
                          <div>Price: {doc.price} EGP</div>
                        )}
                        {doc.distance && (
                          <div>{doc.distance.toFixed(1)} km away</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Map View */
          <div className="w-full h-full">
            <MapContainer
              center={mapCenter}
              zoom={13}
              scrollWheelZoom={true}
              className="w-full h-full"
              key={`${mapCenter[0]}-${mapCenter[1]}`}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <ChangeMapView center={mapCenter} />

              {/* User Location Marker */}
              <Marker position={userLocation} icon={userIcon}>
                <Popup>
                  <div className="text-center p-2">
                    <p className="font-bold text-blue-600">📍 Your Location</p>
                    <p className="text-xs text-gray-600 mt-1">{locationName}</p>
                  </div>
                </Popup>
              </Marker>

              {/* Doctor Markers */}
              {doctors
                .filter((doc) => doc.latitude && doc.longitude)
                .map((doc) => {
                  console.log(`📌 Adding marker for ${doc.fullName} at [${doc.latitude}, ${doc.longitude}]`);
                  
                  return (
                    <Marker 
                      key={doc.id} 
                      position={[doc.latitude, doc.longitude]} 
                      icon={doctorIcon}
                    >
                      <Popup>
                        <div className="p-3 min-w-[200px]">
                          <div className="font-bold text-gray-800 mb-2 text-base">
                            {doc.fullName}
                          </div>
                          <div className="text-blue-600 font-semibold text-sm mb-2">
                            {doc.specialistTitle}
                          </div>
                          {doc.address && (
                            <div className="text-gray-600 text-xs mb-2 flex items-center gap-1">
                              <MapPin size={12} /> {doc.address}
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-xs text-gray-700 mb-2">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">{doc.rating || "N/A"}</span>
                          </div>
                          {doc.price && (
                            <div className="text-sm text-gray-700 mb-3">
                              Price: {doc.price} EGP
                            </div>
                          )}
                          <Link to={`/doctordetails/${doc.id}`}>
                            <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-xs hover:bg-blue-700 transition">
                              Book Now
                            </button>
                          </Link>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
            </MapContainer>

            {/* Floating Doctors Count */}
            {doctors.length > 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full px-4 py-2 text-sm font-semibold z-[1000]">
                {doctors.length} doctor{doctors.length !== 1 ? 's' : ''} nearby
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};