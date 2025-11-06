import React from "react";
import { BsHeartPulse } from "react-icons/bs";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP, verifyOTPRegister } from "@/services/auth/Auth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/Store";
import { setToken } from "@/store/UserSlice";
import { Spinner } from "@/components/ui/spinner";

interface FormValues {
    otpNumber: string;
}

const Verify = () => {
    const [counter, setCounter] = React.useState<number>(60);
    const [otpError, setOtpError] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const location = useLocation();
    const { phoneNumber, type } = location.state;
    const [loading, setLoading] = React.useState(false);
    const { handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>({
        defaultValues: { otpNumber: "" },
    });

    const phone = sessionStorage.getItem("phone");
    const onSubmit = async (data: FormValues) => {
        if (data.otpNumber.length < 4) return;
        setLoading(true);

        const payload = { phoneNumber, otpNumber: data.otpNumber };

        try {
            const res = type === "register"
                ? await dispatch(verifyOTPRegister(payload))
                : await dispatch(verifyOTP(payload));

            dispatch(setToken({
                accessToken: res.payload.data.accessToken,
                refreshToken: res.payload.data.refreshToken,
            }));

            navigate(type === "register" ? "/login" : "/");
        } catch (error) {
            setOtpError(true);
        } finally {
            setLoading(false);
        }
    };


    const handleResend = () => {
        setCounter(60);
        setOtpError(false);
        reset({ otpNumber: "" });
    };
    console.log(handleResend);
    React.useEffect(() => {
        if (otpError && counter > 0) {
            const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [counter, otpError]);

    return (
        <section
            className="w-full p-8! px-12! h-screen flex flex-col items-start md:bg-[url('/image/background.jpg')] md:bg-no-repeat md:bg-right"
        >
            <div>
                <BsHeartPulse className="text-(--color-primary) text-3xl" />
            </div>

            <div className="h-full w-full  flex items-center text-center py-6! md:px-44!">
                <div className="md:w-[420px] w-full p-4! flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold mb-2!">Code Verification</h2>
                        <p className="font-light text-[1.2rem] text-[#404448] mb-4!">
                            Code has been sent to <span className="font-semibold text-[#1490E3]">{phone}</span>
                        </p>
                        <p className="text-2xl text-[#1490E3]">Check your phone number</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex items-center flex-col gap-4"
                    >
                        <Controller
                            name="otpNumber"
                            control={control}
                            rules={{
                                required: "Code is required",
                                minLength: { value: 4, message: "Code must be 4 digits" },
                                maxLength: { value: 4, message: "Code must be 4 digits" },
                            }}
                            render={({ field }) => (
                                <InputOTP
                                    maxLength={4}
                                    value={field.value}
                                    onChange={(val) => field.onChange(val)}
                                >
                                    <InputOTPGroup className="flex gap-4 ">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                </InputOTP>
                            )}
                        />

                        {errors.otpNumber && (
                            <p className="text-red-500 text-sm">{errors.otpNumber.message}</p>
                        )}

                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-[#145DB8] w-full text-white !py-4 !px-4 rounded-lg"
                        >
                            {loading ? <Spinner color="white" /> : "Verify"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Verify;
