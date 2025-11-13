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
    doctorId: number;
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmY1NGU1NC1lY2RmLTQ0N2UtOGM1ZC00YTdmMDQxYTYxNDUiLCJ1bmlxdWVfbmFtZSI6IjA3NzUwMDAiLCJmaXJzdE5hbWUiOiJBaG1lZCIsImxhc3ROYW1lIjoiQWhtZWQiLCJhZGRyZXNzIjoiIiwiaW1nVXJsIjoiIiwiYmlydGhEYXRlIjoiMDAwMS0wMS0wMSIsImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IiIsImlzTm90aWZpY2F0aW9uc0VuYWJsZWQiOiJUcnVlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIzNmY1NGU1NC1lY2RmLTQ0N2UtOGM1ZC00YTdmMDQxYTYxNDUiLCJleHAiOjE3NjMwNjUxMzEsImlzcyI6Imh0dHBzOi8vY3VyZS1kb2N0b3ItYm9va2luZy5ydW5hc3AubmV0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDAsaHR0cHM6Ly9sb2NhbGhvc3Q6NTUwMCxodHRwczovL2xvY2FsaG9zdDo0MjAwICxodHRwczovL2N1cmUtZG9jdG9yLWJvb2tpbmcucnVuYXNwLm5ldC8ifQ.4vR90H_CpQkKpRyGHLlADoEMVogiOl5NCfrDuYotMR4";

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
                        id: item.id, // ده الـ booking id
                        doctorId: item.doctorId, // ده اللي محتاجه الكارت
                        date: item.appointmentAt,
                        status: item.status.toLowerCase(),
                        doctorName: item.doctorName,
                        specialization: item.doctorSpeciality,
                        doctorImage: `https://cure-doctor-booking.runasp.net/${item.doctorImg}`,
                        location: "Cairo Medical Center",
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
// ززززززززززززززززززززز
