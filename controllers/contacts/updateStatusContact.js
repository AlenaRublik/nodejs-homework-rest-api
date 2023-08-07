import { Contact } from "../../models/index.js";
import {HttpError} from "../../helpers/index.js";

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw HttpError(404);

  res.json(result);
};

export default updateStatusContact;
