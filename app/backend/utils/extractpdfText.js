import pdf from "pdf-parse";

const extractPdfText = async (fileBuffer) => {
  try {
    if (!fileBuffer) {
      throw new Error("No file buffer received");
    }

    const data = await pdf(fileBuffer);

    // Sometimes PDF has no selectable text (scanned image PDF)
    if (!data?.text || data.text.trim().length === 0) {
      return {
        success: false,
        text: "",
        message: "No readable text found (probably scanned PDF)"
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