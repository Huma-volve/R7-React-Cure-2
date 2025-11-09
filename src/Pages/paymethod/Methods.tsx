import Empty from '@/components/common/paycom/Empty';
import { getMethods } from '@/services/paymentMethod/Methods';
import type { PaymentMethod } from '@/store/MethodsSlice';
import type { AppDispatch, RootState } from '@/store/Store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
interface PaymentMethodData {
    data: PaymentMethod[];
    loading: boolean;
    error: string | null;
}
const Methods: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error }: PaymentMethodData = useSelector((state: RootState) => state.methods);
    const navigate = useNavigate();



    React.useEffect(() => {
        dispatch(getMethods());
        console.log(data);
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const handleAddCard = () => {
        navigate('/methodform')
    }
    return (
        <section className="md:py-8! py-6! px-8! md:px-12! w-full h-screen">
            <h1 className="noto-serif text-2xl">Payment Method</h1>
            <div className="flex  flex-col items-center justify-between w-full h-[80%] !p-2">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((method, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between w-full bg-[#F5F6F7] rounded-md !p-4 cursor-pointer"
                        >
                            <div className="flex items-center gap-2">
                                <img
                                    src="/icons/payment icons/brandico_visa.svg"
                                    alt="visa icon"
                                    loading="lazy"
                                />
                                <span>{method.methodName}********{method.last3}</span>
                            </div>
                            <img
                                src="/icons/payment icons/solar_alt-arrow-right-linear.svg"
                                alt=""
                            />
                        </div>
                    ))
                ) : (
                    <Empty />
                )}

                <div className=" flex w-full items-center justify-center">
                    <button onClick={handleAddCard} className="p-2! md:p-3! w-full  md:w-auto rounded-md bg-[#145DB8]  flex items-center justify-center gap-4">
                        <img src="/icons/payment icons/plus.svg" alt="plus icon" loading='eager' />
                        <span className='text-white'>Add Card</span>
                    </button>
                </div>

            </div>
        </section>
    )
}

export default Methods
