import L from "leaflet";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const doctorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
  iconSize: [40, 40],
});

export const userIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
  iconSize: [32, 32],
});

export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    return data.display_name || "";
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return "";
  }
};

export const searchLocation = async (searchAddress: string): Promise<any> => {
  if (!searchAddress.trim()) return null;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchAddress)}&format=json&limit=1`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon, display_name } = data[0];
      return {
        location: [parseFloat(lat), parseFloat(lon)] as [number, number],
        displayName: display_name
      };
    }
    return null;
  } catch (error) {
    console.error("Error searching location:", error);
    return null;
  }
};