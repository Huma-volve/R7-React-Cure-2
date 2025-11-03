import React from "react";

interface AppointmentProps {
    appointment: {
        id: number;
        date: string;
        status: "upcoming" | "completed" | "canceled";
        doctorName: string;
        specialization: string;
        doctorImage?: string;
        location: string;
    };
}

const AppointmentCard: React.FC<AppointmentProps> = ({ appointment }) => {
    const { date, status, doctorName, specialization, doctorImage, location } =
        appointment;

    // ✅ نحدد اللون والنص حسب الحالة
    const statusStyles: Record<string, { text: string; color: string }> = {
        upcoming: { text: "Upcoming", color: "#145DB8" },
        completed: { text: "Completed", color: "#00A86B" },
        canceled: { text: "Canceled", color: "#D32F2F" },
    };

    const { text, color } = statusStyles[status];

    // ✅ الأزرار حسب الحالة
    const renderButtons = () => {
        switch (status) {
            case "upcoming":
                return (
                    <>
                        <button className="flex-1 border border-[#99A2AB] text-[#99A2AB] rounded-[10px] py-2 text-[14px] font-normal">
                            Cancel
                        </button>
                        <button className="flex-1 bg-[#145DB8] text-white rounded-[10px] py-2 text-[14px] font-normal">
                            Reschedule
                        </button>
                    </>
                );

            case "completed":
                return (
                    <>
                        <button className="flex-1 border border-[#145DB8] text-[#145DB8] rounded-[10px] py-2 text-[14px] font-normal">
                            Book Again
                        </button>
                        <button className="flex-1 bg-[#145DB8] text-white rounded-[10px] py-2 text-[14px] font-normal">
                            Feedback
                        </button>
                    </>
                );

            case "canceled":
                return (
                    <>
                        <button className="flex-1 border border-[#145DB8] text-[#145DB8] rounded-[10px] py-2 text-[14px] font-normal">
                            Book Again
                        </button>
                        <button className="flex-1 bg-[#145DB8] text-white rounded-[10px] py-2 text-[14px] font-normal">
                            Support
                        </button>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-sm border border-[#BBC1C7] rounded-[20px] flex flex-col gap-3 p-4">
            {/* التاريخ والحالة */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.33301 8.66667H10.6663M5.33301 8.66667H5.339M8.66634 11.3333H5.33301M10.6663 11.3333H10.6604"
                            stroke="#05162C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 1.33334V2.66667M4 1.33334V2.66667"
                            stroke="#05162C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.6665 8.16216C1.6665 5.25729 1.6665 3.80486 2.50125 2.90243C3.336 2 4.6795 2 7.3665 2H8.63317C11.3202 2 12.6637 2 13.4984 2.90243C14.3332 3.80486 14.3332 5.25729 14.3332 8.16216V8.5045C14.3332 11.4094 14.3332 12.8618 13.4984 13.7642C12.6637 14.6667 11.3202 14.6667 8.63317 14.6667H7.3665C4.6795 14.6667 3.336 14.6667 2.50125 13.7642C1.6665 12.8618 1.6665 11.4094 1.6665 8.5045V8.16216Z"
                            stroke="#05162C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M2 5.33333H14"
                            stroke="#05162C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="text-[12px] text-[#05162C]">
                        {new Date(date).toLocaleString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                        })}
                    </span>
                </div>

                <span className="text-[14px] font-medium" style={{ color }}>
                    {text}
                </span>
            </div>

            <div className="border-t border-[#BBC1C7]" />

            {/* بيانات الطبيب */}
            <div className="flex items-center gap-3">
                <div className="w-[45px] h-[45px] rounded-full bg-[#D9D9D9] overflow-hidden">
                    {doctorImage && (
                        <img
                            src={doctorImage}
                            alt={doctorName}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-[16px] text-[#33384B]">{doctorName}</span>
                    <span className="text-[14px] text-[#6D7379]">{specialization}</span>
                </div>
            </div>

            {/* العنوان */}
            <div className="flex items-center gap-2">
                <svg
                    width="12"
                    height="17"
                    viewBox="0 0 12 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.85 11.2375C9.54595 11.0847 9.17553 11.2032 9.01667 11.5042C8.86986 11.8107 8.99123 12.1785 9.29167 12.3375C10.025 12.7125 10.4417 13.1708 10.4417 13.6125C10.4417 14.5542 8.475 15.6042 5.84167 15.6042C3.20833 15.6042 1.23333 14.5625 1.23333 13.6458C1.23333 13.2125 1.65 12.7458 2.38333 12.3708C2.60325 12.2826 2.7544 12.0777 2.77366 11.8415C2.79293 11.6054 2.677 11.3786 2.47428 11.256C2.27156 11.1333 2.01692 11.1358 1.81667 11.2625C0.804915 11.6438 0.0995649 12.5692 0 13.6458C0 15.4958 2.5 16.8875 5.83333 16.8875C9.16667 16.8875 11.6667 15.4958 11.6667 13.6458C11.5763 12.5599 10.8694 11.6227 9.85 11.2375Z"
                        fill="#99A2AB"
                    />
                </svg>
                <span className="text-[14px] text-[#6D7379]">{location}</span>
            </div>

            {/* الأزرار */}
            <div className="flex items-center gap-3 mt-2">{renderButtons()}</div>
        </div>
    );
};

export default AppointmentCard;
