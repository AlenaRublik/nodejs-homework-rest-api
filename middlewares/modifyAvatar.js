import fs from "fs/promises";
import Jimp from "jimp";

import { HttpError } from "../helpers/index.js";

const modifyAvatar = async (req, res, next) => {
  if (!req.file) return next(HttpError(400, "No file provided"));

  const { path } = req.file;

  try {
    const uploadedFile = await Jimp.read(path);

    uploadedFile.cover(250, 250).write(path);
  } catch {
    await fs.unlink(path);

    return next(HttpError(400, "Bad file"));
  }

  next();
};

export default modifyAvatar;