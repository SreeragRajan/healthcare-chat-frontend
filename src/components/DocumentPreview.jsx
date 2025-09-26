import React, { useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";
import { getDocuments } from "../services/api";
import LoadingSpinner from "./LoadingSpinner";

const DocumentPreview = () => {
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

  return (
    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg flex flex-col h-fit">
      {/* Header */}
      <div className="p-6 border-b border-gray-300">
        <h2 className="text-xl font-bold">Documents</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <LoadingSpinner />
        ) : documents.length > 0 ? (
          documents.map((doc, idx) => (
            <DocumentCard key={doc.id || idx} doc={doc} />
          ))
        ) : (
          <p className="text-gray-600 text-sm text-center">
            No documents available. Upload one to get started.
          </p>
        )}
      </div>

      {/* Footer */}
      {/* <div className="p-6 border-t border-gray-300">
        <button
          className="w-full h-10 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-lg disabled:opacity-50"
          disabled={documents.length === 0}
        >
          View Full Document
        </button>
      </div> */}
    </div>
  );
};

export default DocumentPreview;
