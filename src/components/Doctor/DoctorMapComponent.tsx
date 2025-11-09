import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Star, Search } from "lucide-react";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const doctorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
  iconSize: [40, 40],
});

const userIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
  iconSize: [32, 32],
});

// Component to update map center
function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

const DoctorMapComponent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  
  const [searchAddress, setSearchAddress] = useState("");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number]>([30.0444, 31.2357]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([30.0444, 31.2357]);
  const [isSearching, setIsSearching] = useState(false);
  const [locationName, setLocationName] = useState("القاهرة، مصر");
  const [isSearchingMode, setIsSearchingMode] = useState(false);

  // Get user's current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);
          setMapCenter(coords);
          reverseGeocode(coords[0], coords[1]);
        },
        () => {
          console.log("Location access denied. Using default location.");
        }
      );
    }
  }, []);

  // Reverse geocode to get address from coordinates
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      if (data.display_name) {
        setLocationName(data.display_name);
      }
      console.log(data)
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  // Search for location by address
  const searchLocation = async () => {
    if (!searchAddress.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchAddress)}&format=json&limit=1`
      );
      const data = await response.json();
      console.log(data)

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newLocation: [number, number] = [parseFloat(lat), parseFloat(lon)];
        
        setUserLocation(newLocation);
        setMapCenter(newLocation);
        setLocationName(display_name);
        
        await searchDoctors(newLocation);
        setIsSearchingMode(false);
      } else {
        alert("لم يتم العثور على الموقع. حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("Error searching location:", error);
      alert("حدث خطأ أثناء البحث. حاول مرة أخرى.");
    } finally {
      setIsSearching(false);
    }
  };

  // Search for doctors near location
  const searchDoctors = async (location: [number, number]) => {
    try {
      const [lat, lng] = location;
      const token = Cookies.get("accessToken");

      const res = await fetch(
        `https://cure-doctor-booking.runasp.net/api/Customer/SearchData/SearchByLocation?latitude=${lat}&longitude=${lng}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      const doctorsList = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];

      
      console.log("📍 Nearby Doctors:", doctorsList);
      setDoctors(doctorsList);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchLocation();
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-50 flex">
      
      {/* Left Sidebar - Doctors List */}
      {!isHomePage && (
        <div className="w-[400px] h-full bg-white shadow-xl overflow-y-auto z-10">
          {/* Header */}
          <div className="sticky top-0  p-4 z-20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-800">
                {doctors.length} Results
              </h2>

            </div>
          </div>

          {/* Doctors List */}
          <div className="p-4 space-y-3">
            {doctors.length === 0 ? (
              <>


              
              {/* statatic data if there is data for doctors */}
              <div>statatic data if there is NO data for doctors</div>
                <div
                  className=" rounded-lg p-4 shadow-md cursor-pointer"
                >
                  <div className="flex gap-3">
                    {/* Doctor Image */}
                    <div className="shrink-0">
                      <img
                        src="/public/images/magdyYacob.jpg"
                        alt=""
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base mb-1 truncate">
                        Magdy yacoub
                      </h3>

                      <p className="text-gray-600 text-xs mb-2 flex items-center gap-1">
                        <MapPin size={12} className="shrink-0" />
                        <span className="truncate">Sergury | 357357</span>
                      </p>
                      
                      {/* Rating & Working Hours */}
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">4.8</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                          </svg>
                          <span>9:30am - 8:00pm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              <div className="text-center py-12 text-gray-500">
                <MapPin className="mx-auto mb-3 text-gray-400" size={48} />
                <p className="text-lg font-semibold">No doctors found</p>
                <p className="text-sm mt-2">Try searching in a different area</p>
              </div>



              </>
            ) : (
              doctors.map((doc: any) => (
                <div
                  key={doc.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex gap-3">
                    {/* Doctor Image */}
                    <Link to={`doctordetails/${doc.doctorId}`}>
                      <div className="shrink-0">
                        <img
                          src={doc.imageUrl || "https://via.placeholder.com/80x80?text=Dr"}
                          alt={doc.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      </div>
                    </Link>
                    {/* Doctor Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base mb-1 truncate">
                        {doc.name}
                      </h3>

                      <p className="text-gray-600 text-xs mb-2 flex items-center gap-1">
                        <MapPin size={12} className="shrink-0" />
                        <span className="truncate">{ doc.specialization || doc.hospital|| "Location not specified"}</span>
                      </p>
                      
                      {/* Rating & Working Hours */}
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">{doc.rating || "4.8"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                          </svg>
                          <span>{doc.workingHours || "9:30am - 8:00pm"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Right Side - Map */}
      <div className="flex-1 relative">
        {/* Search Bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-1000 bg-white shadow-lg rounded-lg px-4 py-3 flex items-center gap-2 w-[80%] max-w-2xl">
          <MapPin className="text-blue-500" size={20} />

          {isSearchingMode ? (
            <>
              <input
                type="text"
                placeholder="Search for Doctors by Location"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                disabled={isSearching}
                autoFocus
              />
              <button
                onClick={searchLocation}
                disabled={isSearching}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center gap-2"
              >
                <Search size={16} />
                {isSearching ? "Searching..." : "Search"}
              </button>
              <button
                onClick={() => setIsSearchingMode(false)}
                className="bg-gray-200 text-gray-700 px-2 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
              >
                Cancel 
              </button>
            </>
          ) : (
            <div className="flex justify-between items-center w-full">
              <p className="text-sm font-semibold text-gray-800 truncate">{locationName}</p>
              <button
                onClick={() => setIsSearchingMode(true)}
                className="bg-[#145DB8] text-white p-2 rounded-lg hover:bg-[#164074] transition duration-300"
              >
                <Search size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Map */}
        <MapContainer
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full"
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
                <p className="font-bold text-blue-600">📍 موقعك</p>
                <p className="text-xs text-gray-600 mt-1">{locationName}</p>
              </div>
            </Popup>
          </Marker>

          {/* Doctor Markers */}
          {doctors.map((doc: any) => (
            <Marker
              key={doc.id}
              position={[doc.latitude, doc.longitude]}
              icon={doctorIcon}
            >
              <Popup>
                <div className="p-3 min-w-[200px]">
                  <div className="font-bold text-gray-800 mb-2 text-base">{doc.name}</div>
                  <div className="text-blue-600 font-semibold text-sm mb-2">
                    {doc.specialization}
                  </div>
                  <div className="text-gray-600 text-xs mb-2 flex items-center gap-1">
                    <MapPin size={12} /> {doc.hospital || "غير محدد"}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{doc.rating || "N/A"}</span>
                    <span className="text-gray-500">(تقييم)</span>
                  </div>
                  <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-xs hover:bg-blue-700 transition">
                    احجز الآن
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default DoctorMapComponent;