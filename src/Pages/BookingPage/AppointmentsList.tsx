import React, { useEffect, useState } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";

interface Appointment {
    id: number;
    date: string;
    status: "upcoming" | "completed" | "canceled";
    doctorName: string;
    specialization: string;
    doctorImage?: string;
    location: string;
}

interface AppointmentsListProps {
    tab: string;
    date: Date | null;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ tab, date }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMjZiMWVhMC0xZDE0LTQwNDQtYTNiMS0yYTlkMDU3YzAwNzYiLCJ1bmlxdWVfbmFtZSI6IisyMDEwOTMxMzA0ODg4IiwiZmlyc3ROYW1lIjoiQWhtZWQiLCJsYXN0TmFtZSI6Ik91ZiIsImFkZHJlc3MiOiIiLCJpbWdVcmwiOiIiLCJiaXJ0aERhdGUiOiIwMDAxLTAxLTAxIiwiZ2VuZGVyIjoiTWFsZSIsImxvY2F0aW9uIjoiIiwiaXNOb3RpZmljYXRpb25zRW5hYmxlZCI6IlRydWUiLCJleHAiOjE3NjI2MTg5NzUsImlzcyI6Imh0dHBzOi8vY3VyZS1kb2N0b3ItYm9va2luZy5ydW5hc3AubmV0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDAsaHR0cHM6Ly9sb2NhbGhvc3Q6NTUwMCxodHRwczovL2xvY2FsaG9zdDo0MjAwICxodHRwczovL2N1cmUtZG9jdG9yLWJvb2tpbmcucnVuYXNwLm5ldC8ifQ.jlcMAdUwmaoX_h6-DX61ViWc-ttmlhOw6_ukr0_aML0"; // ضع التوكن هنا

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://cure-doctor-booking.runasp.net/api/Customer/Booking/PatientBookings",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "*/*",
                        },
                    }
                );

                if (response.data?.data) {
                    setAppointments(response.data.data);
                } else {
                    setAppointments([]);
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError("No bookings found for this patient.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // فلترة حسب التاب
    const filteredAppointments =
        tab === "All"
            ? appointments
            : appointments.filter(
                (a) => a.status?.toLowerCase() === tab.toLowerCase()
            );

    // فلترة حسب التاريخ
    const finalAppointments = date
        ? filteredAppointments.filter(
            (a) =>
                new Date(a.date).toDateString() === date.toDateString()
        )
        : filteredAppointments;

    if (loading)
        return <p className="text-center text-gray-500">Loading appointments...</p>;
    if (error)
        return <p className="text-center text-red-500">{error}</p>;

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
