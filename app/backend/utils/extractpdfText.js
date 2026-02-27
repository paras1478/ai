import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

export const extractPdfText = async (filePath) => {
  try {
    const data = new Uint8Array(fs.readFileSync(filePath));

    const loadingTask = pdfjsLib.getDocument({
      data,
      disableWorker: true,      // ⭐ THIS is the real fix
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    });

    const pdf = await loadingTask.promise;

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
    throw err;
  }
};