const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure the "uploads" directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Upload to the "uploads" folder
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // Use current timestamp for uniqueness
    const simpleName = file.originalname.replace(/\s+/g, "_"); // Replace spaces with underscores
    cb(null, `${timestamp}-${simpleName}`); // Combine timestamp with the cleaned original filename
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only PNG, JPG, or JPEG are allowed"), false);
  }
}

const upload = multer({ storage, fileFilter });

module.exports = { upload };
