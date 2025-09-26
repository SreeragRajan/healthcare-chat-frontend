// Hook in both mock layers
import "./documents";
import "./chat";

// API helper functions
export const getDocuments = async () => (await fetch("/api/documents")).json();

export const uploadDocument = async (file) =>
  (
    await fetch("/api/documents/upload", {
      method: "POST",
      body: JSON.stringify(file),
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
