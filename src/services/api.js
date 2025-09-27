import "./documents";
import "./chat";
import { uploadDocument as parseFile } from "./documentsService.js";

export const getDocuments = async () => (await fetch("/api/documents")).json();

export const uploadDocument = async (file) =>
  (await fetch("/api/documents/upload", {
    method: "POST",
    body: file, // ✅ send File directly
  })).json();

export const deleteDocument = async (id) =>
  (await fetch(`/api/documents/${id}`, { method: "DELETE" })).json();

export const getChatHistory = async () =>
  (await fetch("/api/chat/history")).json();

export const sendMessage = async (content) =>
  (await fetch("/api/chat/message", {
    method: "POST",
    body: JSON.stringify({ content }),
  })).json();

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
