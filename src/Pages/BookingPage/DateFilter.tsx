import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/material";
interface DateFilterProps {
    selectedDate: string | null;
    onDateChange: (date: string | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ selectedDate, onDateChange }) => {
    const [showCalendar, setShowCalendar] = React.useState(false);
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

    const toggleCalendar = () => setShowCalendar(!showCalendar);
    console.log("🔍 Selected Date:", selectedDate, onDateChange);

    return (
        <div className="relative w-[396px]">
            {/* البوكس */}
            <div
                className="w-full h-[48px] rounded-[12px] border border-[#B2B7BE] px-[16px] py-[8px] flex items-center justify-between cursor-pointer"
                onClick={toggleCalendar}
            >
                <div className="flex items-center gap-2">
                    {/* أيقونة التقويم */}
                    <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="block"
                        >
                            <path
                                d="M7.8335 9.91667H12.0002M5.3335 9.91667H5.34098M9.50016 13.25H5.3335M12.0002 13.25H11.9927"
                                stroke="#99A2AB"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M13.667 0.75V2.41667M3.66699 0.75V2.41667"
                                stroke="#99A2AB"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M0.75 9.28604C0.75 5.65495 0.75 3.8394 1.79343 2.71137C2.83686 1.58333 4.51624 1.58333 7.875 1.58333H9.45833C12.8171 1.58333 14.4965 1.58333 15.5399 2.71137C16.5833 3.8394 16.5833 5.65495 16.5833 9.28604V9.71397C16.5833 13.3451 16.5833 15.1606 15.5399 16.2886C14.4965 17.4167 12.8171 17.4167 9.45833 17.4167H7.875C4.51624 17.4167 2.83686 17.4167 1.79343 16.2886C0.75 15.1606 0.75 13.3451 0.75 9.71397V9.28604Z"
                                stroke="#99A2AB"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1.16699 5.75H16.167"
                                stroke="#99A2AB"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className="text-[14px] font-normal text-[#05162C] leading-none">
                        {value ? value.format("dddd, MMMM D") : "Select Date"}
                    </div>
                </div>

                {/* السهم */}
                <div className="w-[24px] h-[24px] py-[8px]">
                    <svg
                        width="15.5"
                        height="7.5"
                        viewBox="0 0 16 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.180571 0.26192C0.450138 -0.0525743 0.923613 -0.0889955 1.23811 0.180571L7.75001 5.76221L14.2619 0.180572C14.5764 -0.0889949 15.0499 -0.0525737 15.3195 0.261921C15.589 0.576415 15.5526 1.04989 15.2381 1.31946L8.23811 7.31946C7.95724 7.5602 7.54279 7.5602 7.26192 7.31946L0.26192 1.31946C-0.0525743 1.04989 -0.0889955 0.576414 0.180571 0.26192Z"
                            fill="#404448"
                        />
                    </svg>
                </div>
            </div>

            {/* التقويم */}
            {showCalendar && (
                <Box
                    className="absolute top-[56px] left-0 z-50 bg-white border border-[#E0E0E0] rounded-[24px] shadow-lg p-[16px]"
                    sx={{ width: 396, height: 350 }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                                setShowCalendar(false);
                            }}
                            sx={{
                                "& .MuiPickersDay-root": {
                                    fontSize: "14px",
                                },
                                "& .MuiPickersCalendarHeader-root": {
                                    marginBottom: "8px",
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            )}
        </div>
    );
};

export default DateFilter;
