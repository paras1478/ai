import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

export const extractPdfTextFromUrl = async (url) => {
  const pdf = await pdfjsLib.getDocument({
    url,
    disableWorker: true,
    useSystemFonts: true,
  }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    text += content.items.map(i => i.str).join(" ") + "\n";
  }

  return text;
};