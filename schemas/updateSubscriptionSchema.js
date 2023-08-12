import Joi from "joi";
import { subscriptionList } from "../constants/constants.js";
const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});
export default updateSubscriptionSchema;