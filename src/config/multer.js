// https://blog.rocketseat.com.br/upload-de-imagens-no-s3-da-aws-com-node-js/
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// const multerS3 = require("multer-s3");




module.exports = {
  // dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  dest: path.resolve(__dirname,  "..", "tmp", "uploads"),
  storage:  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
  limits: {
    fileSize: process.env.FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = process.env.ALLOWED_MIMES

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
  preservePath: false
};