// --------------------
// Mock Chat Storage
// --------------------
let mockMessages = [
  {
    id: "1",
    type: "user",
    content: "What medications were prescribed?",
    timestamp: "2024-09-20T11:00:00Z",
  },
  {
    id: "2",
    type: "system",
    content:
      "Based on the discharge summary, the following medications were prescribed...",
    timestamp: "2024-09-20T11:00:15Z",
    sources: ["discharge_summary.pdf - Page 2"],
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
  // GET /api/chat/history
  if (url === "/api/chat/history" && (!options.method || options.method === "GET")) {
    return simulateResponse([...mockMessages]);
  }

  // POST /api/chat/message
  if (url === "/api/chat/message" && options.method === "POST") {
    const { content } = JSON.parse(options.body);
    const userMsg = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    const systemMsg = {
      id: (Date.now() + 1).toString(),
      type: "system",
      content: `Response to: "${content}"`,
      timestamp: new Date().toISOString(),
      sources: ["discharge_summary.pdf - Page 1"],
    };

    mockMessages.push(userMsg, systemMsg);
    return simulateResponse(systemMsg, 1000);
  }

  // fallback → real fetch
  return originalFetch(url, options);
};
