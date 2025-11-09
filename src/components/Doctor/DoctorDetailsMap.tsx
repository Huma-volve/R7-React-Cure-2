// components/MapView.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  latitude: number;
  longitude: number;
  doctorName?: string;
  address?: string;
}

const DoctorDetailsMap: React.FC<MapViewProps> = ({ latitude, longitude, doctorName, address }) => {
  // Default coordinates (Cairo) in case lat/lng are 0
  const defaultLat = 30.0444;
  const defaultLng = 31.2357;
  
  const displayLat = latitude !== 0 ? latitude : defaultLat;
  const displayLng = longitude !== 0 ? longitude : defaultLng;

  return (
    <MapContainer
      center={[displayLat, displayLng]}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[displayLat, displayLng]}>
        <Popup>
          {doctorName && <strong>{doctorName}</strong>}
          {address && <p className="text-sm mt-1">{address}</p>}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default DoctorDetailsMap;