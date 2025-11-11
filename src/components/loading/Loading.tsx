import React from "react";

const ProfileFormSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 md:w-[70%] w-full animate-pulse">
            <div className="h-6 w-48 bg-gray-300 rounded-md"></div>

            <div className="flex flex-col w-full gap-8 md:gap-16">
                {/* Row 1 */}
                <div className="flex md:flex-row flex-col justify-between w-full gap-6">
                    <div className="flex flex-col gap-2 w-full md:w-[40%]">
                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                        <div className="h-10 w-full bg-gray-200 rounded-md"></div>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-[40%]">
                        <div className="h-4 w-28 bg-gray-300 rounded"></div>
                        <div className="h-10 w-full bg-gray-200 rounded-md"></div>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex md:flex-row flex-col justify-between w-full gap-6">
                    <div className="flex flex-col gap-2 w-full md:w-[40%]">
                        <div className="h-4 w-20 bg-gray-300 rounded"></div>
                        <div className="h-10 w-full bg-gray-200 rounded-md"></div>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-[40%]">
                        <div className="h-4 w-28 bg-gray-300 rounded"></div>
                        <div className="flex gap-3 items-center">
                            <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
                            <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
                            <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="flex flex-col w-full gap-2">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                    <div className="h-10 w-full bg-gray-200 rounded-md"></div>
                </div>

                {/* Save button */}
                <div className="flex justify-end">
                    <div className="h-12 w-full md:w-[380px] bg-gray-300 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileFormSkeleton;
