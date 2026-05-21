const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(
        __dirname,
        "uploads"
      ));
  },
  filename: (req, file, cb) => {
    // const ext = path.extname(file.originalname); // 👈 get extension
    cb(null, Math.round(Math.random() * 1000) + file.originalname); // 👈 add extension
  },
});

module.exports.upload = multer({ storage: storage });