import { LaptopMinimal, LockKeyhole, ShieldCheck } from "lucide-react";
import React, { useState } from "react";

const MedicalDisclaimer = () => {

    const [agreed, setAgreed] = useState(false);
  return (
    <div className="bg-[#f6f7f8] min-h-screen w-full flex items-center justify-center p-10"> 
      <div className="h-full max-w-2xl p-10 rounded-lg shadow-xl flex flex-col gap-4 bg-white justify-center">
        <h1 className="text-center text-3xl font-bold text-gray-900">Important Information Before You Start</h1>
        <h3 className="text-center text-gray-600">
          Welcome to HealthChat! Please read the following information
          carefully.
        </h3>
        <p className="text-gray-600 mt-2">
          This application is designed to provide information and support
          related to your health documents. However, it is crucial to understand
          that{" "}
          <strong className="text-gray-900">
            HealthChat is not a substitute for professional medical advice,
            diagnosis, or treatment.
          </strong>{" "}
          Always seek the advice of your physician or other qualified health
          provider with any questions you may have regarding a medical
          condition.
        </p>

        <h1 className="text-lg font-bold text-gray-900">Privacy and Data Security</h1>
        <p className="text-gray-600">
          Your privacy is our priority. HealthChat processes your data locally
          on your device to ensure maximum security and confidentiality. This
          means your health information does not leave your computer, and we do
          not store or access your data.
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4 bg-gray-100 p-4 rounded-md">
            <span className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
              <ShieldCheck className="text-blue-500" />
            </span>
            <div>
              <h2 className="font-bold text-gray-900">Local Processing</h2>
              <h3 className="text-sm text-gray-700">
                Your data is processed locally on your device for enhanced
                privacy.
              </h3>
            </div>
          </div>
          <div className="flex gap-4 bg-gray-100 p-4 rounded-md">
            <span className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
              <LockKeyhole className="text-blue-500" />
            </span>
            <div>
              <h2 className="font-bold text-gray-900">Data Confidentiality</h2>
              <h3 className="text-sm text-gray-700">
                We do not store or access your health information at any time.
              </h3>
            </div>
          </div>
          <div className="flex gap-4 bg-gray-100 p-4 rounded-md">
            <span className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
              <LaptopMinimal className="text-blue-500" />
            </span>
            <div>
              <h2 className="font-bold text-gray-900">Secure Environment</h2>               
              <h3 className="text-sm text-gray-700">
                All operations occur securely within the confines of your
                browser.
              </h3>
            </div>
          </div>
        </div>

        <hr className="mt-4 text-gray-300" />

        <div className="flex items-center gap-2 mt-3">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <h3 className="text-sm text-gray-700 font-medium">
I have read, understood, and agree to the terms above.</h3>     
        </div>

        <button className={`p-3 font-bold text-sm w-full rounded-md ${agreed ? "bg-blue-500 text-white cursor-pointer" : "bg-gray-400 text-white cursor-not-allowed"}`} disabled={!agreed}>Start Chat</button>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
