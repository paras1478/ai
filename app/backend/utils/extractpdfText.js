import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export const extractPdfText = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.text || "";
};