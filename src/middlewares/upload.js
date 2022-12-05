import multer from "multer";

const storage = multer.diskStorage({
  // destination specifies the directory where Multer will save the encoded files
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
export default upload;
