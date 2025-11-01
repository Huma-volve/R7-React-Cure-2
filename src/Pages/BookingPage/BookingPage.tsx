import { useState } from "react";
import TabsSection from "./TabsSection";
import DateFilter from "./DateFilter";
import AppointmentsList from "./AppointmentsList";

const BookingPage = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="w-full min-h-screen  p-8  gap-6">
      <div className="flex items-center justify-between">
        <TabsSection selectedTab={selectedTab} onChangeTab={setSelectedTab} />
        <DateFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>
     
      <AppointmentsList tab={selectedTab} date={selectedDate} />
    </div>
  );
};

export default BookingPage;
