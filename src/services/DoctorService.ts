import Cookies from "js-cookie";

export interface Doctor {
  id: string;
  name: string;
  fullName: string;
  specialization: string;
  specialistTitle: any;
  address: any;
  price: any;
  distance: any;
  imgUrl?: string;
  img?: string;

  hospital?: string;
  rating?: number;

  latitude: number;
  longitude: number;
}
export const searchDoctors = async (location: [number, number]): Promise<Doctor[]> => {
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

    return doctorsList;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};
