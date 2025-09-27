import React from "react";

const DocumentList = ({ documents, loading, onDelete }) => {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-black dark:text-white mb-4">
        Uploaded Files
      </h3>

      {/* Table for desktop screen */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-black/10 dark:border-white/10 bg-background-light dark:bg-background-dark">
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
              <tr
                key={file.id}
                className="hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
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

            {/* Empty state */}
            {documents.length === 0 && !loading && (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-black/50 dark:text-white/50"
                >
                  No documents uploaded yet
                </td>
              </tr>
            )}

            {/* Loading state */}
            {loading && (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-black/50 dark:text-white/50"
                >
                  Uploading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="grid gap-4 md:hidden">
        {documents.map((file) => (
          <div
            key={file.id}
            className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800 p-4 shadow-sm"
          >
            <p className="font-semibold text-black dark:text-white mb-1">
              {file.name}
            </p>
            <p className="text-sm text-black/60 dark:text-white/60">
              <span className="font-medium">Size:</span>{" "}
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <p className="text-sm text-black/60 dark:text-white/60">
              <span className="font-medium">Type:</span>{" "}
              {file.type?.split("/")[1]?.toUpperCase() || "N/A"}
            </p>
            <p className="text-sm text-black/60 dark:text-white/60">
              <span className="font-medium">Date:</span>{" "}
              {new Date(file.uploadDate).toLocaleDateString()}
            </p>
            <button
              onClick={() => onDelete(file.id)}
              className="mt-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        ))}

        {/* Empty state */}
        {documents.length === 0 && !loading && (
          <div className="text-center text-black/50 dark:text-white/50">
            No documents uploaded yet
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center text-black/50 dark:text-white/50">
            Uploading...
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentList;
