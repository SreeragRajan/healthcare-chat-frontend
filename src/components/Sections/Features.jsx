import React from "react";
import { FileUp, MessagesSquare, FileSearch2 } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const featuresData = [
    {
      title: "Drag & Drop Upload",
      description:
        "Easily upload your medical records with a simple drag-and-drop interface.",
      icon: FileUp,
    },
    {
      title: "AI-Powered Chat",
      description:
        "Ask questions about your health records and receive instant, AI-generated answers.",
      icon: MessagesSquare,
    },
    {
      title: "Document Context",
      description:
        "View the specific document context for each chat response, ensuring accuracy and clarity.",
      icon: FileSearch2,
    },
  ];

  // Motion variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="features"
      className="py-16 sm:pt-24 sm:pb-32 bg-gray-100 text-black dark:bg-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            Key Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto opacity-90"
          >
            Explore the capabilities that make managing your health information
            easier than ever.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {featuresData.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="bg-white text-black dark:bg-gray-900 dark:text-white border border-gray-300 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-500/10 mb-4">
                  <Icon size={35} className="text-blue-500 text-3xl sm:text-4xl" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-base opacity-90">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
