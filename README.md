# HealthChat - AI-Powered Healthcare Document Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## **Project Overview**

**HealthChat** is a web application that allows users to upload their medical documents and chat with an AI assistant to gain insights into their health. It provides instant answers, highlights document context, and ensures full privacy by processing data locally.  

**Key Highlights:**
- AI-powered chat with your health documents
- Document context awareness
- Dark/Light theme support
- Mobile responsive interface
- Local data processing for privacy and security

---

## **Screenshots**

**Home / Hero Section**
![Hero Section](./screenshots/hero.png)

**Chat Interface with Document Preview**
![Chat Interface](./screenshots/chat_interface.png)

**Features**
![Features Section](./screenshots/features.png)

**FAQ Section**
![FAQ Section](./screenshots/faqs.png)

---

## **Demo / Live Link**

- **Live Demo:** [Insert your deployed link here]  

---

## **Tech Stack**

- **Frontend:** React, Tailwind CSS, Framer Motion  
- **Icons:** Lucide-react  
- **State Management:** React Context API  
- **Other Libraries:** react-router-dom (routing), pdfjs-Lib(for pdf data extraction), mammoth(for docs data extraction)   

**Reasoning:**  
- React for responsive and component-based architecture  
- Tailwind CSS for modern styling and responsiveness  
- Framer Motion for smooth animations  
- Context API for simple state management  

---

## **Installation & Setup**

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd healthchat

2. **Install dependencies**
```bash
npm install

3. **Run the app**
```bash
npm run dev

4. **Build for production**
```bash
npm run build

--- 

## Folder Structure
/src
  /components    # Reusable components (ChatInterface, MessageBubble, DocumentPreview, etc.)
  /sections         # Route pages (Home, Document, Chat)
  /services      # API calls (fetch documents, send chat messages)
  /context       # Context providers (ThemeContext)
  /assets        # Images, icons, and static files
  App.jsx
  index.jsx

---

## Features
- Upload and preview medical documents
- AI-powered chat with context from documents
- Dark and light theme support
- Responsive design (desktop & mobile)
- Search functionality in chat and documents
- FAQ section
- Smooth animations with Framer Motion

---

## Usage
1. Navigate to the upload page and upload your medical documents.
2. Open chat interface and ask questions about your health records.
3. Use "Preview" (on mobile) to view documents while chatting.
4. Toggle between dark/light mode using the theme button.

---

## Known Issues / Limitations
- AI answers are for informational purposes only, not a substitute for medical advice.
- Some document formats may not fully render.

---

## License
MIT License. See [LICENSE](./LICENSE) for details.
