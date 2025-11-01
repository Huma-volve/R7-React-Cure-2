import React from "react";

const TabsSection = ({ selectedTab, onChangeTab }) => {
    const tabs = ["All", "Upcoming", "Completed", "Canceled"];

    return (
        <div className="w-[427px] h-[95px] mt-[153px] ml-[100px] flex flex-col gap-[24px]">
            <h2 className="font-[Georgia] text-[24px] text-[#05162C]">
                Your appointments
            </h2>

            <div className="flex gap-[8px] items-center">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onChangeTab(tab)}
                        className={`px-[16px] py-[10px] rounded-[8px] font-[Montserrat] font-medium transition-all cursor-pointer 
              ${selectedTab === tab
                                ? "bg-[#145DB8] text-white"
                                : "bg-transparent text-[#6D7379]"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabsSection;
