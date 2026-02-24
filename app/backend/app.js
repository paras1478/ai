app.get("/", (req, res) => {
  res.send("API RUNNING ");
});

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Server is alive" });
});