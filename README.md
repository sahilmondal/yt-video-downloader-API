# YouTube Video Downloader API using NODE.JS & EXPRESS

This is a backend API project that allows users to download videos from YouTube. It provides a simple server built with Node.js and Express to handle video downloads in MP4 format for YouTube.

## Features

- Download YouTube videos in MP4 format.
- Download Youtube Shorts in MP4 format.
- Download Youtube videos in MP3 format(upcoming feature).
- 
## How to Use

Follow the steps below to set up and run the API on your local machine:

1. **Clone the Repository:**

   Clone this repository to your local machine using the following command:
 git clone https://github.com/your-username/youtube-instagram-downloader-api.git


2. **Install Dependencies:**

Navigate to the project folder and install the required dependencies using npm:

```bash
cd youtube-instagram-downloader-api
npm install
Start the Node.js server using the following command: npm start

The server will run on `http://localhost:3000` by default.
```
4. **API Endpoints:**

- `POST /youtube`: Send a POST request with a JSON payload containing the `videoUrl` property to download a YouTube video. The server will respond with the MP4 video file.
- `POST /audio`: Send a POST request with a JSON payload containing the `videoUrl` property to download a YouTube mp3. The server will respond with the Mp3 audio file.

  5. **Example Usage:**

Send a POST request to `http://localhost:3000/download/youtube` with the following JSON payload to download a YouTube video:

```json
{
  "videoUrl": "https://www.youtube.com/watch?v=example_video_id"
}
```
## Legal Considerations

Downloading videos from YouTube may violate their terms of service and copyright laws. Use this API responsibly and ensure that you have the necessary permissions to download and use the videos.
Contributions

Contributions to this project are welcome! If you find any issues or have ideas for improvements, feel free to open a pull request or an issue.
