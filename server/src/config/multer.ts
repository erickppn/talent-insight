import multer, { Options } from "multer";
import path from "path";
import crypto from "crypto";

const allowedMimes = [
  //allowed image types
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/gif",

  //allowed video types
  "video/webm",
  "video/ogg",
  "video/mpeg",
  "video/mp4"
];

export const multerConfg: Options = {
  dest: path.resolve(__dirname, "../../tmp/uploads"),

  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      cb(null, path.resolve(__dirname, "../../tmp/uploads/"));
    },

    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, file.filename);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),

  fileFilter: (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  }
}
