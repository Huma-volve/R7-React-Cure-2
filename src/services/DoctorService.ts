import Cookies from "js-cookie";

export interface Doctor {
  hospital: string;
  name: string;
  img: string;
  id: string;
  fullName: string;
  specialistTitle: string;
  specialization: string;
  imgUrl?: string;
  rating?: number;
  price?: number;
  address?: string;
  latitude: number;
  longitude: number;
  about?: string;
  distance?: number;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @returns Distance in kilometers
 */
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
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

/**
 * Geocode address to get coordinates
 */
const geocodeAddress = async (
  address: string
): Promise<[number, number] | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
      )}&format=json&limit=1`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
};

/**
 * Search for doctors near a specific location
 * Filters doctors within 50km radius
 */
export const searchDoctors = async (
  location: [number, number],
  radiusKm: number = 50
): Promise<Doctor[]> => {
  try {
    const [lat, lng] = location;
    const token = Cookies.get("accessToken");

    console.log(`🔍 Searching for doctors at: [${lat}, ${lng}]`);

    const response = await fetch(
      `https://cure-doctor-booking.runasp.net/api/Customer/SearchData/SearchByLocation?latitude=${lat}&longitude=${lng}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const doctorsList = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
      ? data.data
      : [];

    console.log("📍 All Doctors from API:", doctorsList.length);

    // Add coordinates to doctors who don't have them
    const doctorsWithCoords = await Promise.all(
      doctorsList.map(async (doc: any) => {
        let docLat = doc.latitude || doc.Latitude;
        let docLng = doc.longitude || doc.Longitude;

        // If no coordinates, try to geocode the address
        if (!docLat || !docLng) {
          const address = doc.address || doc.Address;
          if (address) {
            console.log(`🔍 Geocoding address for ${doc.fullName}: ${address}`);
            const coords = await geocodeAddress(address);
            if (coords) {
              docLat = coords[0];
              docLng = coords[1];
              console.log(`✅ Coordinates found: [${docLat}, ${docLng}]`);
            }
          }
        }

        return {
          id: doc.id || doc.Id,
          fullName: doc.fullName || doc.FullName,
          specialistTitle:
            doc.specialistTitle ||
            doc.SpecialistTitle ||
            doc.Specialisttitle,
          specialization: doc.specialization || doc.Specialization || "",
          imgUrl: doc.imageUrl || doc.imgUrl || doc.ImageUrl,
          rating: doc.rating || doc.Rating,
          price: doc.price || doc.Price,
          address: doc.address || doc.Address,
          latitude: docLat,
          longitude: docLng,
          about: doc.about || doc.About,
          distance: 0, // Will be calculated next
        };
      })
    );

    // Filter doctors within radius and calculate distances
    const filteredDoctors = doctorsWithCoords
      .filter((doc: Doctor) => {
        if (!doc.latitude || !doc.longitude) {
          console.log(`⚠️ Doctor ${doc.fullName} has no coordinates`);
          return false;
        }

        const distance = calculateDistance(
          lat,
          lng,
          doc.latitude,
          doc.longitude
        );
        doc.distance = distance;

        console.log(
          `📏 Doctor: ${doc.fullName}, Distance: ${distance.toFixed(2)}km`
        );

        return distance <= radiusKm;
      })
      .sort((a, b) => (a.distance || 0) - (b.distance || 0)); // Sort by distance

    console.log(
      `✅ Filtered Doctors (within ${radiusKm}km):`,
      filteredDoctors.length
    );

    return filteredDoctors;
  } catch (error) {
    console.error("❌ Error fetching doctors:", error);
    return [];
  }
};
