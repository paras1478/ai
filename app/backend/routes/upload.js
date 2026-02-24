import express from "express";
import { upload } from "../upload.js";

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
  res.json({
    url: req.file.location,
  });
});

export default router;