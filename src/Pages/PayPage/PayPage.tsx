// import DoctorCardInfo from "@/components/Doctor/DoctorCardInfo/DoctorCardInfo"
// import { BackwardArrow } from "@/components/Doctor/icons"
import { BackwardArrow } from "@/components/Doctor/icons"
import PayPopup from "@/components/Doctor/PayPopup/PayPopup"

const PayPage = () => {
  return (
    <>
    <div className=" flex justify-center items-center relative mb-8">
      <BackwardArrow className="cursor-pointer absolute left-5" />
      <h1 className="text-gray-800 font-semibold text-lg">
        Book Appointment
      </h1>
    </div>
    <PayPopup />
    </>
  )
}

export default PayPage
