import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";
// Helpers
import { HttpError } from "../../helpers/index.js";

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) throw HttpError(409, "Email in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default register;
