import { ShieldPlus } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 dark:text-gray-300 border-t border-gray-200 p-6  text-gray-600 font-sans text-sm">
      <div className="flex flex-col gap-2 justify-between items-center mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">
            <ShieldPlus />
          </div>
          <strong className="text-lg text-blue-500">HealthChat</strong>
        </div>
        <p className="text-xs text-center md:text-left">
          Empowering you to understand and manage your health with confidence through secure, AI-powered insights.
        </p>
      </div>
     
      <div className="mt-4 pt-4 ">
        <p className="text-xs text-center">© 2024 HealthChat Inc. All rights reserved.</p>
       
      </div>
    </footer>
  );
};

export default Footer;