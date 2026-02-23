import express from "express";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/upload-pdf", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Upload failed" });
  }

  res.json({
    message: "Uploaded successfully",
    url: req.file.location,   
    fileName: req.file.key
  });
});

export default router;