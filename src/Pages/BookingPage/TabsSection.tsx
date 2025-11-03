import React from "react";

const TabsSection = ({ selectedTab, onChangeTab }) => {
    const tabs = ["All", "Upcoming", "Completed", "Canceled"];

    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="font-[Georgia] text-2xl text-[#05162C]">
                Your appointments
            </h2>

            <div className="flex gap-2 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onChangeTab(tab)}
                        className={`px-4 py-2 rounded-lg font-[Montserrat] font-medium transition-all cursor-pointer
              ${selectedTab === tab
                                ? "bg-[#145DB8] text-white"
                                : "bg-transparent text-[#6D7379] border border-[#B2B7BE]"
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
