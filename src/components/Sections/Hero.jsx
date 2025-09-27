import { Link } from 'react-router-dom';
import React from 'react';

const Hero = () => {
  return (
    <section className="relative py-16 md:py-32 flex items-center">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent dark:from-blue-500/20 dark:to-black/20 z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-foreground-light dark:text-foreground-dark">
            Unlock the Power of Your Health Records
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-80 text-foreground-muted-light dark:text-foreground-muted-dark mb-8">
            Securely upload your medical documents and chat with an AI assistant to gain insights into your health.
          </p>

          {/* Link to /documents */}
          <Link
            to="/documents"
            className="inline-block bg-blue-500 dark:bg-blue-600 text-white font-bold py-3 px-6 sm:px-8 md:px-10 rounded-lg text-base sm:text-lg md:text-xl hover:bg-blue-500/90 dark:hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
          >
            Upload Documents
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
