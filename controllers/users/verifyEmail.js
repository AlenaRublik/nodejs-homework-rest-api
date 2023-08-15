import { User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw HttpError(404, "User not found");

  await User.findByIdAndUpdate(user._id, {
    verificationToken: "",
    verify: true,
  });

  res.json({ message: "Verification successful" });
};

export default verifyEmail;