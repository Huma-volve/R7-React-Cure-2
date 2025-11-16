import { CreditCard, CreditCardBack, CreditCardChip, CreditCardCvv, CreditCardExpiry, CreditCardFlipper, CreditCardFront, CreditCardMagStripe, CreditCardName, CreditCardNumber, CreditCardServiceProvider } from '@/components/ui/shadcn-io/credit-card'
import type { AppDispatch, RootState } from '@/store/Store'
import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { addMethods } from '@/services/paymentMethod/Methods'
import { useNavigate } from 'react-router'

interface methodForm {
    methodName: string,
    providerToken: string,
    last3: string,
    brand: string,
    expMonth: number,
    expYear: number
}
const MethodForm: React.FC = () => {
    const [cardNumber, setCardNumber] = React.useState("")
    const [cardHolder, setCardHolder] = React.useState("")
    const [expiryMonth, setExpiryMonth] = React.useState("")
    const [expiryYear, setExpiryYear] = React.useState("")
    const [cvv, setCvv] = React.useState("")
    const { register, handleSubmit } = useForm<methodForm>()
    const dispatch = useDispatch<AppDispatch>()

    const { data, loading, error } = useSelector((state: RootState) => state.methods)
    const navigate = useNavigate()

    const methodFromCookie = Cookies.get("methodName")
    const validMethods = ["Visa", "Mastercard", "Amex", "Discover"];
    const method = validMethods.includes(methodFromCookie || "")
        ? methodFromCookie
        : "Visa";
    console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const onSubmit = async (data: methodForm) => {
        try {
            const formData = {
                methodName: method!,
                providerToken: data.providerToken!,
                last3: cardNumber.slice(-3),
                brand: method!,
                expMonth: parseInt(expiryMonth.split("/")[0]),
                expYear: parseInt(expiryYear.split("/")[1]),

            };
            navigate('/methods')
            window.location.reload();
            const result = await dispatch(addMethods(formData)).unwrap();
            console.log("✅ Add Method Success:", result);
        } catch (error: any) {
            console.error("❌ Add Method Failed:", error);
        }

    };

    return (
        < section className="md:py-8! py-6! px-8! md:px-12! w-full flex flex-col items-center gap-8 h-full">
            <CreditCard>
                <CreditCardFlipper>
                    <CreditCardFront className="bg-gradient-to-r from-[#19D9C2] to-[#3B58E7]">
                        <CreditCardChip />
                        <div className="absolute bottom-1/2 translate-y-1/2 left-20 text-sm">
                            <CreditCardNumber>
                                {cardNumber || "•••• •••• •••• ••••"}
                            </CreditCardNumber>
                        </div>
                        <div className="absolute bottom-5 left-4">
                            <CreditCardName>
                                {cardHolder || "CARD HOLDER"}
                            </CreditCardName>
                        </div>
                        <div className="absolute bottom-12 right-6 text-right">
                            <p className="text-[10px] opacity-70">VALID THRU</p>
                            <CreditCardExpiry>
                                {expiryMonth}/{expiryYear}
                            </CreditCardExpiry>
                        </div>

                        <CreditCardServiceProvider type={method as any} />
                    </CreditCardFront>
                    <CreditCardBack className="bg-gradient-to-r from-gray-800 to-gray-700">
                        <CreditCardMagStripe />
                        <div className="absolute bottom-16 right-6 text-right">
                            <p className="text-[10px] opacity-70">CVV</p>
                            <CreditCardCvv>{cvv || "•••"}</CreditCardCvv>
                        </div>
                    </CreditCardBack>
                </CreditCardFlipper>
            </CreditCard>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm text-gray-900">
                <div>
                    <label className="block mb-1 text-sm text-black">Card Number</label>
                    <input
                        type="text"
                        {...register("providerToken", {
                            required: 'This field is required',
                            pattern: {
                                value: /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/,
                                message: 'Invalid card number format'
                            },
                            onChange: (e) => {
                                e.target.value = e.target.value
                                    .replace(/\D/g, "")
                                    .replace(/(.{4})/g, "$1 ")
                                    .trim()
                                    .slice(0, 19);
                                setCardNumber(e.target.value)
                            },

                        })}
                        className="w-full p-2 rounded-md outline-none border bg-[#f1f1f1] border-gray-300 text-black"
                        placeholder="4111 1111 1111 1111"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-black">Card Holder</label>
                    <input
                        type="text"
                        value={cardHolder}
                        {...register("methodName", {
                            required: 'This field is required',
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: 'Invalid card holder name'
                            },
                            onChange: (e) => { setCardHolder(e.target.value.toUpperCase()) }

                        })}
                        className="w-full p-2 bg-[#f1f1f1] rounded-md outline-none border border-gray-300 text-black"
                        placeholder="CARD HOLDER"

                    />
                </div>

                <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-start ">
                        <label className="block mb-1 text-sm text-black">Expiry Date</label>
                        <div className="flex gap-2  items-center ">
                            <select
                                value={expiryMonth}
                                {...register("expMonth", {
                                    required: "Month is required",
                                    validate: (val) =>
                                        Number(val) >= 1 && Number(val) <= 12 || "Month must be between 1 and 12",
                                    onChange: (e) => {
                                        setExpiryMonth(e.target.value)
                                    }
                                })
                                }
                                className="w-1/2 text-center p-2 bg-[#f1f1f1] rounded-md border border-gray-300 outline-none text-black"
                            >
                                <option value="">MM</option>
                                {Array.from({ length: 12 }, (_, i) => {
                                    const month = (i + 1).toString().padStart(2, "0");
                                    return (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    );
                                })}
                            </select>
                            <select
                                value={expiryYear}
                                {...register("expYear", {
                                    required: "Year is required",
                                    validate: (val) =>
                                        Number(val) >= 25 && Number(val) <= 35 || "Year must be between 25 and 35",
                                    onChange: (e) => { setExpiryYear(e.target.value) }

                                })}
                                className="w-1/2 text-center p-2 bg-[#f1f1f1] rounded-md border border-gray-300 outline-none text-black"
                            >
                                <option value="">YY</option>
                                {Array.from({ length: 11 }, (_, i) => {
                                    const year = (25 + i).toString();
                                    return (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm text-black">CVV</label>
                        <input
                            type="password"
                            {...register("last3", {
                                required: 'This field is required',
                                pattern: {
                                    value: /^[0-9]{3}$/,
                                    message: 'Invalid CVV format'
                                },
                                onChange: (e) => {
                                    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
                                    setCvv(e.target.value)
                                }
                            })}
                            className="w-full p-2 bg-[#f1f1f1] rounded-md border border-gray-300 outline-none text-black"
                            placeholder="•••"
                        />

                    </div>
                </div>
                <button className="bg-[#145DB8] text-white rounded-[10px] p-3! mt-3! text-[14px] font-normal">Save</button>
            </form>
        </section >
    )
}

export default MethodForm
