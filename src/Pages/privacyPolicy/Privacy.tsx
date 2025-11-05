import React from 'react'

const Privacy: React.FC = () => {
    return (
        <section className="md:!py-8 !py-6 !px-8 md:!px-12 w-full h-screen flex items-center justify-center flex-col">
            <h1 className='text-2xl noto-serif'>Privacy Policy</h1>
            <div className="flex flex-col w-full items-start">
                <p className="noto-serif">Last Updated: <span className="text-[#6D7379]">19/11/2024</span></p>
                <p className="">
                    Welcome to Cure. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our doctor appointment booking app.
                </p>
            </div>
        </section>
    )
}

export default Privacy
