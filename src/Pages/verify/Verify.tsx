import React from "react";
import { BsHeartPulse } from "react-icons/bs";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm, Controller } from "react-hook-form";
import { NavLink } from "react-router";

interface FormValues {
    otp: string;
}

const Verify = () => {
    const [counter, setCounter] = React.useState<number>(60);
    const [serverOtp] = React.useState<string>("1234");
    const [otpError, setOtpError] = React.useState<boolean>(false);

    const { handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: { otp: "" },
    });

    const onSubmit = (data: FormValues) => {
        if (data.otp !== serverOtp) {
            setOtpError(true);
        } else {
            setOtpError(false);
            alert("OTP verified successfully!");
            window.location.href = "/";
        }
    };

    const handleResend = () => {
        setCounter(60);
        setOtpError(false);
        reset({ otp: "" });
    };

    React.useEffect(() => {
        if (otpError && counter > 0) {
            const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [counter, otpError]);

    return (
        <section
            className="w-full !p-8 !px-12 h-screen flex flex-col items-start md:bg-[url('/image/background.jpg')] md:bg-no-repeat md:bg-right"
        >
            <div>
                <BsHeartPulse className="text-(--color-primary) text-3xl" />
            </div>

            <div className="h-full w-full  flex items-center text-center !py-6 md:!px-44">
                <div className="md:w-[420px] w-full !p-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold !mb-2">Code Verification</h2>
                        <p className="font-light text-[1.2rem] text-[#404448] mb-4">
                            Code has been sent to your phone number
                        </p>
                        <p className="text-2xl text-[#1490E3]">Check your phone number</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex items-center flex-col gap-4"
                    >
                        <Controller
                            name="otp"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputOTP
                                    maxLength={4}
                                    value={field.value}
                                    onChange={(val) => field.onChange(val)}
                                >
                                    <InputOTPGroup className="flex gap-4">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                </InputOTP>
                            )}
                        />

                        {otpError && (
                            <>
                                <p className="text-red-500 text-sm font-medium">
                                    Wrong Code
                                </p>

                                <div className="!my-4 flex items-center">
                                    {counter > 0 ? (
                                        <p className="text-gray-500 text-sm">
                                            Resend code in{" "}
                                            <span className="text-[#1490E3] font-semibold">
                                                {counter}
                                            </span>{" "}
                                            s
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            className="text-[#1490E3] font-semibold"
                                            onClick={handleResend}
                                        >
                                            Resend
                                        </button>
                                    )}
                                    <span className="!mx-2 text-gray-500 text-sm">or</span>
                                    <NavLink
                                        to="/login"
                                        className="text-[#1490E3] font-semibold"
                                    >
                                        Enter another phone number
                                    </NavLink>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className="bg-[#145DB8] w-full text-white !py-4 !px-4 rounded-lg"
                        >
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Verify;
