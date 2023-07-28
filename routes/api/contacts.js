import express from "express";
import ctrl from "../../controllers/contacts/index.js";
import {validateBody, isEmptyBody, isValidId} from "../../middlewares/index.js";
import {addSchema, updateFavoriteSchema} from "../../schemas/index.js";

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", isEmptyBody, validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContactById);

router.put("/:contactId", isValidId, isEmptyBody, validateBody(addSchema), ctrl.updateContactById);

router.patch("/:contactId/favorite", isValidId, isEmptyBody, validateBody(updateFavoriteSchema), ctrl.updateStatusContact);

export default router;