import express from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getAdvancedSearch,
} from "../controllers/propertyController";
import { auth } from "../middlewares/auth"; 

const router = express.Router();

router.post("/create", auth, createProperty);
router.get("/", getProperties);
router.get("/search", getAdvancedSearch);
router.get("/:id", getPropertyById);
router.put("/:id", auth, updateProperty);
router.delete("/:id", auth, deleteProperty);

export default router;