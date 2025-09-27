import React, { useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";
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
    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-300 flex-shrink-0">
        <h2 className="text-xl font-bold">Documents Preview</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        ) : filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-gray-900 p-3 rounded-lg text-sm text-gray-200"
            >
              <h3 className="font-semibold mb-2">{doc.name}</h3>
              {doc.matchedLines.length > 0 ? (
                doc.matchedLines.map((line, idx) => <p key={idx}>{line}</p>)
              ) : (
                <p className="text-gray-400 text-sm">No matching content.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm text-center">
            No documents available. Upload one to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;
