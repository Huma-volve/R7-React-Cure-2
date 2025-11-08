import Cookies from 'js-cookie';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PayMethod: React.FC = () => {
    const navigate = useNavigate();
    const handleAddCard = (method: string) => {
        navigate('/methods', { state: { method } });
        Cookies.set("methodName", method);
    };
    return (
        <>
            <section className="md:py-8! py-6! px-8! md:px-12! w-full">
                <div className="md:flex items-center justify-center gap-4 p-4! md:bg-[#f6faff] rounded-md w-full ">
                    <div className="flex flex-col gap-4 rounded-lg md:bg-white p-4! w-full md:w-1/2">
                        <h1 className="noto-serif text-2xl">Payment Method</h1>
                        <div className="flex flex-col gap-3">
                            <h1 className="noto-serif">Credit / Debit Cart</h1>
                            <div onClick={() => handleAddCard("Visa")} className="flex items-center justify-between w-full bg-[#F5F6F7] rounded-md p-4! hover:bg-[#145eb841] hover:text-white cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <img src="/icons/payment icons/brandico_visa.svg" alt="visa icon" loading='lazy' />
                                    <span>VISA</span>
                                </div>
                                <img src="/icons/payment icons/solar_alt-arrow-right-linear.svg" alt="" />
                            </div>
                            <div onClick={() => handleAddCard("Mastercard")} className="flex hover:bg-[#145eb841] hover:text-white items-center justify-between w-full bg-[#F5F6F7] rounded-md !p-4 cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <img src="/icons/payment icons/logos_mastercard.svg" alt="visa icon" loading='lazy' />
                                    <span>MasterCard</span>
                                </div>
                                <img src="/icons/payment icons/solar_alt-arrow-right-linear.svg" alt="" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h1 className="noto-serif">Mobile Wallets</h1>
                                <div onClick={() => handleAddCard("ApplePay")} className="flex  items-center justify-between w-full bg-[#F5F6F7] rounded-md !p-4 cursor-pointer ">
                                    <div className="flex items-center gap-2">
                                        <img src="/icons/payment icons/logos_apple-pay.svg" alt="apple-pay" loading='lazy' />
                                        <span>Apple Pay</span>
                                    </div>
                                    <span className='p-2! rounded-full border-2 border-[#6D7379]'></span>
                                </div>
                                <div onClick={() => handleAddCard("PayPal")} className="flex items-center justify-between w-full bg-[#F5F6F7] rounded-md !p-4 cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <img src="/icons/payment icons/ic_outline-paypal.svg" alt="paypal" loading='lazy' />
                                        <span>PayPal</span>
                                    </div>
                                    <span className='p-2! rounded-full border-2 border-[#6D7379]'></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default PayMethod
