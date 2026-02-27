import pdfjs from "pdfjs-dist/legacy/build/pdf.js";
import fetch from "node-fetch";

const { getDocument } = pdfjs;

export const extractPdfText = async (fileUrl) => {
  try {
    // download pdf from S3
    const res = await fetch(fileUrl);
    const arrayBuffer = await res.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    const pdf = await getDocument({
      data,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    }).promise;

    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const pageText = content.items
        .map(item => item.str || "")
        .join(" ");

      text += pageText + "\n";
    }

    return text;

  } catch (err) {
    console.error("PDF PARSE ERROR:", err);
    return "";
  }
};