import getAllContacts from "./getAllContacts.js";
import getContactById from "./getContactById.js";
import addContact from "./addContact.js";
import deleteContactById from "./deleteContactById.js";
import updateContactById from "./updateContactById.js";
import updateStatusContact from "./updateStatusContact.js";
import {ctrlWrapper} from "../../helpers/index.js";

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
