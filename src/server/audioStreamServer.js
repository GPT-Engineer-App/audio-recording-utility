const express = require('express');
const fs = require('fs');
const path = require('path');
const splitAudio = require('../utils/splitAudio');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 3000;
const AUDIO_DIR = path.join(__dirname, 'audio');

app.use(express.json());

app.get('/stream/:filename', (req, res) => {
  const filePath = path.join(AUDIO_DIR, req.params.filename);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

app.post('/split', (req, res) => {
  const { inputFile, segmentDuration } = req.body;
  const outputDir = AUDIO_DIR;

  splitAudio(inputFile, segmentDuration, outputDir)
    .then((message) => res.status(200).send(message))
    .catch((err) => res.status(500).send(err.message));
});

app.post('/save-stream', (req, res) => {
  const { audioData } = req.body;
  const filePath = path.join(AUDIO_DIR, 'streamed_audio.mp3');
  fs.writeFile(filePath, audioData, 'base64', (err) => {
    if (err) {
      return res.status(500).send('Error saving audio');
    }
    res.status(200).send('Audio saved successfully');
  });
});

// Socket.io setup for real-time streaming
const server = createServer(app);
const io = new Server(server);

const applyEqualizer = (audioStream, settings) => {
  // Logic to apply equalizer settings to the audio stream
};

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('equalizer-settings', (settings) => {
    // Apply equalizer settings to the audio stream
    applyEqualizer(audioStream, settings);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, 'localhost', () => {
  console.log(`Audio stream server is running on http://localhost:${PORT}`);
});