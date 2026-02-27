import mongoose from "mongoose";

import Document from "../models/document.js";
import Flashcard from "../models/Flashcard.js";
import Quiz from "../models/Quiz.js";

import { extractPdfText } from "../utils/extractpdfText.js";
import { uploadToS3 } from "../utils/s3Upload.js";   

export const uploadDocument = async (req, res) => {
  try {
    const file = req.file;

    if (!file)
      return res.status(400).json({ message: "No file uploaded" });

    if (!file.mimetype.includes("pdf"))
      return res.status(400).json({ message: "Only PDF allowed" });

    const extractedText = await extractPdfText(file.buffer);

    if (!extractedText || extractedText.length < 20) {
      return res.status(400).json({ message: "Could not read PDF text" });
    }

    const fileUrl = await uploadToS3(file);

    const document = await Document.create({
      userId: req.user._id,
      title: req.body.title || file.originalname.replace(/\.pdf$/i, ""),
      fileName: file.originalname,
      filePath: fileUrl,
      fileSize: file.size,
      extractedText,
      status: "ready",
    });

    res.status(201).json(document);

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find({ userId: req.user._id })
      .select("-chunks -extractedText")
      .sort({ createdAt: -1 });

    res.json(documents);
  } catch (error) {
    next(error);
  }
};

export const getDocument = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid document ID" });

    const document = await Document.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!document)
      return res.status(404).json({ error: "Document not found" });

    res.json(document);
  } catch (error) {
    next(error);
  }
};

export const updateDocument = async (req, res, next) => {
  try {
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title: req.body.title },
      { new: true }
    );

    if (!document)
      return res.status(404).json({ error: "Document not found" });

    res.json(document);
  } catch (error) {
    next(error);
  }
};

export const deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!document)
      return res.status(404).json({ error: "Document not found" });

    await Flashcard.deleteMany({ documentId: document._id });
    await Quiz.deleteMany({ documentId: document._id });

    await document.deleteOne();

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};