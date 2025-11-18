import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Props {
  appointmentId: number;
  doctorId: number;
  onClose: () => void;
}

interface Slot {
  id: number;
  dateTime: string;
  startTime: string;
  endTime: string;
}

const ReschedulePopup: React.FC<Props> = ({ appointmentId, doctorId, onClose }) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const token = Cookies.get("accessToken");

  // Fetch doctor available slots
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(
          `https://cure-doctor-booking.runasp.net/api/Customer/Doctors/DoctorDetails/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data?.data?.availableSlots || [];
        setSlots(data);
      } catch (err) {
        console.error("Error fetching slots:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [doctorId]);

  const handleReschedule = async () => {
    if (!selectedSlot) return;

    try {
      const newDateTime = `${selectedSlot.dateTime.split("T")[0]}T${selectedSlot.startTime}`;

await axios.put(
  `https://cure-doctor-booking.runasp.net/api/Customer/Booking/RescheduleBooking/${appointmentId}`,
  `"${newDateTime}"`,  // <-- String literal وليس JSON object
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

      alert("Appointment rescheduled successfully!");
      onClose();
      window.location.reload(); // refresh list
    } catch (err) {
      console.error("Reschedule error:", err);
      alert("Failed to reschedule appointment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-[#145DB8]">Reschedule Appointment</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading available slots...</p>
        ) : slots.length === 0 ? (
          <p className="text-center text-gray-600">No available slots.</p>
        ) : (
          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
            {slots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-lg border transition ${
                  selectedSlot?.id === slot.id
                    ? "bg-[#145DB8] text-white border-[#145DB8]"
                    : "border-gray-300"
                }`}
              >
                {new Date(slot.dateTime).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                — {slot.startTime.slice(0, 5)}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-400 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleReschedule}
            disabled={!selectedSlot}
            className="flex-1 bg-[#145DB8] text-white py-2 rounded-lg disabled:bg-gray-400"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReschedulePopup;
