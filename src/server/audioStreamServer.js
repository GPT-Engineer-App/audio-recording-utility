const express = require('express');
const fs = require('fs');
const path = require('path');
const splitAudio = require('../utils/splitAudio');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;
const AUDIO_DIR = path.join(__dirname, 'audio');
const STREAMED_AUDIO_PATH = path.join(AUDIO_DIR, 'streamed_audio.mp3');

app.use(express.json());
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AUDIO_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

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

app.post('/split', upload.single('audioFile'), (req, res) => {
  const { segmentLength } = req.body;
  const inputFile = req.file.path;
  const outputDir = AUDIO_DIR;

  splitAudio(inputFile, segmentLength, outputDir)
    .then((message) => res.status(200).send(message))
    .catch((err) => res.status(500).send(err.message));
});

app.get('/api/audio-devices', (req, res) => {
  exec('arecord -l', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error fetching audio devices: ${stderr}`);
      return res.status(500).send('Error fetching audio devices');
    }
    const devices = stdout.split('\n').filter(line => line.includes('card')).map(line => line.trim());
    res.json({ devices });
  });
});

app.get('/api/save-directory', (req, res) => {
  const saveDirectory = '/path/to/save/directory'; // Replace with actual logic to fetch save directory
  res.json({ directory: saveDirectory });
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

// Automatically save streamed audio data when the server starts
const saveStreamedAudio = () => {
  const audioStream = fs.createWriteStream(STREAMED_AUDIO_PATH, { flags: 'a' });
  io.on('connection', (socket) => {
    socket.on('audio-data', (data) => {
      audioStream.write(Buffer.from(data, 'base64'), (err) => {
        if (err) {
          console.error('Error writing audio data:', err);
        }
      });
    });
  });
};

server.listen(PORT, 'localhost', () => {
  console.log(`Audio stream server is running on http://localhost:${PORT}`);
  saveStreamedAudio();
});