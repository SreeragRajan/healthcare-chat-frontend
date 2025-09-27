// --------------------
// Mock Chat Storage
// --------------------
let mockMessages = JSON.parse(localStorage.getItem("mockMessages")) || [];

// Mock document storage (for search)
let documentStore = JSON.parse(localStorage.getItem("mockDocuments")) || [];

// Helper: simulate fetch response
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
// Keyword + document search
// --------------------
const handleUserMessage = (message) => {
  let response = "I'm not sure, please check your document.";

  const msgLower = message.toLowerCase();
  if(msgLower.includes("hello") || msgLower.includes("hi")) {
    response = "Hello! How can I assist you with your medical documents today?";
  }
  else if (msgLower.includes("medication") || msgLower.includes("prescribed")) {
    response = searchDocs("medication");
  } else if (msgLower.includes("lab") || msgLower.includes("result")) {
    response = searchDocs("lab results");
  } else if (msgLower.includes("diagnosis")) {
    response = searchDocs("diagnosis");
  } else if (msgLower.includes("allergies")) {
    response = searchDocs("allergy");
  } else if (msgLower.includes("treatment")) {
    response = searchDocs("treatment plan");
  } else {
    response = searchDocs(message);
  }

  return response;
};

const searchDocs = (keyword) => {
  const lowerKeyword = keyword.toLowerCase();

  for (let doc of Object.values(documentStore)) {
    const contentLower = doc.content.toLowerCase();
    const index = contentLower.indexOf(lowerKeyword);

    if (index !== -1) {
      // Extract snippet around the keyword (100 chars before and after)
      const start = Math.max(0, index - 10);
      const end = Math.min(doc.content.length, index + 200);
      const snippet = doc.content.substring(start, end);

      return `Found in ${doc.name}: ...${snippet}...`;
    }
  }

  return "No relevant information found in uploaded documents.";
};


// --------------------
// Intercept fetch calls
// --------------------
const originalFetch = window.fetch;
window.fetch = async (url, options = {}) => {
  // GET chat history
  if (url === "/api/chat/history" && (!options.method || options.method === "GET")) {
    return simulateResponse([...mockMessages]);
  }

  // POST chat message
  if (url === "/api/chat/message" && options.method === "POST") {
    const { content } = JSON.parse(options.body);

    const userMsg = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    // Generate system response using keyword + document search
    const systemMsg = {
      id: (Date.now() + 1).toString(),
      type: "system",
      content: handleUserMessage(content),
      timestamp: new Date().toISOString(),
    };

    mockMessages.push(userMsg, systemMsg);
    localStorage.setItem("mockMessages", JSON.stringify(mockMessages));

    return simulateResponse(systemMsg, 1000);
  }

  return originalFetch(url, options);
};
