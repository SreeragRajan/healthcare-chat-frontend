import { File } from "lucide-react";
import React from "react";

const DocumentCard = ({ doc }) => {
  // Fallbacks for different doc formats (mock vs API)
  const title = doc.title || doc.name || "Untitled Document";
  const description =
    doc.description || doc.type || "No description available";
  const extra =
    doc.page !== undefined
      ? `Page ${doc.page}`
      : doc.uploadDate
      ? `Uploaded: ${new Date(doc.uploadDate).toLocaleDateString()}`
      : null;

  // Handle opening document in new tab
  const handleOpen = () => {
    if (doc.url) {
      window.open(doc.url, "_blank"); // ✅ Opens file in a new tab
    } else {
      alert("No file available for this document.");
    }
  };

  return (
    <div
      onClick={handleOpen}
      className="flex gap-4 p-4 rounded-lg bg-background-light dark:bg-background-dark hover:bg-blue-400/10 dark:hover:bg-blue-400/20 cursor-pointer transition-colors"
    >
      {/* Icon */}
      <div className="text-blue-400 flex items-center justify-center rounded-lg bg-blue-400/20 shrink-0 w-10 h-10 p-2">
        <File />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center">
        <p className="font-medium text-base">{title}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
        {extra && (
          <p className="text-xs text-slate-400 dark:text-slate-500">{extra}</p>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
