import { createRequire } from "module";
const require = createRequire(import.meta.url);

// CommonJS module load
const pdf = require("pdf-parse");

const extractPdfText = async (fileBuffer) => {
  try {
    if (!fileBuffer) {
      return { success: false, text: "", message: "No file buffer" };
    }

    const data = await pdf(fileBuffer);

    if (!data?.text || data.text.trim().length === 0) {
      return {
        success: false,
        text: "",
        message: "No readable text found (scanned PDF)"
      };
    }

    return {
      success: true,
      text: data.text
    };

  } catch (err) {
    console.error("PDF PARSE ERROR:", err);
    return {
      success: false,
      text: "",
      message: "Failed to parse PDF"
    };
  }
};

export default extractPdfText;