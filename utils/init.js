import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initializeServer = async () => {
  const downloadsDir = path.join(__dirname, "..", "downloads");

  try {
    await mkdir(downloadsDir, { recursive: true });
    console.log("Downloads directory ready:", downloadsDir);
  } catch (err) {
    if (err.code !== "EEXIST") {
      console.error("Error creating downloads directory:", err);
      throw err;
    }
  }
};

export default initializeServer;
