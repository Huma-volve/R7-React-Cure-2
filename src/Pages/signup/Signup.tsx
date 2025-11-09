import React, { useRef, useEffect, forwardRef } from "react";
import { BsHeartPulse } from "react-icons/bs";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { signup } from "@/services/auth/Auth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/Store";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Spinner } from "@/components/ui/spinner";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";


const Signup: React.FC = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        control,
    } = useForm();
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const FocusInput = useRef<HTMLInputElement>(null);

    // ✅ يعمل فوكس تلقائي أول ما الصفحة تفتح
    useEffect(() => {
        FocusInput.current?.focus();
    }, []);

    const onSubmit = async (data: any) => {
        const fullNumber = `+20${data.phoneNumber.replace(/^0+/, "")}`;
        const phoneNumber = parsePhoneNumberFromString(fullNumber);

        if (!phoneNumber || !phoneNumber.isValid()) {
            setError("phoneNumber", {
                type: "manual",
                message: "Invalid phone number",
            });
            return;
        }

        try {
            setLoading(true);
            const formData = {
                phoneNumber: phoneNumber.number,
                fullName: data.fullName,
                Email: data.Email,
            };
            const result = await dispatch(signup(formData)).unwrap();
            navigate("/verify-otp", {
                state: { phoneNumber: phoneNumber.number, type: "register" },
            });
        } catch (error: any) {
            console.error("❌ Register Failed:", error);
            if (error?.message) {
                setError("phoneNumber", {
                    type: "manual",
                    message: error.message,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="md:!p-8 !p-6 !px-8 md:!px-12 md:bg-[url('/image/background.jpg')] h-screen flex flex-col w-full md:w-auto items-start md:bg-no-repeat md:bg-right">
            <div>
                <BsHeartPulse className="text-(--color-primary) text-3xl" />
            </div>
            <div className="h-full w-full flex items-center text-center !py-6 md:!px-44">
                <div className="md:w-[420px] w-full !p-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-6 md:gap-2">
                        <h2 className="text-2xl font-serif !mb-2">Sign Up</h2>
                        <p className="font-normal text-start md:text-center font-serif md:font-sans md:text-[.8rem] md:text-[#6D7379] md:!mb-2">
                            Please provide all information required to create your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <nav className="flex flex-col items-start gap-2">
                            <label className="label">
                                <span className="label-text">Full name</span>
                            </label>
                            <input

                                type="text"
                                placeholder="Full name"
                                className="border-2 border-gray-300 rounded-md !p-2 w-full"
                                {...register("fullName", {
                                    required: "Full name is required",
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: "Only letters are allowed",
                                    }
                                })}
                                onChange={(e) => {
                                    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                }}
                                ref={(el) => {
                                    register("fullName").ref(el)
                                    FocusInput.current = el;
                                }}
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-sm">
                                    {(errors.fullName as any).message}
                                </p>
                            )}
                        </nav>

                        {/* ✅ Email */}
                        <nav className="flex flex-col items-start gap-2">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Email"
                                className="border-2 border-gray-300 rounded-md !p-2 w-full"
                                {...register("Email", { required: "Email is required" })}
                            />
                            {errors.Email && (
                                <p className="text-red-500 text-sm">
                                    {(errors.Email as any).message}
                                </p>
                            )}
                        </nav>

                        <nav className="flex flex-col gap-2">
                            <label className="text-start w-full">
                                <span className="label-text">Phone number</span>
                            </label>

                            <Controller
                                name="phoneNumber"
                                control={control}
                                rules={{
                                    required: "Phone number is required",
                                    validate: (value) =>
                                        isValidPhoneNumber(value || "") || "Invalid phone number",
                                }}
                                render={({ field }) => (
                                    <div>
                                        <PhoneInput
                                            {...field}
                                            international
                                            defaultCountry="EG"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-[#F5F6F7] px-3 py-2 text-sm 
      ring-offset-background placeholder:text-gray-400 focus-visible:outline-none 
      focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phoneNumber && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {(errors.phoneNumber as any).message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </nav>

                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-[#145DB8] hover:bg-blue-700 text-white !py-2 rounded-md transition"
                        >
                            {loading ? <Spinner /> : "Sign Up"}
                        </button>
                    </form>

                    <button
                        type="button"
                        className="border border-gray-300 !py-2 w-full rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                    >
                        <img
                            src="/icon/flat-color-icons_google.svg"
                            alt="Google"
                            loading="lazy"
                        />
                        Sign in with Google
                    </button>

                    <nav className="flex items-center justify-center gap-2">
                        <p className="text-[#99A2AB] text-sm">Already have an account!</p>
                        <Link to="/login" className="text-[#145DB8] hover:underline hover:text-[#173d6c] font-bold text-sm">
                            Sign in
                        </Link>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default Signup;
