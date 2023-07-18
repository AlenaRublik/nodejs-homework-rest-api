import fs from "fs/promises";
import path from "path";
import HttpError from "../helpers/HttpError.js";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);

  return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();

  const contactById = allContacts.find((item) => item.id === contactId);

  return contactById || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const index = allContacts.findIndex((item) => item.id === contactId);

  if (index === -1) return null;

  const [removedContact] = allContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 4));

  return removedContact;
};

const addContact = async (body) => {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 4));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();

  const index = allContacts.findIndex((item) => item.id === contactId);

  if (index === -1) return null;

  const updatedContact = (allContacts[index] = {
    id: contactId,
    ...body,
  });

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 4));

  return updatedContact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};