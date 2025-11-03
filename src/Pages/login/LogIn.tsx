import React from "react";
import { useForm } from "react-hook-form";
import { BsHeartPulse } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { AppDispatch } from "@/store/Store";
import { login } from "@/services/auth/Auth";
import { setToken } from "@/store/UserSlice";

interface LoginForm {
    phoneNumber: string;
}

const LogIn: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginForm>();

    const onSubmit = async (data: LoginForm) => {
        const fullNumber = `+20${data.phoneNumber.replace(/^0+/, "")}`;
        const phoneNumber = parsePhoneNumberFromString(fullNumber);

        if (!phoneNumber || !phoneNumber.isValid()) {
            setError("phoneNumber", {
                type: "manual",
                message: "Invalid phone number",
            });
            return;
        }
        const formData = {
            phoneNumber: phoneNumber.number,
        };

        try {
            const res = await dispatch(login(formData)).unwrap();
            console.log("✅ Login Success:", res);
            sessionStorage.setItem("phone", phoneNumber.number);

            navigate("/verify-otp", {
                state: { phoneNumber: phoneNumber.number, type: "login" },
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section
            className="md:!p-8 !p-6 !px-8 md:!px-12 md:bg-[url('/image/background.jpg')] h-screen flex flex-col w-full md:w-auto items-start md:bg-no-repeat md:bg-right"
        >
            <div>
                <BsHeartPulse className="text-(--color-primary) text-3xl" />
            </div>

            <div className="h-full w-full flex items-center text-center !py-6 md:!px-44">
                <div className="md:w-[420px] w-full !p-4">
                    <div className="flex flex-col items-center gap-3">
                        <img
                            src="/image/undraw_welcome.jpg"
                            alt="sign in"
                            loading="lazy"
                            className="block md:hidden"
                        />
                        <h2 className="hidden md:block text-3xl font-serif font-medium !mb-2">Sign in</h2>
                        <p className=" flex gap-1 font-serif text-[1.2rem] text-start w-full md:w-auto text-black md:text-[#6D7379] mb-4">
                            <span className="md:block hidden">Please </span> Enter your phone number
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
                                {...register("phoneNumber", {
                                    required: "Phone number is required",

                                    pattern: {
                                        value: /^[0-9]{10,15}$/,
                                        message: "Enter a valid phone number",
                                    },
                                })}
                                className=" focus:outline-none !p-2 rounded w-full mt-1"
                            />
                        </nav>
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-sm">
                                {errors.phoneNumber.message as string}
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
                    <nav className='flex items-center justify-center gap-2'>
                        <p className="text-[#99A2AB] text-sm">Don't have an account </p>
                        <Link to="/signup" className="text-[#145DB8] text-sm">sign up</Link>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default LogIn;
