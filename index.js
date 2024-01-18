import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import youtubeLink from "./routes/youtubeLink/youtubeLink.js";
import test from "./routes/youtubeLink/test.js";

dotenv.config();
const corsOptions = {
  origin: process.env.ORIGIN,
  // credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.post("/youtube", youtubeLink);
app.post("/test", test);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}/`);
});
