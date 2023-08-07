import { Contact } from "../../models/index.js";

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");

  res.json(result);
};

export default getAllContacts;
