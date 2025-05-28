import Property from "../models/property";
import { Request, Response } from "express";

// Create property (authenticated)
export const createProperty = async (req: Request, res: Response) => {
  try {
    const userId = req.userId ;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const property = await Property.create({ ...req.body, createdBy: userId });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all properties (public)
export const getProperties = async (_req: Request, res: Response) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get property by ID (public)
export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update property (only createdBy)
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    const userId = req.user?.id || req.userId || req.body.userId;
    if (property.createdBy.toString() !== userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    Object.assign(property, req.body);
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete property (only createdBy)
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    const userId = req.user?.id || req.userId || req.body.userId;
    if (property.createdBy.toString() !== userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    await property.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};