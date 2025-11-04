import React from 'react'
import { useNavigate } from 'react-router'

const PayMethod: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className="md:!py-8 !py-6 !px-8 md:!px-12 w-full">
                <h1 className="noto-serif text-2xl">Payment Method</h1>
                <div className="flex flex-col gap-4 !p-2">
                    <div className="flex flex-col gap-3">
                        <h1 className="noto-serif">Credit / Debit Card</h1>
                        <div onClick={() => navigate('/payment/visa-version')} className="flex items-center justify-between w-full bg-[#F5F6F7] rounded-md !p-4 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <img src="/icons/payment icons/brandico_visa.svg" alt="visa icon" loading='lazy' />
                                <span>VISA</span>
                            </div>
                            <img src="/icons/payment icons/solar_alt-arrow-right-linear.svg" alt="" />
                        </div>
                        <div className="flex items-center justify-between w-full bg-[#F5F6F7] rounded-md !p-4 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <img src="/icons/payment icons/logos_mastercard.svg" alt="visa icon" loading='lazy' />
                                <span>MasterCard</span>
                            </div>
                            <img src="/icons/payment icons/solar_alt-arrow-right-linear.svg" alt="" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="noto-serif">Mobile Wallets</h1>
                        <div className="flex  items-center justify-between w-full bg-[#F5F6F7] rounded-md !p-4 cursor-pointer ">
                            <div className="flex items-center gap-2">
                                <img src="/icons/payment icons/logos_apple-pay.svg" alt="apple-pay" loading='lazy' />
                                <span>Apple Pay</span>
                            </div>
                            <span className='!p-2 rounded-full border-2 border-[#6D7379]'></span>
                        </div>
                        <div className="flex items-center justify-between w-full bg-[#F5F6F7] rounded-md !p-4 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <img src="/icons/payment icons/ic_outline-paypal.svg" alt="paypal" loading='lazy' />
                                <span>PayPal</span>
                            </div>
                            <span className='!p-2 rounded-full border-2 border-[#6D7379]'></span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PayMethod
