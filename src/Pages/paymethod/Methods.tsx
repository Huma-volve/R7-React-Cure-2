import React from 'react'

const Methods: React.FC = () => {
    return (
        <section className="md:!py-8 !py-6 !px-8 md:!px-12 w-full h-screen">
            <h1 className="noto-serif text-2xl">Payment Method</h1>
            <div className="flex  flex-col items-center justify-between w-full h-[80%] !p-2">
                <div className="flex w-full flex-col gap-2">
                    <div className="flex  items-center justify-between w-full bg-[#F5F6F7] rounded-md !p-4 cursor-pointer ">
                        <div className="flex items-center gap-2">
                            <img src="/public/icons/payment icons/brandico_visa.svg" alt="visa icon" loading='lazy' />
                            <span>Axis Bank 450***49</span>
                        </div>
                        <span className='!p-2 rounded-full border-2 border-[#6D7379]'></span>
                    </div>
                </div>
                <button className="!p-2 w-full rounded-md bg-[#145DB8]  flex items-center justify-center gap-2">
                    <img src="/icons/payment icons/material-symbols_add-rounded.svg" alt="plus icon" loading='eager' />
                    <span className='text-white'>Add Card</span>
                </button>
            </div>
        </section>
    )
}

export default Methods
