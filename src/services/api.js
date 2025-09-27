import "./documents";
import "./chat";
import { uploadDocument as parseFile } from "./documentsService.js";

// Fetch documents and include mock document
export const getDocuments = async () => {
  try {
    // Fetch from api
    const documents = await (await fetch("/api/documents")).json();

    // Load mock document
    const mockResponse = await fetch("/documents/mock-report.txt");
    const mockContent = await mockResponse.text();

    const mockDocument = {
      id: "mock-1",
      name: "Mock Health Report",
      content: mockContent,
    };

    // Add mock document to the list if not already present
    const exists = documents.some((doc) => doc.id === mockDocument.id);
    if (!exists) documents.unshift(mockDocument);

    return documents;
  } catch (err) {
    console.error("Failed to fetch documents:", err);
    return [];
  }
};

export const uploadDocument = async (file) =>
  (
    await fetch("/api/documents/upload", {
      method: "POST",
      body: file, 
    })
  ).json();

export const deleteDocument = async (id) =>
  (await fetch(`/api/documents/${id}`, { method: "DELETE" })).json();

export const getChatHistory = async () =>
  (await fetch("/api/chat/history")).json();

export const sendMessage = async (content) =>
  (
    await fetch("/api/chat/message", {
      method: "POST",
      body: JSON.stringify({ content }),
    })
  ).json();

// Parse document (for previews)
export const parseDocument = async (file) => {
  try {
    const parsedDoc = await parseFile(file);
    return parsedDoc.content;
  } catch (err) {
    console.error("Failed to parse document:", err);
    return "";
  }
};
