import React from 'react'
import { BsHeartPulse } from 'react-icons/bs'
import { useForm, } from "react-hook-form";

const Additional: React.FC = () => {
    const { register } = useForm();
    return (
        <section className="md:!p-8 !p-6 !px-8 md:!px-12 md:bg-[url('/image/background.jpg')] h-screen flex flex-col w-full md:w-auto items-start md:bg-no-repeat md:bg-right">
            <div>
                <BsHeartPulse className="text-(--color-primary) text-3xl" />
            </div>
            <div className="h-full w-full  flex items-center text-center !py-6 md:!px-44">
                <div className="md:w-[420px] w-full !p-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-6 md:gap-2">
                        <h2 className="text-2xl font-serif !mb-2">Additional Information</h2>
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
                        <button
                            type="submit"
                            className="bg-[#145DB8] hover:bg-blue-700 text-white !py-2 rounded-md transition"
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Additional
