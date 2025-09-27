import React from "react";
import { Plus } from "lucide-react";

const Faqs = () => {
  const faqs = [
    {
      question: "How does HealthChat ensure my data privacy?",
      answer:
        "We use end-to-end encryption for all documents you upload. Your data is processed in a secure environment and is never shared with third parties. We are fully HIPAA compliant, ensuring your health information is protected to the highest standard.",
    },
    {
      question: "What types of documents can I upload?",
      answer:
        "You can upload PDF, DOCX, and TXT files including lab reports, doctor's notes, and medical imaging reports. Our AI understands various formats.",
    },
    {
      question: "Is the AI-generated information a substitute for medical advice?",
      answer:
        "No. HealthChat is a tool to understand your health records, not to provide medical advice. Always consult with a qualified healthcare provider.",
    },
    {
      question: "How accurate is the AI?",
      answer:
        "The AI is trained on a vast dataset. Verify critical information with original documents. Always consult a healthcare professional for final interpretation.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 px-2 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto opacity-80">
            Your questions answered. Find out more about how we protect your data and help you understand it.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group p-4 sm:p-6 rounded-xl border border-gray-300 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                  {faq.question}
                </h3>
                <Plus
                  className="text-blue-500 transition-transform duration-300 group-open:rotate-45"
                  size={20}
                />
              </summary>
              <div className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg opacity-80">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
