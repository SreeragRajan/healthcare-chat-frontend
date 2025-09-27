import React from "react";
import MedicalDisclaimer from "./components/MedicalDisclaimer";
import DocumentUpload from "./components/DocumentUpload";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
const App = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documents" element={<DocumentUpload />} />
        <Route path="/chat" element={<MedicalDisclaimer />} />
      </Routes>
    </div>
  );
};

export default App;
