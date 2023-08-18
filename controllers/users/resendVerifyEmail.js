import { User } from "../../models/index.js";
import { HttpError, sendEmail } from "../../helpers/index.js";

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, "User not found");

  if (user.verify) throw HttpError(404, "Verification has already been passed");

  const verificationEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify your email</a>`,
  };

  await sendEmail(verificationEmail);

  res.json({
    message: "Verification email sent",
  });
};

export default resendVerifyEmail;