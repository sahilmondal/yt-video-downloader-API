# YouTube Video/Audio Downloader API

A Node.js API for downloading YouTube videos and audio with preview support. Supports both youtube.com and youtu.be URLs.

## Prerequisites

1. Node.js 14+ installed

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a .env file with:

```env
PORT=3000
ORIGIN=http://localhost:3000
```

4. Start the server:

```bash
npm start
```

## API Endpoints

### 1. Video Download `/youtube`

#### Get Video Information

```http
POST /youtube
Content-Type: application/json

{
  "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "getInfo": true
}
```

Or using youtu.be format:

```http
{
  "videoUrl": "https://youtu.be/VIDEO_ID",
  "getInfo": true
}
```

Response:

```json
{
  "title": "Video Title",
  "duration": 300,
  "thumbnail": "thumbnail_url",
  "description": "video description",
  "formats": [
    {
      "format_id": "22",
      "ext": "mp4",
      "quality": "720p",
      "resolution": "1280x720",
      "filesize": 12345678
    }
  ]
}
```

#### Download/Stream Video

```http
POST /youtube
Content-Type: application/json

{
  "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "quality": "best[ext=mp4]"  // Optional: format selection
}
```

### 2. Audio Download `/audio`

#### Get Audio Information

```http
POST /audio
Content-Type: application/json

{
  "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "getInfo": true
}
```

Response:

```json
{
  "title": "Video Title",
  "duration": 300,
  "thumbnail": "thumbnail_url",
  "description": "video description",
  "formats": [
    {
      "format_id": "140",
      "ext": "m4a",
      "quality": "128k",
      "filesize": 12345678,
      "asr": 44100
    }
  ]
}
```

#### Download/Stream Audio

```http
POST /audio
Content-Type: application/json

{
  "videoUrl": "https://youtu.be/VIDEO_ID"
}
```

## URL Support

The API accepts YouTube URLs in both formats:

- Standard format: `https://www.youtube.com/watch?v=VIDEO_ID`
- Short format: `https://youtu.be/VIDEO_ID`

Parameters in URLs (like `?si=...`) are automatically handled.

## Features

- Support for any length videos
- Support for both youtube.com and youtu.be URLs
- Video/audio preview support in Postman or browser
- Video format selection
- High-quality audio extraction
- Range request support for streaming
- Progress tracking via Content-Length
- Proper MIME types
- Error handling
- Sanitized filenames
- Cache control headers

## Preview Support

Both video and audio endpoints support:

- Direct preview in Postman
- HTML5 video/audio player integration
- Streaming with range requests
- Progress tracking
- Proper content type headers

### Using in Frontend

Example HTML5 video player:

```html
<video controls>
  <source src="http://localhost:3000/youtube" type="video/mp4" />
</video>
```

Example HTML5 audio player:

```html
<audio controls>
  <source src="http://localhost:3000/audio" type="audio/mp3" />
</audio>
```

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error type",
  "details": "Detailed error message"
}
```

Common status codes:

- 400: Invalid URL or parameters
- 500: Server or download errors
- 206: Partial content (for range requests)

## Health Check

GET `/health` returns server status:

```json
{
  "status": "ok"
}
```

## Notes

- Don't try to delete the /downloads folder as it contains the big videos(temporarily) before sending it to the client.
- Don't host it on vercel/netlify as response time i usually more than 10s use locally or in a VPS instead.
- Files are streamed directly for preview in browser/Postman
- Support for range requests enables seeking in media players
- Temporary files are automatically cleaned up after streaming
- Server timeout is set to 5 minutes for large files
- All YouTube URL formats are supported (youtube.com and youtu.be)
