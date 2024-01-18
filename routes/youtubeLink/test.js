import ytdl from "ytdl-core";
const youtubeLink = async (req, res) => {
  try {
    const videoUrl = req.body.videoUrl;
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      let info = await ytdl.getInfo(videoUrl);
      let format = ytdl.chooseFormat(info.formats, { quality: "136" });
      const videoStream = await ytdl(
        videoUrl,
        { format: format },
        { dlChunkSize: 5 }
      );
      res.header("Content-Disposition", `attachment; filename="video.mp4"`);
      videoStream.pipe(res);
    } else {
      res.status(400).json({ error: "Invalid YouTube URL." });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid YouTube URL or download error." });
  }
};

export default youtubeLink;
