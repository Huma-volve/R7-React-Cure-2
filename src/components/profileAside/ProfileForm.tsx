import { getProfile, updateProfile } from '@/api/profile/profile';
import type { AppDispatch, RootState } from '@/store/Store';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';


const ProfileForm: React.FC = () => {
    const { register, handleSubmit } = useForm();
    const [day, setDay] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [year, setYear] = React.useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.profile) as any;

    React.useEffect(() => {
        if (data?.birthDate) {
            const date = new Date(data.birthDate);
            setDay(date.getDate().toString().padStart(2, "0"));
            setMonth((date.getMonth() + 1).toString().padStart(2, "0"));
            setYear(date.getFullYear().toString());
        }
    }, [data]);

    React.useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);


    const onSubmit = async () => {
        const birthDate = year && month && day
            ? `${year}-${month}-${day}T00:00:00`
            : data?.birthDate || null;

        console.log(birthDate)
        const payload = {
            fullName: data?.fullName || "",
            Email: data?.email || "",
            PhoneNumber: data?.phoneNumber || "",
            Address: data?.address || "",
            BirthDate: data?.birthDate
        };

        try {
            const response = await dispatch(updateProfile(payload)).unwrap();
            console.log("✅ Update Profile Success:", response);
        } catch (error) {
            console.error("❌ Update Profile Failed:", error);
        }
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className="flex flex-col gap-4 md:w-[70%] w-full">
            <h2 className="noto-serif">Personal information</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-8 md:gap-16">
                <div className="flex md:flex-row flex-col justify-between w-full">
                    <div className="flex flex-col gap-2 w-full md:w-[40%]">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            className="border border-gray-300 rounded-md p-2! w-full"
                            placeholder={data?.fullName || "John Doe"}
                            {...register("fullName")}
                            defaultValue={data?.fullName}
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-[40%]">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            className="border border-gray-300 rounded-md p-2! w-full"
                            placeholder={data?.phoneNumber || "Enter phone number"}
                            {...register("phoneNumber")}
                            defaultValue={data?.phoneNumber}
                        />
                    </div>
                </div>

                <div className="flex md:flex-row flex-col justify-between w-full">
                    <div className="flex flex-col gap-2 w-full md:w-[40%]">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="border border-gray-300 rounded-md p-2! w-full"
                            placeholder={data?.email || "Email@example.com"}
                            {...register("email")}
                            defaultValue={data?.email}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-[40%]">
                        <label>Your Birth Date</label>
                        <div className="flex gap-3 items-center">
                            <select value={day} onChange={(e) => setDay(e.target.value)} className="border bg-[#F5F6F7] rounded-md px-3! py-2! w-28 outline-none">
                                <option value="">Day</option>
                                {days.map((d) => (
                                    <option key={d} value={d}>{d.toString().padStart(2, "0")}</option>
                                ))}
                            </select>

                            <select value={month} onChange={(e) => setMonth(e.target.value)} className="border bg-[#F5F6F7] rounded-md px-3! py-2! w-28 outline-none">
                                <option value="">Month</option>
                                {months.map((m) => (
                                    <option key={m} value={m}>{m.toString().padStart(2, "0")}</option>
                                ))}
                            </select>

                            <select value={year} onChange={(e) => setYear(e.target.value)} className="border bg-[#F5F6F7] rounded-md px-3! py-2! w-28 outline-none">
                                <option value="">Year</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <label>Location</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2! w-full"
                        placeholder={data?.address || "129, El-Nasr Street, Cairo"}
                        {...register("address")}
                        defaultValue={data?.address}
                    />
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-[#145DB8] p-3! w-full md:w-[380px] text-white rounded-lg">
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
