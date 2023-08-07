import { Contact } from "../../models/index.js";
import {HttpError} from "../../helpers/index.js";

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) throw HttpError(404);

  res.json({ message: "contact deleted" });
};

export default deleteContactById;
