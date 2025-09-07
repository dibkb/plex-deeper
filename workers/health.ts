import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "plex-deeper-queue-workers",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Health check server running on port ${PORT}`);
});
