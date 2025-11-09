import React, { useState } from "react";
import TabsSection from "./TabsSection";
import DateFilter from "./DateFilter";
import AppointmentsList from "./AppointmentsList";

const BookingPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="max-w-[1300px] mx-auto min-h-screen p-8 flex flex-col gap-10">
      {/* العنوان والتصفية */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <TabsSection selectedTab={selectedTab} onChangeTab={setSelectedTab} />
        <DateFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>

      {/* قائمة المواعيد */}
      <AppointmentsList tab={selectedTab} date={selectedDate} />
    </div>
  );
};

export default BookingPage;
