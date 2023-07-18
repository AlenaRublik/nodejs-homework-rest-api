import contactsAPI from "../models/contacts.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const result = await contactsAPI.listContacts();

  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsAPI.getContactById(contactId);

  if (!result) throw HttpError(404);

  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contactsAPI.addContact(req.body);

  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsAPI.removeContact(contactId);

  if (!result) throw HttpError(404);

  res.json({ message: "contact deleted" });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsAPI.updateContact(contactId, req.body);

  if (!result) throw HttpError(404);

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
};