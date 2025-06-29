// File upload middleware
import multer from "multer"
import path from "path"

// Storage: Where to save files and HOW to name them
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/") // Save to uploads folder
  },
  filename: function (req, file, cb) {
    // Unique name: timestamp + original extension (prevents conflicts)
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

// Filter: Only allow images (security)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true) // Accept image files only not a video 
  } else {
    cb(new Error("Only images are allowed"), false) // Reject others
  }
}

// Combine storage + filter
const upload = multer({ storage, fileFilter });
export default upload;
// Usage: upload.single('fieldname'), upload.array('files', 5)