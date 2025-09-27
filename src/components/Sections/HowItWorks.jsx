import React from "react";
import { FileUp, MessageSquareText, BadgeCheck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Upload Your Documents",
      description:
        "Securely drag and drop or select your healthcare documents for analysis. We prioritize your privacy with end-to-end encryption.",
      icon: <FileUp className="text-blue-500 dark:text-blue-400 text-4xl sm:text-5xl" />,
    },
    {
      title: "Chat with AI",
      description:
        "Ask questions in plain language and get instant, intelligent answers and insights based on your medical records.",
      icon: <MessageSquareText className="text-blue-500 dark:text-blue-400 text-4xl sm:text-5xl" />,
    },
    {
      title: "Access Sources",
      description:
        "Easily access the original context and sources from your documents for every piece of information provided by the AI.",
      icon: <BadgeCheck className="text-blue-500 dark:text-blue-400 text-4xl sm:text-5xl" />,
    },
  ];

  return (
    <section id="howitworks" className="py-12 sm:py-16 md:py-24 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 px-2 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground-light dark:text-foreground-dark">
            How It Works
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-foreground-muted-light dark:text-foreground-muted-dark max-w-2xl mx-auto opacity-80">
            A simple, secure, and intuitive process to get insights from your health data.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="text-center bg-white dark:bg-gray-800 text-black dark:text-white p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 mx-auto rounded-full bg-blue-500/10 dark:bg-blue-500/20 mb-6 border-4 border-blue-500/20 dark:border-blue-400/30">
                {step.icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-foreground-light dark:text-foreground-dark">
                {`${idx + 1}. ${step.title}`}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-foreground-muted-light dark:text-foreground-muted-dark opacity-80">
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
