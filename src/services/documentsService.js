// src/services/documentsService.js
import * as pdfjsLib from "pdfjs-lib";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

let documents = []; // in-memory storage for parsed content

// Extract text from PDF
export async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((s) => s.str).join(" ") + "\n";
  }
  return text;
}

// Extract text from DOCX
export async function extractDocxText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const { value } = await mammoth.extractRawText({ arrayBuffer });
  return value;
}

// Extract text from TXT
export async function extractTxtText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// Parse document
export async function uploadDocument(file) {
  let content = "";

  if (file.type === "application/pdf") {
    content = await extractPdfText(file);
  } else if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    content = await extractDocxText(file);
  } else if (file.type === "text/plain") {
    content = await extractTxtText(file);
  } else {
    content = "Unsupported file type";
  }

  const newDoc = {
    id: crypto.randomUUID(),
    name: file.name,
    type: file.type,
    size: file.size,
    uploadDate: new Date().toISOString(),
    status: "processed",
    content,
  };

  documents.push(newDoc);
  return newDoc;
}

export async function getDocuments() {
  return documents;
}

export async function deleteDocument(id) {
  documents = documents.filter((d) => d.id !== id);
  return { success: true };
}
