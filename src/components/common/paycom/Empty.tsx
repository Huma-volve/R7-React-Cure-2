import React from 'react'

const Empty = () => {
    return (
        <div className='flex items-center justify-center flex-col gap-4'>
            <img src="/public/icons/payment icons/credit-card 1.svg" alt="empty page icon" loading='lazy' />
            <div className="flex flex-col gap-2">
                <h1 className="noto-serif">Nothing to display here!</h1>
                <p className='text-[#6D7379] text-sm'>Add your cards to make payment easier</p>
            </div>
        </div>
    )
}

export default Empty
