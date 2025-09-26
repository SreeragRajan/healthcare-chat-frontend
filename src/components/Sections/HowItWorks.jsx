import React from "react";
import { FileUp, MessageSquareText, BadgeCheck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Upload Your Documents",
      description:
        "Securely drag and drop or select your healthcare documents for analysis. We prioritize your privacy with end-to-end encryption.",
      icon: <FileUp className="text-blue-500 dark:text-blue-400 text-4xl" />,
    },
    {
      title: "Chat with AI",
      description:
        "Ask questions in plain language and get instant, intelligent answers and insights based on your medical records.",
      icon: <MessageSquareText className="text-blue-500 dark:text-blue-400 text-4xl" />,
    },
    {
      title: "Access Sources",
      description:
        "Easily access the original context and sources from your documents for every piece of information provided by the AI.",
      icon: <BadgeCheck className="text-blue-500 dark:text-blue-400 text-4xl" />,
    },
  ];

  return (
    <section id="#howitworks" className="py-16 sm:py-24 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-light dark:text-foreground-dark">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-foreground-muted-light dark:text-foreground-muted-dark max-w-2xl mx-auto opacity-80">
            A simple, secure, and intuitive process to get insights from your health data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="text-center bg-white text-black dark:bg-gray-900 dark:text-white p-6 rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-20 w-20 mx-auto rounded-full bg-blue-500/10 dark:bg-blue-500/20 mb-6 border-4 border-blue-500/20 dark:border-blue-400/30">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground-light dark:text-foreground-dark">
                {`${idx + 1}. ${step.title}`}
              </h3>
              <p className="text-foreground-muted-light dark:text-foreground-muted-dark opacity-80">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
