import React from "react";
import { Container } from "../ui/Container";

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
export const PaymentMethodsSkeleton: React.FC = () => {
    return (
        <Container>
            <section className="md:py-8! py-6! px-8! md:px-12! w-full h-screen">
                <h1 className="noto-serif text-2xl">Payment Method</h1>
                <div className="flex flex-col items-center w-full gap-4 mt-4 animate-pulse">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between w-full bg-[#F5F6F7] rounded-md p-4"
                        >
                            <div className="flex items-center gap-2 w-full">
                                <div className="w-10 h-6 bg-gray-300 rounded"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            </div>
                            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                        </div>
                    ))}
                    <div className="w-full flex justify-center mt-4">
                        <div className="h-10 bg-gray-300 rounded-md w-full md:w-1/3"></div>
                    </div>
                </div>
            </section>
        </Container>
    );
}

