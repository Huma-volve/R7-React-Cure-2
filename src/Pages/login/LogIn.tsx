import React from 'react';
import { useForm } from 'react-hook-form';

const LogIn: React.FC = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <section className="w-full p-4 flex items-center justify-between">
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <h2>Sign in</h2>
                        <p className="font-light text-[#6D7379]">
                            Please Enter your phone number
                        </p>
                        <input
                            {...register('phone')}
                            type="text"
                            placeholder="Phone number"
                            className="border p-2 rounded mt-2"
                        />
                        <button type="submit" className="mt-3 bg-blue-500 text-white py-1 px-3 rounded">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full h-full bg-[url('/image/background.jpg')]"></div>
        </section>
    );
};

export default LogIn;
