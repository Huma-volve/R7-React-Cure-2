import { getProfile, updateProfile } from '@/api/profile/profile';
import type { AppDispatch, RootState } from '@/store/Store';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface FormData {
    FullName: string;  // غير إلى FullName ليطابق register
    Email: string;
    PhoneNumber: string;
    Address: string;
    // birthDate غير مطلوب هنا لأنه يتم بناؤه يدويًا
}

const ProfileForm: React.FC = () => {
    // أضف formState: { errors } واستخدم FormData
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [day, setDay] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [year, setYear] = React.useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { data, loading, apiError } = useSelector((state: RootState) => state.profile) as any;

    React.useEffect(() => {
        if (data?.birthDate) {
            const date = new Date(data.birthDate);
            setDay(date.getDate().toString().padStart(2, "0"));
            setMonth((date.getMonth() + 1).toString().padStart(2, "0"));
            setYear(date.getFullYear().toString());
        }
    }, [data]);

    React.useEffect(() => {
        dispatch(getProfile())
            .unwrap()
            .catch((error) => {
                if (error?.status === 404) {
                    console.error("Profile not found, redirecting to login...");
                    navigate('/login');
                }
            });
    }, [dispatch, navigate]);

    const onSubmit = async (formData: FormData) => {  // غير المعامل إلى formData للوضوح
        // استخدم data من Redux لـ birthDate الأصلي
        const birthDate = year && month && day
            ? `${year}-${month}-${day}T00:00:00`
            : data?.birthDate || null;

        const payload = {
            FullName: formData.FullName,  // استخدم formData.FullName
            Email: formData.Email,
            PhoneNumber: formData.PhoneNumber,
            Address: formData.Address,
            BirthDate: birthDate,
        };

        try {
            await dispatch(updateProfile(payload)).unwrap();
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            if (error?.status === 404) {
                console.error("Update failed: Profile not found");
                navigate('/login');
            } else {
                console.error("Update failed:", error);
                toast.error("Update failed. Please try again.");
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (apiError) {
        if (apiError.status === 404) {
            return <p>Profile not found. Please log in again.</p>;
        }
        return <p>Error: {apiError.message || apiError}</p>;
    }

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
                            {...register("FullName", {
                                required: "Full Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Full Name must be at least 3 characters long",
                                },
                            })}
                            defaultValue={data?.fullName}
                        />
                        {/* أعد إضافة عرض الأخطاء */}
                        {errors?.FullName && <span className="text-red-500">{errors.FullName.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-[40%]">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            className="border border-gray-300 rounded-md p-2! w-full"
                            placeholder={data?.phoneNumber || "Enter phone number"}
                            {...register("PhoneNumber", {
                                required: "Phone number is required",
                                minLength: {
                                    value: 10,
                                    message: "Phone number must be at least 10 characters long",
                                },
                            })}
                            defaultValue={data?.phoneNumber}
                        />
                        {errors?.PhoneNumber && <span className="text-red-500">{errors.PhoneNumber.message}</span>}
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
                            {...register("Email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                }
                            })}
                            defaultValue={data?.email}
                        />
                        {errors?.Email && <span className="text-red-500">{errors.Email.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-[40%]">
                        <label>Your Birth Date</label>
                        <div className="flex gap-3 items-center">
                            <select
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="border bg-[#F5F6F7] rounded-md px-3! py-2! w-28 outline-none">
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
                        {...register("Address", {
                            required: "Address is required",
                            pattern: {
                                value: /^[a-zA-Z0-9\s,.'-]+$/i,
                                message: "Invalid address format",
                            }
                        })}
                        defaultValue={data?.address}
                    />
                    {errors?.Address && <span className="text-red-500">{errors.Address.message}</span>}
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
