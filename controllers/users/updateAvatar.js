import path from "path";
import fs from "fs/promises";
import { User } from "../../models/index.js";

const avatarsDirPath = path.resolve("public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id, avatarURL: oldAvatarURL } = req.user;

  const { path: tempFilePath, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;

  const resultFilePath = path.join(avatarsDirPath, fileName);

  await fs.rename(tempFilePath, resultFilePath);

  const newAvatarURL = path.join("avatars", fileName);

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatarURL: newAvatarURL },
    {
      new: true,
    }
  );

  // removing old avatar after updating
  const oldAvatarPath = path.join(process.cwd(), "public", oldAvatarURL);

  try {
    await fs.access(oldAvatarPath);

    if (oldAvatarPath !== resultFilePath) await fs.unlink(oldAvatarPath);
  } catch {
    console.log("--- old avatar image not found ---");
  }

  res.json({ avatarURL: updatedUser.avatarURL });
};

export default updateAvatar;