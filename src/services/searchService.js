import { getDocuments } from "./documentsService";

export async function searchDocs(keyword) {
  const docs = await getDocuments();
  keyword = keyword.toLowerCase();

  for (let doc of docs) {
    if (doc.content.toLowerCase().includes(keyword)) {
      const idx = doc.content.toLowerCase().indexOf(keyword);
      const snippet = doc.content.substring(
        Math.max(0, idx - 50),
        idx + 200
      );
      return `Found in ${doc.name}: ...${snippet}...`;
    }
  }
  return "No relevant information found in uploaded documents.";
}
