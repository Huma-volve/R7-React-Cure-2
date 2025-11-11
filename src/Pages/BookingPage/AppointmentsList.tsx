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

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NWUxZTY1NC02ZDA5LTRjZDUtYjM4YS01MWQ0ODE3NTFjNTUiLCJ1bmlxdWVfbmFtZSI6IisyMDEwOTMxMzA0ODgzIiwiZmlyc3ROYW1lIjoiQWhtZWQiLCJsYXN0TmFtZSI6Ik91ZiIsImFkZHJlc3MiOiIiLCJpbWdVcmwiOiIiLCJiaXJ0aERhdGUiOiIwMDAxLTAxLTAxIiwiZ2VuZGVyIjoiTWFsZSIsImxvY2F0aW9uIjoiIiwiaXNOb3RpZmljYXRpb25zRW5hYmxlZCI6IlRydWUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ1ZTFlNjU0LTZkMDktNGNkNS1iMzhhLTUxZDQ4MTc1MWM1NSIsImV4cCI6MTc2Mjk4MDA3MiwiaXNzIjoiaHR0cHM6Ly9jdXJlLWRvY3Rvci1ib29raW5nLnJ1bmFzcC5uZXQvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMCxodHRwczovL2xvY2FsaG9zdDo1NTAwLGh0dHBzOi8vbG9jYWxob3N0OjQyMDAgLGh0dHBzOi8vY3VyZS1kb2N0b3ItYm9va2luZy5ydW5hc3AubmV0LyJ9.69YU7bX-xK-lnSYY5qB396BxvM0H3ILOQ73hkT15WY0";

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

                const rawData = response.data?.data?.data;

                if (Array.isArray(rawData)) {
                    const mappedAppointments: Appointment[] = rawData.map((item: any) => ({
                        id: item.doctorId,
                        date: item.appointmentAt,
                        status: item.status.toLowerCase(), // "upcoming"
                        doctorName: item.doctorName,
                        specialization: item.doctorSpeciality,
                        doctorImage: `https://cure-doctor-booking.runasp.net/${item.doctorImg}`,
                        location: "Cairo Medical Center", // مؤقت لحد ما يضيفوه في الـ API
                    }));

                    setAppointments(mappedAppointments);
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
            (a) => new Date(a.date).toDateString() === date.toDateString()
        )
        : filteredAppointments;

    if (loading)
        return <p className="text-center text-gray-500">Loading appointments...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

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
