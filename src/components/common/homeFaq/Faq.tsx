import React, { useState } from "react";

interface Question {
    question: string;
    answer: string;
}

const questions: Question[] = [
    {
        question: "What are the school hours at Little Learners Academy?",
        answer:
            "Our school hours are from 8:00 AM to 3:00 PM, Monday to Friday. We also offer extended care options for parents who need early drop-off or late pick-up.",
    },
    {
        question: "How do you handle food allergies and dietary restrictions?",
        answer:
            "We accommodate allergies and provide dietary options. Please inform us during enrollment.",
    },
    {
        question: "Is there a uniform policy for students?",
        answer:
            "Yes, we have a comfortable and practical uniform policy to promote equality among students.",
    },
    {
        question: "What is the teacher-to-student ratio at Little Learners Academy?",
        answer:
            "We maintain a low student-to-teacher ratio of 10:1 to ensure personalized attention and support for each child.",
    },
    {
        question: "What extracurricular activities are available for students?",
        answer:
            "We offer art, music, and physical education programs to help children explore their interests.",
    },
    {
        question: "How do you handle discipline and behavior management?",
        answer:
            "We use positive reinforcement and communication-based approaches for behavior management.",
    },
    {
        question: "What safety measures are in place at the school?",
        answer:
            "Our facility has secure entry systems, CCTV monitoring, and trained staff for emergency situations.",
    },
    {
        question: "How can I get involved in the school community?",
        answer:
            "We encourage parent participation through regular meetings and school events.",
    },
];

const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center gap-6 px-6 md:px-12 py-10 bg-white">
            <div className="bg-[#E8EFF8] px-4 py-1 rounded-full text-[#145DB8] text-sm font-medium">
                Frequently Asked Questions
            </div>

            <h1 className="noto-serif text-2xl md:text-3xl font-semibold text-center">
                Got Questions? We’ve Got Answers!
            </h1>

            {/* Questions */}
            <div className="flex flex-col w-full md:w-1/2 gap-4 mt-4">
                {questions.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div
                            key={index}
                            className="w-full bg-[#F5F6F7] rounded-lg p-4 transition-all duration-300"
                        >
                            <div
                                className="flex items-center justify-between cursor-pointer select-none"
                                onClick={() => toggleQuestion(index)}
                            >
                                <p className="noto-serif font-medium text-base md:text-lg">
                                    {item.question}
                                </p>
                                <img
                                    src={isOpen ? "/icons/min.svg" : "/icons/plus.svg"}
                                    alt="toggle"
                                    className="w-5 h-5 ml-2"
                                    loading="lazy"
                                />
                            </div>

                            {isOpen && (
                                <div className="mt-3 text-sm text-[#6B7280] border-t border-gray-300 pt-3">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Faq;
