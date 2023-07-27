import express from "express";
import bodyParser from "body-parser";

import youtubeLink from "./routes/youtubeLink/youtubeLink.js";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/youtube", youtubeLink);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}/`);
});
