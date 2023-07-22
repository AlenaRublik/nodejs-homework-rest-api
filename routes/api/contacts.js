import express from "express";
import ctrl from "../../controllers/contacts.js";
import validateBody from "../../middlewares/validateBody.js";
import addSchema from "../../schemas/contacts.js";

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put("/:contactId", validateBody(addSchema), ctrl.updateContactById);

export default router;