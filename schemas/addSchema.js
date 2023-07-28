import Joi from "joi";

const addSchema = Joi.object({
    name: Joi.string()
      .required()
      .messages({ "any.required": `"name" must be exist` }),
    phone: Joi.string()
      .required()
      .messages({ "any.required": `"phone" must be exist` }),
    email: Joi.string()
      .required()
      .messages({ "any.required": `"email" must be exist` }),
    favorite: Joi.boolean(),
  });

  export default addSchema;