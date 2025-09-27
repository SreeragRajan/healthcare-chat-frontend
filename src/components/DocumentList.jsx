import React from "react";

const DocumentList = ({ documents, loading, onDelete }) => {
  return (
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
                    onClick={() => onDelete(file.id)}
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
  );
};

export default DocumentList;
