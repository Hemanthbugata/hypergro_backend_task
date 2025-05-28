import express from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController";
import { auth } from "../middlewares/auth"; // You need to implement this if not already

const router = express.Router();

router.post("/create", auth, createProperty);
router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.put("/:id", auth, updateProperty);
router.delete("/:id", auth, deleteProperty);

export default router;