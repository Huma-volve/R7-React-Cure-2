import React from "react";

const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

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

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full h-full flex flex-col gap-4 items-center justify-center md:!p-8 !p-6 !px-8 md:!px-12">
            <div className="bg-[#E8EFF8] !p-2 rounded-full text-[#145DB8]">
                <p>Frequently Asked Questions</p>
            </div>
            <h1 className="noto-serif text-3xl">Got Questions? We’ve got Answers!</h1>

            <div className="flex flex-col w-full md:w-1/2 gap-4">
                {questions.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-2 w-full bg-[#F5F6F7] rounded-md !p-4"
                    >
                        <div
                            className="flex w-full items-center justify-between cursor-pointer"
                            onClick={() => toggleQuestion(index)}
                        >
                            <p className="noto-serif">{item.question}</p>
                            <img
                                src={openIndex === index ? "/icons/min.svg" : "/icons/plus.svg"}
                                alt=""
                                loading="lazy"
                            />
                        </div>

                        {openIndex === index && (
                            <div className="flex flex-col">
                                <hr className="border-black !my-2" />
                                <p className="text-[#99A2AB] text-sm">{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Faq;
