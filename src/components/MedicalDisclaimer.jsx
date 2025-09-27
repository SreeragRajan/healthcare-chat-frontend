import { LaptopMinimal, LockKeyhole, ShieldCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import ChatWithDocuments from "./ChatWithDocuments";

const MedicalDisclaimer = () => {
  const [agreed, setAgreed] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Load saved agreement state
  useEffect(() => {
    const saved = localStorage.getItem("agreedToDisclaimer");
    if (saved === "true") {
      setAgreed(true);
      setClicked(true);
    }
  }, []);

  // Persist state when changed
  useEffect(() => {
    localStorage.setItem("agreedToDisclaimer", agreed);
  }, [agreed]);

  if (!agreed || !clicked) {
    return (
      <div className="bg-[#f6f7f8] min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-2xl p-6 sm:p-8 lg:p-10 rounded-lg shadow-xl flex flex-col gap-4 bg-white">
          {/* Title */}
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900">
            Important Information Before You Start
          </h1>
          <h3 className="text-center text-sm sm:text-base text-gray-600">
            Welcome to HealthChat! Please read the following information
            carefully.
          </h3>

          {/* Disclaimer */}
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            This application is designed to provide information and support
            related to your health documents. However, it is crucial to
            understand that{" "}
            <strong className="text-gray-900">
              HealthChat is not a substitute for professional medical advice,
              diagnosis, or treatment.
            </strong>{" "}
            Always seek the advice of your physician or other qualified health
            provider with any questions you may have regarding a medical
            condition.
          </p>

          {/* Privacy */}
          <h1 className="text-base sm:text-lg font-bold text-gray-900">
            Privacy and Data Security
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Your privacy is our priority. HealthChat processes your data locally
            on your device to ensure maximum security and confidentiality. This
            means your health information does not leave your computer, and we do
            not store or access your data.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex gap-3 sm:gap-4 bg-gray-100 p-3 sm:p-4 rounded-md">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-blue-100 flex items-center justify-center">
                <ShieldCheck className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <div>
                <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                  Local Processing
                </h2>
                <h3 className="text-xs sm:text-sm text-gray-700">
                  Your data is processed locally on your device for enhanced
                  privacy.
                </h3>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 bg-gray-100 p-3 sm:p-4 rounded-md">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-blue-100 flex items-center justify-center">
                <LockKeyhole className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <div>
                <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                  Data Confidentiality
                </h2>
                <h3 className="text-xs sm:text-sm text-gray-700">
                  We do not store or access your health information at any time.
                </h3>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 bg-gray-100 p-3 sm:p-4 rounded-md">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-blue-100 flex items-center justify-center">
                <LaptopMinimal className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <div>
                <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                  Secure Environment
                </h2>
                <h3 className="text-xs sm:text-sm text-gray-700">
                  All operations occur securely within the confines of your
                  browser.
                </h3>
              </div>
            </div>
          </div>

          <hr className="mt-4 text-gray-300" />

          {/* Agreement */}
          <div className="flex items-start sm:items-center gap-2 mt-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 sm:mt-0"
            />
            <h3 className="text-xs sm:text-sm text-gray-700 font-medium leading-snug">
              I have read, understood, and agree to the terms above.
            </h3>
          </div>

          {/* Button */}
          <button
            onClick={() => setClicked(true)}
            className={`p-3 font-bold text-sm sm:text-base w-full rounded-md transition-colors ${
              agreed
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
            disabled={!agreed}
          >
            Start Chat
          </button>
        </div>
      </div>
    );
  } else {
    return <ChatWithDocuments />;
  }
};

export default MedicalDisclaimer;
