import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";

export const uploadToS3 = async (file) => {
  try {
    if (!file || !file.buffer) {
      throw new Error("Invalid file buffer");
    }

    const key = `documents/${Date.now()}-${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  } catch (error) {
    console.error("S3 UPLOAD ERROR:", error);
    throw error;
  }
};