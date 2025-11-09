import DoctorMapComponent from "@/components/Doctor/DoctorMapComponent";
import DoctorMapMobile from "@/components/Doctor/DoctorMapMobile";

export default function Map() {
  return (
    <div className="p-4">
      <div className="lg:block hidden ">
      <DoctorMapComponent />
      </div>

      <div className="lg:hidden block">
      <DoctorMapMobile />
      </div>
    </div>
  );
}
