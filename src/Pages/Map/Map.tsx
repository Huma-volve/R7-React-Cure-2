import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  latitude: number;
  longitude: number;
}

const mockDoctors: Doctor[] = [
  { id: 1, name: "Dr. Ahmed Hassan", specialty: "Cardiologist", location: "Nasr City", latitude: 30.0567, longitude: 31.3301 },
  { id: 2, name: "Dr. Sara Ali", specialty: "Dermatologist", location: "Heliopolis", latitude: 30.0867, longitude: 31.3405 },
  { id: 3, name: "Dr. Mohamed Adel", specialty: "Dentist", location: "Maadi", latitude: 29.9622, longitude: 31.2568 },
  { id: 4, name: "Dr. Youssef Nabil", specialty: "Orthopedic", location: "New Cairo", latitude: 30.0305, longitude: 31.4745 },
  { id: 5, name: "Dr. Laila Mahmoud", specialty: "Pediatrician", location: "Dokki", latitude: 30.038, longitude: 31.2123 },
  { id: 6, name: "Dr. Khaled Samir", specialty: "Neurologist", location: "Zamalek", latitude: 30.0626, longitude: 31.219 },
  { id: 7, name: "Dr. Heba Fouad", specialty: "Ophthalmologist", location: "Mohandessin", latitude: 30.0483, longitude: 31.2013 },
  { id: 8, name: "Dr. Tarek Ibrahim", specialty: "General Surgeon", location: "6th October", latitude: 29.96, longitude: 30.92 },
  { id: 9, name: "Dr. Nadia Mostafa", specialty: "Gynecologist", location: "Helwan", latitude: 29.85, longitude: 31.3342 },
  { id: 10, name: "Dr. Omar Farouk", specialty: "Psychiatrist", location: "Shubra", latitude: 30.1218, longitude: 31.2447 },
  { id: 10, name: "Dr. Omar Farouk", specialty: "Psychiatrist", location: "Faisal", latitude: 30.01744, longitude: 31.20376 },

];

const defaultCenter: [number, number] = [30.0444, 31.2357];

const userIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
  iconSize: [32, 32],
});

const doctorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
  iconSize: [32, 32],
});

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const DoctorMapSearch: React.FC = () => {
  const [center, setCenter] = useState<[number, number]>(defaultCenter);
  const [nearbyDoctors, setNearbyDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setCenter([pos.coords.latitude, pos.coords.longitude]),
        () => setCenter(defaultCenter)
      );
    }
  }, []);

  useEffect(() => {
    const [lat, lng] = center;
    const filtered = mockDoctors.filter(
      d => getDistance(lat, lng, d.latitude, d.longitude) <= 10
    );
    setNearbyDoctors(filtered);
  }, [center]);

  const handleSearch = () => {
    const locationMap: Record<string, [number, number]> = {
      "nasr city": [30.0567, 31.3301],
      "heliopolis": [30.0867, 31.3405],
      "maadi": [29.9622, 31.2568],
      "new cairo": [30.0305, 31.4745],
      "dokki": [30.038, 31.2123],
      "zamalek": [30.0626, 31.219],
      "mohandessin": [30.0483, 31.2013],
      "6th october": [29.96, 30.92],
      "helwan": [29.85, 31.3342],
      "shubra": [30.1218, 31.2447],
      "cairo": [30.0444, 31.2357],
      "giza": [30.0131, 31.2089],
      'faisal': [30.01744, 31.20376]
    };

    const key = Object.keys(locationMap).find(k =>
      query.toLowerCase().includes(k)
    );

    setCenter(locationMap[key || "cairo"]);
  };

  const bookAppointment = (doc: Doctor) => {
    alert(`✅ تم حجز موعد مع ${doc.name}\n${doc.specialty}`);
  };

  const focusOnDoctor = (doc: Doctor) => {
    setCenter([doc.latitude, doc.longitude]);
    setSelectedDoctor(doc);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2 flex items-center justify-center gap-3">
            <span className="text-5xl">🩺</span>
            ابحث عن الأطباء القريبين
          </h1>
          <p className="text-center text-blue-100 text-lg">اعثر على أفضل الأطباء في منطقتك</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg"
              placeholder="ابحث عن موقع... (مثال: Nasr City, Maadi, Heliopolis)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-md text-lg"
            >
              🔍 بحث
            </button>
          </div>
          <div className="text-center">
            <span className="inline-block bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-3 rounded-full text-gray-700 font-semibold border-2 border-blue-200">
              تم العثور على <span className="text-blue-600 text-xl mx-1">{nearbyDoctors.length}</span> طبيب في محيط 10 كم
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-[600px]">
            <MapContainer 
              center={center} 
              zoom={13} 
              className="w-full h-full"
              scrollWheelZoom={true}
            >
              <MapUpdater center={center} />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={center} icon={userIcon}>
                <Popup>
                  <div className="text-center font-semibold">
                    📍 موقعك الحالي
                  </div>
                </Popup>
              </Marker>

              {nearbyDoctors.map((doc) => (
                <Marker
                  key={doc.id}
                  position={[doc.latitude, doc.longitude]}
                  icon={doctorIcon}
                >
                  <Popup>
                    <div className="p-2">
                      <div className="font-bold text-gray-800 mb-1">{doc.name}</div>
                      <div className="text-blue-600 font-semibold mb-1">{doc.specialty}</div>
                      <div className="text-gray-600 text-sm">📍 {doc.location}</div>
                      <button
                        onClick={() => bookAppointment(doc)}
                        className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                      >
                        احجز موعد
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Doctors List */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-[600px] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-3xl">👨‍⚕️</span>
              الأطباء القريبون منك
            </h2>
            
            {nearbyDoctors.length > 0 ? (
              <div className="space-y-4">
                {nearbyDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-5 rounded-xl border-2 transition-all cursor-pointer transform hover:scale-[1.02] ${
                      selectedDoctor?.id === doc.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                    }`}
                    onClick={() => focusOnDoctor(doc)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{doc.name}</h3>
                        <div className="inline-block bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {doc.specialty}
                        </div>
                      </div>
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {getDistance(center[0], center[1], doc.latitude, doc.longitude).toFixed(1)} كم
                      </div>
                    </div>
                    
                    <div className="text-gray-600 mb-3 flex items-center gap-2">
                      <span>📍</span>
                      <span>{doc.location}</span>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        bookAppointment(doc);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-md"
                    >
                      احجز موعد
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 text-lg font-semibold mb-2">لا يوجد أطباء في هذا الموقع</p>
                <p className="text-gray-500">جرب البحث عن موقع آخر</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorMapSearch;