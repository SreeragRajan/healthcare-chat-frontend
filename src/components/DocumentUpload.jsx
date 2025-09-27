import { UploadIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { uploadDocument, getDocuments, deleteDocument } from "../services/api.js";
import DocumentList from "./DocumentList.jsx";

const DocumentUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await getDocuments();
        setDocuments(docs);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      }
    };
    fetchDocuments();
  }, []);

  // Handle files from drag/drop or browse
const handleFiles = async (files) => {
    for (const file of files) {
      if (!file) continue;
      setLoading(true);
      try {
        const uploaded = await uploadDocument(file); // send File directly
        setDocuments((prev) => [...prev, uploaded]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };


  // Handle file deletion
  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <main className="flex-1 px-10 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Upload Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Upload Documents
          </h1>
          <p className="text-black/60 dark:text-white/60 mt-1">
            Drag and drop your healthcare documents here or browse files from
            your computer.
          </p>
        </div>

        {/* Drag & Drop Upload */}
        <div
          className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-blue-500 bg-primary/10 dark:bg-primary/20 px-6 py-16 text-center cursor-pointer"
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center gap-2">
            <span>
              <UploadIcon size={30} />
            </span>
            <p className="text-lg font-bold text-black dark:text-white">
              Drag and drop files here
            </p>
            <p className="text-sm text-black/60 dark:text-white/60">
              Limit 200MB per file
            </p>
          </div>
          <label className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-blue-500 text-white text-sm font-bold shadow-sm hover:bg-primary/80 transition-colors">
            <span className="truncate">{loading ? "Uploading..." : "Browse Files"}</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        </div>

        {/* Uploaded Files Table */}
        <DocumentList
          documents={documents}
          loading={loading}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
};

export default DocumentUpload;
