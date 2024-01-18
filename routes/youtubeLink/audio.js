import ytdl from "ytdl-core";

const audio = async (req, res) => {
  try {
    const videoUrl = req.body.videoUrl;
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      //   const videoStream = await ytdl(
      //     videoUrl,
      //     { quality: "highest" },
      //     { dlChunkSize: 5 }
      //   );
      res.header(
        "Content-Disposition",
        'attachment; filename="' + new Date() + '-Fizzy.mp3"'
      );
      await ytdl(videoUrl, { format: "mp3", filter: "audioonly" }).pipe(res);
    } else {
      res.status(400).json({ error: "Invalid YouTube URL." });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid YouTube URL or download error." });
  }
};

export default audio;
