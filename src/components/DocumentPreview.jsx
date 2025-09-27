import React, { useEffect, useState } from "react";
import { getDocuments } from "../services/api.js";
import LoadingSpinner from "./LoadingSpinner";

const DocumentPreview = ({ searchQuery = "" }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch documents on mount
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docs = await getDocuments();
        setDocuments(docs);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  // Filtered documents based on search query
  const filteredDocuments = searchQuery
    ? documents.map((doc) => {
        const lines = doc.content.split("\n");
        const matchedLines = lines.filter((line) =>
          line.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { ...doc, matchedLines };
      })
    : documents.map((doc) => ({
        ...doc,
        matchedLines: doc.content.split("\n"),
      }));

  return (
    <div className="bg-gray-200 text-black/80 dark:bg-gray-800 rounded-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-2 sm:p-6 border-b border-gray-300 flex-shrink-0">
        <h2 className="text-base sm:text-xl font-bold">Documents Preview</h2>
      </div>

      {/* Content */}
      <div className="custom-scrollbar flex-1 overflow-auto p-3 sm:p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        ) : filteredDocuments.length > 0 ? (
          <div className="flex flex-col gap-2">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-gray-900 p-3 sm:p-4 rounded-lg text-xs sm:text-sm text-gray-200 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-sm sm:text-base mb-2 truncate">
                  {doc.name}
                </h3>
                <div className="space-y-1">
                  {doc.matchedLines.length > 0 ? (
                    doc.matchedLines.map((line, idx) => (
                      <p
                        key={idx}
                        className="truncate hover:whitespace-normal hover:break-words"
                      >
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs sm:text-sm">
                      No matching content.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-xs sm:text-sm text-center">
            No documents available. Upload one to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;
