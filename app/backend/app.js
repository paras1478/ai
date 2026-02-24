import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API RUNNING");
});

app.get("/ping", (req, res) => {
  res.json({ message: "Server is alive" });
});

export default app;