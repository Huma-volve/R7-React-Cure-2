import React from "react";
import AppointmentCard from "./AppointmentCard";

interface AppointmentsListProps {
    tab: string;
    date: string | Date | null;
}

interface AppointmentProps {
    id: number;
    date: string;
    status: "upcoming" | "completed" | "canceled";
    doctorName: string;
    specialization: string;
    doctorImage?: string;
    location: string;
}
const AppointmentsList: React.FC<AppointmentsListProps> = ({ tab, date }) => {
    const appointments: AppointmentProps[] = [
        {
            id: 1,
            date: "2025-07-21T11:00:00Z",
            status: "upcoming",
            doctorName: "Jennifer Miller",
            specialization: "Psychiatrist",
            location: "129, El-Nasr Street, Cairo, Egypt",
        },
        {
            id: 2,
            date: "2025-06-10T09:00:00Z",
            status: "completed",
            doctorName: "Ahmed Hassan",
            specialization: "Dermatologist",
            location: "12, Tahrir Square, Cairo",
        },
        {
            id: 3,
            date: "2025-08-03T15:00:00Z",
            status: "canceled",
            doctorName: "Sarah Nabil",
            specialization: "Dentist",
            location: "50, Dokki Street, Giza",
        },
        {
            id: 4,
            date: "2025-10-28T18:00:00Z",
            status: "canceled",
            doctorName: "Omar Fathy",
            specialization: "Cardiologist",
            location: "10, Abbas El Akkad, Nasr City",
        },
    ];

    // ✅ فلترة حسب التاب
    const filteredAppointments =
        tab.toLowerCase() === "all"
            ? appointments
            : appointments.filter(
                (a) => a.status.toLowerCase() === tab.toLowerCase()
            );

    const selectedDate = date ? new Date(date) : null;

    const finalAppointments = selectedDate
        ? filteredAppointments.filter(
            (a) =>
                new Date(a.date).toDateString() ===
                selectedDate.toDateString()
        )
        : filteredAppointments;

    return (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {finalAppointments.length > 0 ? (
                finalAppointments.map((a) => (
                    <AppointmentCard key={a.id} appointment={a} />
                ))
            ) : (
                <p className="text-gray-500 text-lg col-span-full text-center">
                    No appointments found.
                </p>
            )}
        </div>
    );
};

export default AppointmentsList;
