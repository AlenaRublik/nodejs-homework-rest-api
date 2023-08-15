// Libs
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Models
import { User } from "../../models/index.js";
// Helpers
import { HttpError } from "../../helpers/index.js";
import "dotenv/config";
const { JWT_SECRET_KEY } = process.env;

const login = async (req, res) => {
  console.log(JWT_SECRET_KEY);
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "Email or password is wrong");
  
  if (!user.verify) throw HttpError(403, "Email is not verified");

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) throw HttpError(401, "Email or password is wrong");

  const jwtPayload = { id: user._id };

  const token = jwt.sign(jwtPayload, JWT_SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user.id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export default login;
