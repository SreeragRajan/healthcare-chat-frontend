// --------------------
// Mock Document Storage
// --------------------
let mockDocuments = [
  {
    id: "1",
    name: "discharge_summary.pdf",
    type: "application/pdf",
    size: 245760,
    uploadDate: "2024-09-20T10:30:00Z",
    status: "processed",
  },
];

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

// --------------------
// Intercept fetch calls
// --------------------
const originalFetch = window.fetch;
window.fetch = async (url, options = {}) => {
  // GET /api/documents
  if (url === "/api/documents" && (!options.method || options.method === "GET")) {
    return simulateResponse([...mockDocuments]);
  }

  // POST /api/documents/upload
  if (url === "/api/documents/upload" && options.method === "POST") {
    const file = JSON.parse(options.body);
    const newDoc = {
      id: Date.now().toString(),
      ...file,
      uploadDate: new Date().toISOString(),
      status: "processed",
    };
    mockDocuments.push(newDoc);
    return simulateResponse(newDoc, 800);
  }

  // DELETE /api/documents/{id}
  if (url.startsWith("/api/documents/") && options.method === "DELETE") {
    const id = url.split("/").pop();
    mockDocuments = mockDocuments.filter((d) => d.id !== id);
    return simulateResponse({ success: true, id });
  }

  // fallback → real fetch
  return originalFetch(url, options);
};
