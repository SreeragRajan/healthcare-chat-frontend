// src/services/documents.js
import { uploadDocument as parseFile } from "./documentsService.js";

// Load from localStorage
let mockDocuments = JSON.parse(localStorage.getItem("mockDocuments")) || [];

// Save helper
function saveDocuments() {
  localStorage.setItem("mockDocuments", JSON.stringify(mockDocuments));
}

// Simulate fetch response
function simulateResponse(data, delay = 500) {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        ),
      delay
    )
  );
}

// Intercept fetch
const originalFetch = window.fetch;
window.fetch = async (url, options = {}) => {
  // GET documents
  if (url === "/api/documents" && (!options.method || options.method === "GET")) {
    return simulateResponse([...mockDocuments]);
  }

  // POST upload
  if (url === "/api/documents/upload" && options.method === "POST") {
    const file = options.body instanceof File ? options.body : null;
    if (!file) return simulateResponse({ error: "No file provided" }, 400);

    // Parse content
    const parsed = await parseFile(file);

    const newDoc = {
      id: parsed.id,
      name: parsed.name,
      type: parsed.type,
      size: parsed.size,
      uploadDate: parsed.uploadDate,
      status: parsed.status,
      content: parsed.content,
    };

    mockDocuments.push(newDoc);
    saveDocuments();
    return simulateResponse(newDoc, 800);
  }

  // DELETE document
  if (url.startsWith("/api/documents/") && options.method === "DELETE") {
    const id = url.split("/").pop();
    mockDocuments = mockDocuments.filter((d) => d.id !== id);
    saveDocuments();
    return simulateResponse({ success: true, id });
  }

  return originalFetch(url, options);
};
