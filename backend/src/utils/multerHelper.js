// multerHelper.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set the destination folder path
const uploadDir = "uploads/";

// Check if the 'uploads' directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create directory with subdirectories if needed
}

// Set the storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Upload destination
  },
  filename: function (req, file, cb) {
    // Extract subject from request body (fallback to "unknown")
    const subject = (req.body?.subject || "unknown").toLowerCase();

    // Remove spaces and keep original filename without extension
    const originalName = path.parse(file.originalname).name.replace(/\s+/g, "_");

    // File extension
    const ext = path.extname(file.originalname);

    // Timestamp
    const timestamp = Date.now();

    // Final format: subject_originalfilename_timestamp.extension
    const finalName = `${subject}_${originalName}_${timestamp}${ext}`;

    cb(null, finalName);
  },
});

// File filter (only images allowed)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Multer setup
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});

module.exports = upload;
