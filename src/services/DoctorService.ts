import Cookies from "js-cookie";

export interface Doctor {
  id: string;
  name: string;
  fullName?: string;
  specialization: string;

  // Optional fields based on backend:
  img?: string;
  imgUrl?: string;
  rating?: number;
  hospital?: string;
  address?: string;
  price?: number;
  experience?: number;
  distance?: number;

  latitude: number;
  longitude: number;
}

export const searchDoctors = async (
  location: [number, number]
): Promise<Doctor[]> => {
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

    const doctorsList = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
      ? data.data
      : [];

    const normalizedDoctors: Doctor[] = doctorsList.map((doc: any) => ({
      id: doc.id?.toString() ?? "",
      name: doc.name || doc.fullName || "Unknown",
      fullName: doc.fullName,
      specialization: doc.specialization || doc.specialistTitle || "",
      img: doc.img,
      imgUrl: doc.imgUrl,
      rating: doc.rating,
      hospital: doc.hospital,
      address: doc.address,
      price: doc.price,
      experience: doc.experience,
      distance: doc.distance,
      latitude: Number(doc.latitude),
      longitude: Number(doc.longitude),
    }));

    return normalizedDoctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};
