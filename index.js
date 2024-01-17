import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import youtubeLink from "./routes/youtubeLink/youtubeLink.js";
const corsOptions = {
  origin: "http://localhost:3000",
  // credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.post("/youtube", youtubeLink);

const PORT = process.env.PORT || 5699;
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}/`);
});
