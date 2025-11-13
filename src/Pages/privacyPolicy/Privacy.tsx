import React from 'react'

const Privacy: React.FC = () => {
    return (
        <section className="md:!py-8 !py-6 !px-8 md:!px-12 w-full h-screen flex items-center gap-4 flex-col">
            <h1 className='text-2xl noto-serif'>Privacy Policy</h1>
            <div className="flex flex-col w-full gap-2 items-start">
                <div className="flex flex-col  gap-3">
                    <p className="noto-serif">Last Updated: <span className="text-[#98a1ab]">19/11/2024</span></p>
                    <p className="text-[#6D7379] text-sm">
                        Welcome to Cure. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our doctor appointment booking app.
                    </p>
                </div>
                <div className="flex flex-col  gap-3">
                    <p className="noto-serif">terms & conditions</p>
                    <p className="text-[#6D7379] text-sm">
                        By registering, accessing, or using this app, you confirm that you are at least 18 years old (or have parental/guardian consent if younger) and agree to be bound by these Terms and our Privacy Policy.
                    </p>
                    <span className="text-[#6D7379] text-sm">You agree to:</span>
                    <ul className="list-disc list-inside flex flex-col text-[#6D7379] text-sm">
                        <li>Use the app only for lawful purposes.</li>
                        <li>Provide accurate and complete information during registration and booking.</li>
                        <li>Not impersonate others or create fake accounts.</li>
                    </ul>
                    <span className="text-[#6D7379] text-sm">You may not:</span>
                    <ul className="list-disc list-inside flex flex-col text-[#6D7379] text-sm">
                        <li>Disrupt or interfere with the app’s functionality.</li>
                        <li>Try to access data or systems not meant for you.</li>
                        <li>Use the app to harass or abuse doctors or staff.</li>
                    </ul>
                    <p className="text-[#6D7379] text-sm">Your data is handled in accordance with our [Privacy Policy]. You are responsible for keeping your login credentials secure.</p>
                </div>
            </div>
        </section>
    )
}

export default Privacy
