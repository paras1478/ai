import fs from "fs";
import pdfjs from "pdfjs-dist/legacy/build/pdf.js";

const { getDocument } = pdfjs;

export const extractPdfText = async (filePath) => {
  const data = new Uint8Array(fs.readFileSync(filePath));

  const pdf = await getDocument({
    data,
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: true
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
};