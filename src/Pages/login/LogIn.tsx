import React from "react";
import { useForm } from "react-hook-form";
import { BsHeartPulse } from "react-icons/bs";

const LogIn: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        if (data !== null) {
            window.location.href = "/verify-otp";
        }
    };

    return (
        <section
            className="w-full !p-8 !px-12 h-screen flex flex-col items-start bg-no-repeat bg-right"
            style={{ backgroundImage: "url('/image/background.jpg')" }}
        >
            <div>
                <BsHeartPulse className="text-(--color-primary) text-3xl" />
            </div>

            <div className="h-full flex items-center text-center !py-6 !px-44">
                <div className="w-[420px] !p-4">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl font-semibold !mb-2">Sign in</h2>
                        <p className="font-light text-[#6D7379] mb-4">
                            Please Enter your phone number
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="!mt-4 flex flex-col gap-4"
                    >
                        <nav className="flex items-center border border-gray-300 bg-[#F5F6F7] rounded-md focus:outline-none">
                            <div className="flex gap-2  !p-2">
                                <span >
                                    <img src="/icon/Flag.svg" alt="flag" loading="lazy" />
                                </span>
                                <span className="flex  items-center">
                                    <img src="/icon/weui_arrow-outlined.svg" alt="arrow-outlined" loading="lazy" />
                                </span>
                            </div>
                            <input
                                type="tel"
                                placeholder="Enter your Number"
                                {...register("phone", {
                                    required: "Phone number is required",

                                    pattern: {
                                        value: /^[0-9]{10,15}$/,
                                        message: "Enter a valid phone number",
                                    },
                                })}
                                className=" focus:outline-none !p-2 rounded w-full mt-1"
                            />
                        </nav>
                        {errors.phone && (
                            <p className="text-red-500 text-sm">
                                {errors.phone.message as string}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="bg-[#145DB8] hover:bg-blue-700 text-white !py-2 rounded-md transition"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="!my-4 flex items-center">
                        <hr className="flex-1 border-gray-300" />
                        <span className="!mx-2 text-gray-500 text-sm">or</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    <button
                        type="button"
                        className="border border-gray-300 !py-2 w-full rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                    >
                        <img
                            src="/public/icon/flat-color-icons_google.svg"
                            alt="Google"

                            loading="lazy"
                        />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LogIn;
