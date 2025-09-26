import { Loader } from "lucide-react";
import React from "react";

const LoadingSpinner = ({ size = 20 }) => {
  return (
    <div className="flex items-center justify-center">
      <Loader size={size} className="animate-spin text-blue-400" />
    </div>
  );
};

export default LoadingSpinner;
