import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId).populate(
    "owner",
    "email subscription"
  );

  if (!result) throw HttpError(404);

  res.json(result);
};

export default getContactById;
