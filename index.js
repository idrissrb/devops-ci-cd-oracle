const express = require("express");
const app = express();

// Use port from env var (for Docker), fallback to 3000 locally
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from CI/CD pipeline on Oracle Cloud VPS! 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
