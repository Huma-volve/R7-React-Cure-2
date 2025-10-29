import React from 'react'
import { BsHeartPulse } from 'react-icons/bs'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useForm } from 'react-hook-form';


interface FormValues {
    otp: string;
}
const Verify = () => {
    const [counter, setCounter] = React.useState<number>(60);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = (data: any) => {
        console.log(data);
        if (data === null) {
            window.location.href = "/";
        }
    };

    const handleResend = () => {
        setCounter(60);
    };

    React.useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [counter]);
    return (
        <section
            className="w-full !p-8 !px-12 h-screen flex flex-col items-start bg-no-repeat bg-right"
            style={{ backgroundImage: "url('/image/background.jpg')" }}
        >
            <div>
                <BsHeartPulse className="text-(--color-primary) text-3xl" />
            </div>
            <div className="h-full flex items-center text-center !py-6 !px-44">
                <div className="w-[420px] !p-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold !mb-2">Code Verification</h2>
                        <p className="font-light text-[1.2rem] text-[#404448] mb-4">
                            Code has been sent to your phone number
                        </p>
                        <p className='text-2xl text-[#1490E3]'>Check your phone number</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-col gap-4">
                        <InputOTP maxLength={4}>
                            <InputOTPGroup className='flex gap-4'>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            {
                                errors.otp && (
                                    <p className="text-destructive text-sm mt-2">
                                        {errors.otp.message}
                                    </p>
                                )

                            }
                        </InputOTP>

                        <div className="flex flex-col gap-2">
                            <p>
                                Resend code in{" "}
                                <span className='text-[#1490E3] font-semibold'>{counter}</span> s
                            </p>
                            {counter === 0 && (
                                <button
                                    type="button"
                                    className="text-[#1490E3] font-semibold"
                                    onClick={handleResend}
                                >
                                    Resend
                                </button>
                            )}
                        </div>

                        <button
                            type="submit"
                            className='bg-[#145DB8] w-full text-white !py-4 !px-4 rounded-lg'
                        >
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Verify
