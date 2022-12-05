import multer from "multer";

const storage = multer.diskStorage({
  // destination specifies the directory where Multer will save the encoded files
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
export default upload;
