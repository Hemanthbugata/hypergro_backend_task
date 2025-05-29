import Property from "../models/property";
import { Request, Response } from "express";
import redisClient from "../utils/redis";
// Create property (authenticated)
export const createProperty = async (req: Request, res: Response) => {
  try {
    const userId = req.userId ;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const property = await Property.create({ ...req.body, createdBy: userId });
    // Cache the new property in Redis
    await redisClient.flushAll(); 
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
   const userId = req.userId ;
   console.log("User ID from request:", userId); // Debugging line 
    if (property.createdBy.toString() !== userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    Object.assign(property, req.body);
    await property.save();
    await redisClient.flushAll(); // Clear cache after update
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
    const userId = req.userId ;
    if (property.createdBy.toString() !== userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    await property.deleteOne();
    await redisClient.flushAll(); // Clear cache after deletion
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
 
export const advancedSearch = async (req: Request, res: Response) => {
  try {
    const {
      id,
      title,
      type,
      minPrice,
      maxPrice,
      state,
      city,
      minAreaSqFt,
      maxAreaSqFt,
      bedrooms,
      bathrooms,
      amenities,
      furnished,
      availableFrom,
      listedBy,
      tags,
      isVerified
    } = req.query;

    const filter: any = {};

    if (id) filter._id = id;
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (type) filter.type = type;
    if (state) filter.state = state;
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (bedrooms && !isNaN(Number(bedrooms))) filter.bedrooms = Number(bedrooms);
    if (bathrooms && !isNaN(Number(bathrooms))) filter.bathrooms = Number(bathrooms);
    if (furnished) filter.furnished = furnished;
    if (listedBy) filter.listedBy = listedBy;
    if (isVerified !== undefined) filter.isVerified = isVerified === 'true';

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice && !isNaN(Number(minPrice))) filter.price.$gte = Number(minPrice);
      if (maxPrice && !isNaN(Number(maxPrice))) filter.price.$lte = Number(maxPrice);
    }

    if (minAreaSqFt || maxAreaSqFt) {
      filter.areaSqFt = {};
      if (minAreaSqFt && !isNaN(Number(minAreaSqFt))) filter.areaSqFt.$gte = Number(minAreaSqFt);
      if (maxAreaSqFt && !isNaN(Number(maxAreaSqFt))) filter.areaSqFt.$lte = Number(maxAreaSqFt);
    }

    if (availableFrom) {
      const date = new Date(availableFrom as string);
      if (!isNaN(date.getTime())) {
        filter.availableFrom = { $gte: date };
      }
    }

    if (amenities) {
      const amenitiesArr = Array.isArray(amenities)
        ? amenities
        : (amenities as string).split(',').map(a => a.trim());
      filter.amenities = { $all: amenitiesArr };
    }
    if (tags) {
      const tagsArr = Array.isArray(tags)
        ? tags
        : (tags as string).split(',').map(t => t.trim());
      filter.tags = { $all: tagsArr };
    }

    const properties = await Property.find(filter);
    console.log('Filter:', filter);
    res.status(200).json({ properties });
  } catch (err) {
    console.error('Error in advancedSearch:', err);
    res.status(500).json({ message: ' Server error', error: (err as Error).message });
  }
};