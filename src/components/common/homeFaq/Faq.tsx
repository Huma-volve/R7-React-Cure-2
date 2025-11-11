import React, { useState } from "react";

interface Question {
    question: string;
    answer: string;
}

const questions: Question[] = [
    {
        question: "What is this app used for?",
        answer:
            "This app allows you to search for doctors, book appointments, and consult in person easily from your phone.",
    },
    {
        question: "Is the app free to use?",
        answer:
            "Is the app free to use?",
    },
    {
        question: "How can I find a doctor?",
        answer:
            "How can I find a doctor?",
    },
    {
        question: "Can I cancel my appointment?",
        answer:
            "Can I cancel my appointment?",
    },
    {
        question: "What payment are supported",
        answer:
            "What payment are supported",
    },
    {
        question: "How do I edit my profile?",
        answer:
            "How do I edit my profile?",
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
