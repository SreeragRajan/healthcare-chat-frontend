import { ShieldPlus } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 dark:text-gray-300 border-t border-gray-200 p-6 sm:p-8 text-gray-600 font-sans text-sm">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-0 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <ShieldPlus className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <strong className="text-lg sm:text-xl text-blue-500">
            HealthChat
          </strong>
        </div>

        <p className="text-xs sm:text-sm text-center pt-2">
          Empowering you to understand and manage your health with confidence
          through secure, AI-powered insights.
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs sm:text-sm text-center">
          © 2025 HealthChat Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
