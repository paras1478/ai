import pkg from "pdf-parse";

const pdf = pkg.default || pkg;

const extractPdfText = async (fileBuffer) => {
  try {
    const data = await pdf(fileBuffer);

    if (!data?.text || data.text.trim().length === 0) {
      return {
        success: false,
        text: "",
        message: "No readable text found"
      };
    }

    return {
      success: true,
      text: data.text
    };

  } catch (err) {
    console.error("PDF PARSE ERROR:", err.message);
    return {
      success: false,
      text: "",
      message: "Failed to parse PDF"
    };
  }
};

export default extractPdfText;