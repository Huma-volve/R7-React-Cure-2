import React, { useRef, useEffect, forwardRef } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm, Controller } from "react-hook-form";
import { BsHeartPulse } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { AppDispatch } from "@/store/Store";
import { login } from "@/services/auth/Auth";
import { Spinner } from "@/components/ui/spinner";

interface LoginForm {
    phoneNumber: string;
}

const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    (props, ref) => (
        <input
            {...props}
            ref={ref}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-[#F5F6F7] px-3 py-2 text-sm 
      ring-offset-background placeholder:text-gray-400 focus-visible:outline-none 
      focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        />
    )
);

const LogIn: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = React.useState(false);
    const phoneRef = useRef<any>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginForm>({
        defaultValues: { phoneNumber: "" },
    });

    useEffect(() => {
        phoneRef.current?.focus();
    }, []);

    const onSubmit = async (data: LoginForm) => {
        const phoneNumber = parsePhoneNumberFromString(data.phoneNumber || "");

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
            setLoading(true);
            const res = await dispatch(login(formData));
            console.log("✅ Login Success:", res);
            sessionStorage.setItem("phone", phoneNumber.number);
            navigate("/verify-otp", {
                state: { phoneNumber: phoneNumber.number, type: "login" },
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="md:p-8! p-6! px-8! md:px-12! md:bg-[url('/image/background.jpg')] h-screen flex flex-col w-full md:w-auto items-start md:bg-no-repeat md:bg-right">
            <div>
                <BsHeartPulse className="text-(--color-primary) text-3xl" />
            </div>

            <div className="h-full w-full flex items-center text-center py-6! md:px-44!">
                <div className="md:w-[420px] w-full p-4!">
                    <div className="flex flex-col items-center gap-3">
                        <img
                            src="/image/undraw_welcome.jpg"
                            alt="sign in"
                            loading="lazy"
                            className="block md:hidden"
                        />
                        <h2 className="hidden md:block text-3xl font-serif font-medium mb-2!">
                            Sign in
                        </h2>
                        <p className="flex gap-1 font-serif text-[1.2rem] text-start w-full md:w-auto text-black md:text-[#6D7379] mb-4!">
                            <span className="md:block hidden">Please </span> Enter your phone number
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4! flex flex-col gap-4">
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
                                        placeholder="Enter your phone number"
                                        ref={phoneRef}
                                        inputComponent={CustomInput}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.phoneNumber.message as string}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-[#145DB8] hover:bg-[#145eb87b] text-white py-2! rounded-md transition"
                        >
                            {loading ? <Spinner /> : "Sign in"}
                        </button>
                    </form>

                    <div className="my-4! flex items-center">
                        <hr className="flex-1 border-gray-300" />
                        <span className="mx-2! text-gray-500 text-sm">or</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    <button
                        type="button"
                        className="border border-gray-300 py-2! w-full rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                    >
                        <img src="/icon/flat-color-icons_google.svg" alt="Google" loading="lazy" />
                        Sign in with Google
                    </button>

                    <nav className="flex items-center justify-center gap-2 mt-2">
                        <p className="text-[#99A2AB] text-sm">Don't have an account</p>
                        <Link
                            to="/signup"
                            className="text-[#145DB8] hover:underline hover:text-[#173d6c] font-bold text-sm"
                        >
                            Sign up
                        </Link>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default LogIn;
