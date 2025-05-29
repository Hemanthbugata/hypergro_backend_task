import express from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  advancedSearch,
} from "../controllers/propertyController";
import { auth } from "../middlewares/auth"; 

const router = express.Router();

router.post("/create", auth, createProperty);
router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.put("/:id", auth, updateProperty);
router.delete("/:id", auth, deleteProperty);
router.post("/search", advancedSearch);

export default router;