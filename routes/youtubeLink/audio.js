import youtubedl from "youtube-dl-exec";
import { createReadStream } from "fs";
import { unlink } from "fs/promises";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-z0-9]/gi, "_");
};

const isValidYoutubeUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return (
      (urlObj.hostname === "www.youtube.com" ||
        urlObj.hostname === "youtube.com" ||
        urlObj.hostname === "youtu.be") &&
      (urlObj.pathname.includes("/watch") || urlObj.hostname === "youtu.be")
    );
  } catch {
    return false;
  }
};

const audio = async (req, res) => {
  let tempFilePath = null;

  try {
    const { videoUrl, getInfo } = req.body;

    if (!videoUrl || !isValidYoutubeUrl(videoUrl)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid YouTube URL. Please provide a valid youtube.com or youtu.be URL",
        });
    }

    // Get video info
    const info = await youtubedl(videoUrl, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    });

    // If only info is requested, return audio formats
    if (getInfo) {
      const formats = info.formats
        .filter((f) => f.acodec !== "none" && f.vcodec === "none")
        .map((f) => ({
          format_id: f.format_id,
          ext: f.ext,
          quality: f.quality || "unknown",
          filesize: f.filesize || "unknown",
          asr: f.asr || "unknown",
        }));

      return res.json({
        title: info.title,
        duration: info.duration,
        thumbnail: info.thumbnail,
        description: info.description,
        formats,
      });
    }

    // Create unique filename
    const filename = sanitizeFilename(info.title) + ".mp3";
    tempFilePath = path.join(__dirname, "..", "..", "downloads", filename);

    // Set up download options for best audio quality
    const options = {
      extractAudio: true,
      audioFormat: "mp3",
      audioQuality: 0, // Best quality
      output: tempFilePath,
      noWarnings: true,
      noCallHome: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    };

    // Download the audio
    await youtubedl(videoUrl, options);

    // Set headers for preview
    res.header("Content-Type", "audio/mp3");
    res.header("Accept-Ranges", "bytes");
    res.header("Cache-Control", "no-cache");

    // Handle range requests for better streaming
    const stat = await fs.promises.stat(tempFilePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      res.status(206);
      res.header("Content-Range", `bytes ${start}-${end}/${fileSize}`);
      res.header("Content-Length", chunksize);

      const stream = createReadStream(tempFilePath, { start, end });
      stream.pipe(res);

      stream.on("end", async () => {
        // Clean up temp file after streaming
        try {
          await unlink(tempFilePath);
        } catch (err) {
          console.error("Error deleting temp file:", err);
        }
      });
    } else {
      // No range header - send entire file
      res.header("Content-Length", fileSize);

      const stream = createReadStream(tempFilePath);
      stream.pipe(res);

      stream.on("end", async () => {
        // Clean up temp file after streaming
        try {
          await unlink(tempFilePath);
        } catch (err) {
          console.error("Error deleting temp file:", err);
        }
      });
    }
  } catch (error) {
    // Clean up temp file if it exists
    if (tempFilePath) {
      try {
        await unlink(tempFilePath);
      } catch (err) {
        console.error("Error deleting temp file:", err);
      }
    }

    console.error("Download error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Failed to process YouTube audio",
        details: error.message,
      });
    }
  }
};

export default audio;
