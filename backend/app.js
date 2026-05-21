const express = require('express');
const cors = require('cors');
const app = express();
const ffmpeg = require('fluent-ffmpeg');
const { upload } = require('./config');
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/upload', upload.single('video'), (req, res) => {
  const filename = `${Date.now()}_audio.mp3`;
  const outputPath = path.join(__dirname, 'converts', filename);

  ffmpeg(req.file.path)
    .noVideo()
    .audioCodec('libmp3lame') 
    .save(outputPath)
    .on('end', () => {
      console.log('Conversion done:', outputPath);
      res.download(outputPath, filename, (err) => {
        // Clean up uploaded file and converted file after sending response
        fs.unlink(req.file.path, () => {});
        fs.unlink(outputPath, () => {});
      });  
    })
    .on('error', (err) => {
      console.error('FFmpeg error:', err.message);
      res.status(500).json({ error: err.message });
    });
});


app.get('/', (req, res) => {
  res.send('welcome to video to audio convertor api');
})

module.exports = app;