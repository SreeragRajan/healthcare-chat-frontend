import { UploadIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { uploadDocument, getDocuments, deleteDocument } from "../services/api.js";

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
        // Format file metadata for API
        const fileData = {
          name: file.name,
          size: file.size,
          type: file.type,
        };
        const uploaded = await uploadDocument(fileData);

        // Avoid duplicate entries
        setDocuments((prev) => {
          const exists = prev.find((doc) => doc.id === uploaded.id);
          return exists ? prev : [...prev, uploaded];
        });
      } catch (err) {
        console.error("Upload error:", err);
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
        <div className="mt-10">
          <h3 className="text-xl font-bold text-black dark:text-white mb-4">
            Uploaded Files
          </h3>
          <div className="overflow-x-auto rounded-lg border border-black/10 dark:border-white/10 bg-background-light dark:bg-background-dark">
            <table className="w-full text-left">
              <thead className="bg-black/5 dark:bg-white/5">
                <tr>
                  <th className="p-4 text-sm font-semibold text-black/80 dark:text-white/80">
                    Name
                  </th>
                  <th className="p-4 text-sm font-semibold text-black/80 dark:text-white/80">
                    Size
                  </th>
                  <th className="p-4 text-sm font-semibold text-black/80 dark:text-white/80">
                    Type
                  </th>
                  <th className="p-4 text-sm font-semibold text-black/80 dark:text-white/80">
                    Upload Date
                  </th>
                  <th className="p-4 text-sm font-semibold text-black/80 dark:text-white/80">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10">
                {documents.map((file) => (
                  <tr key={file.id}>
                    <td className="p-4 text-sm text-black dark:text-white">
                      {file.name}
                    </td>
                    <td className="p-4 text-sm text-black/60 dark:text-white/60">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </td>
                    <td className="p-4 text-sm text-black/60 dark:text-white/60">
                      {file.type?.split("/")[1]?.toUpperCase() || "N/A"}
                    </td>
                    <td className="p-4 text-sm text-black/60 dark:text-white/60">
                      {new Date(file.uploadDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {documents.length === 0 && !loading && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-black/50 dark:text-white/50">
                      No documents uploaded yet
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-black/50 dark:text-white/50">
                      Uploading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DocumentUpload;
