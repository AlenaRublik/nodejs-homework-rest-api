import multer from "multer";
import path from "path";

import { HttpError } from "../helpers/index.js";

import { allowedImagesMimeTypes } from "../constants/constants.js";

const tempDirPath = path.resolve("temp");

const storage = multer.diskStorage({
  destination: tempDirPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const isAllowed = allowedImagesMimeTypes.includes(file.mimetype);

  if (!isAllowed) return cb(HttpError(400, "Invalid file type."));

  cb(null, true);
};

const uploadAvatar = multer({ storage, fileFilter });

export default uploadAvatar;