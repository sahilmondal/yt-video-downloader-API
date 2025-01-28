import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import youtubeLink from "./routes/youtubeLink/youtubeLink.js";
import audio from "./routes/youtubeLink/audio.js";
import initializeServer from "./utils/init.js";

// Initialize environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.ORIGIN || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors(corsOptions));

// Set higher timeout for large files
app.use((req, res, next) => {
  res.setTimeout(300000); // 5 minutes
  next();
});

// Routes
app.post("/youtube", youtubeLink);
app.post("/audio", audio);

// Healthcheck endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    details: err.message,
  });
});

// Initialize server and start listening
const PORT = process.env.PORT || 3000;

initializeServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize server:", err);
    process.exit(1);
  });
