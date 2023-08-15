import Joi from "joi";

import { emailRegexp } from "../constants/constants.js";
const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
export default userEmailSchema;
