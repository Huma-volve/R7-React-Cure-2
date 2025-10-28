import React from 'react'
import { Form } from "react-hook-form";

const LogIn: React.FC = () => {
    return (
        <section className='w-full p-4 flex items-center justify-between'>
            <div className="">
                <Form>
                    <div className="flex flex-col">
                        <h2>Sign in</h2>
                        <p className='font-light text-[#6D7379]'>Please Enter your phone number</p>
                    </div>
                </Form>
            </div>
            <div className="w-full h-full bg-[url(\image\background.jpg)">

            </div>
        </section>
    )
}

export default LogIn
