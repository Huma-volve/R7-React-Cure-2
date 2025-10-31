import React from 'react'
import { BsHeartPulse } from 'react-icons/bs'
import { useForm, } from "react-hook-form";
import { Link } from 'react-router';

const Signup: React.FC = () => {
    const { register, formState: { errors }, } = useForm();
    return (
        <section className="md:!p-8 !p-6 !px-8 md:!px-12 md:bg-[url('/image/background.jpg')] h-screen flex flex-col w-full md:w-auto items-start md:bg-no-repeat md:bg-right">
            <div>
                <BsHeartPulse className="text-(--color-primary) text-3xl" />
            </div>
            <div className="h-full w-full  flex items-center text-center !py-6 md:!px-44">
                <div className="md:w-[420px] w-full !p-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-6 md:gap-2">
                        <h2 className="text-2xl font-serif !mb-2">Sign Up</h2>
                        <p className="font-normal text-start md:text-center font-serif md:font-sans md:text-[.8rem] md:text-[#6D7379] md:!mb-2">
                            Please provide all information required to create your account                        </p>
                    </div>
                    <form className="flex flex-col gap-4">
                        <nav className='flex flex-col items-start gap-2'>
                            <label className="label">
                                <span className="label-text">Full name</span>
                            </label>
                            <input type="text" placeholder="Full name" className=" border-2 border-gray-300 rounded-md !p-2 w-full" />
                        </nav>
                        <nav className='flex flex-col items-start gap-2'>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                {...register("email", { required: true })}
                                placeholder="Email" className="border-2 border-gray-300 rounded-md !p-2 w-full" />
                        </nav>
                        <nav className='flex flex-col  gap-2'>
                            <label className="text-start w-full">
                                <span className="label-text">Phone number</span>
                            </label>
                            <nav className="flex items-center border border-gray-300 bg-[#F5F6F7] rounded-md focus:outline-none">
                                <div className="flex gap-2 !p-2">
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
                            Sign up
                        </button>
                    </form>
                    <nav className='flex items-center justify-center gap-2'>
                        <p className="text-[#99A2AB] text-sm">Already have an account! </p>
                        <Link to="/login" className="text-[#145DB8] text-sm">sign in</Link>
                    </nav>
                </div>
            </div>
        </section>
    )
}

export default Signup
