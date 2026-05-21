# 🧠 My Learnings in this Project Journey

## FFmpeg 
FFmpeg is a powerful multimedia framework that is used for processing video and audio files. It provides a wide range of functionalities such as converting formats, extracting audio, and manipulating video streams like cutting, merging, and resizing. In this project, I learned how to use FFmpeg to convert video files to audio files.

To use FFmpeg in a Node.js environment, I installed the `fluent-ffmpeg` package, which provides a convenient interface for working with FFmpeg. I learned how to set up FFmpeg in my project and how to use it to extract audio from video files. For example, I used the following code to convert a video file to an MP3 audio file:

Necessary imports
```javascript   
const ffmpeg = require('fluent-ffmpeg');
const path = require('path'); // For handling file paths, to get the exact path of a file.
const fs = require('fs'); // For file system operations like deleting, creating directories etc.
```
Main code for converting video to audio
```javascript
const outputPath = path.join(__dirname, 'converts', `${Date.now()}.mp3`); // This constructs the output path for the 
//converted audio file, using the current timestamp to ensure uniqueness.

ffmpeg(req.file.path)
  .noVideo() // This tells FFmpeg to ignore the video stream and only process the audio stream.
  .audioCodec('libmp3lame') // This specifies the format of the output audio file, in this case, MP3.
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
```

FFmpeg provides a chain of methods that allow you to specify the input file, the output format, and various options for processing the media. In this example, I used `noVideo()` to indicate that I only want to process the audio stream, and `audioCodec('libmp3lame')` to specify that I want the output audio to be in MP3 format. The `save()` method is used to specify the output file path, and event listeners `on('end')` and `on('error')` are set up to handle the completion of the conversion and any errors that may occur.

---
## Multer
Multer is a middleware for handling 'multipart/form-data', which is primarily used for uploading files. In this project, I learned how to use Multer to handle file uploads in a node.js application.

To use Multer, I installed the `multer` package and set it up in my Express application. I created a storage configuration to specify where the uploaded files should be stored and how they should be named. For example:

```javascript
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // const ext = path.extname(file.originalname); // 👈 get extension
    cb(null, Math.round(Math.random() * 1000) + file.originalname); // 👈 add extension
  },
});

module.exports.upload = multer({ storage: storage });
```
- `multer.diskStorage()`: This function is used to configure the storage settings for Multer. It takes an object with two properties: `destination` and `filename`.
- `destination`: This is a function that specifies the directory where the uploaded files will be stored. In this case, it is set to "uploads/". The callback `cb` is called with `null` for the error and the destination path.
- `filename`: This is a function that specifies how the uploaded files should be named.

Now that I have set up Multer, I can use it in my routes to handle file uploads. For example:

```javascript
const {upload} = require('./config')

app.post('/upload', upload.single('video'), (req, res) => {
  // Handle the uploaded file here
  console.log(req.file); // This will contain information about the uploaded file
  res.json({ message: 'File uploaded successfully' });
});
```
In this example, the `upload.single('video')` middleware is used to handle a single file upload with the field name 'video'. The uploaded file's information will be available in `req.file`, which can be used for further processing, such as converting the video to audio using FFmpeg.

