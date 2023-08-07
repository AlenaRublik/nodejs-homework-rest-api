import { Contact } from "../../models/index.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  const filter = favorite ? { favorite } : {};

  const result = await Contact.find(
    { owner, ...filter },
    {},
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");

  res.json(result);
};

export default getAllContacts;
