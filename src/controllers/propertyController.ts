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

// Get all properties (public
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
 
// Search properties with filters (public)

// export const searchProperties = async (req: Request, res: Response) => {
//   try {
//     const filter: any = {};

//     // String fields with exact or partial (regex) match
//     if (req.query.title) {
//       filter.title = { $regex: req.query.title as string, $options: "i" };
//     }
//     if (req.query.type) filter.type = req.query.type;
//     if (req.query.state) filter.state = req.query.state;
//     if (req.query.city) filter.city = req.query.city;
//     if (req.query.furnished) filter.furnished = req.query.furnished;
//     if (req.query.listedBy) filter.listedBy = req.query.listedBy;
//     if (req.query.colorTheme) filter.colorTheme = req.query.colorTheme;
//     if (req.query.listingType) filter.listingType = req.query.listingType;
//     if (req.query.createdBy) filter.createdBy = req.query.createdBy;
//     if (req.query.isVerified !== undefined) filter.isVerified = req.query.isVerified === "true";

//     // Numeric range filters
//     if (req.query.priceMin || req.query.priceMax) {
//       filter.price = {};
//       if (req.query.priceMin) filter.price.$gte = Number(req.query.priceMin);
//       if (req.query.priceMax) filter.price.$lte = Number(req.query.priceMax);
//     }
//     if (req.query.areaSqFtMin || req.query.areaSqFtMax) {
//       filter.areaSqFt = {};
//       if (req.query.areaSqFtMin) filter.areaSqFt.$gte = Number(req.query.areaSqFtMin);
//       if (req.query.areaSqFtMax) filter.areaSqFt.$lte = Number(req.query.areaSqFtMax);
//     }
//     if (req.query.bedrooms) filter.bedrooms = Number(req.query.bedrooms);
//     if (req.query.bathrooms) filter.bathrooms = Number(req.query.bathrooms);

//     // Date filter
//     if (req.query.availableFrom) {
//       filter.availableFrom = { $gte: new Date(req.query.availableFrom as string) };
//     }

//     // Tags and amenities (expects comma separated values, matches all)
//     if (req.query.amenities) {
//       filter.amenities = { $all: (req.query.amenities as string).split(",") };
//     }
//     if (req.query.tags) {
//       filter.tags = { $all: (req.query.tags as string).split(",") };
//     }

//     // Rating filter
//     if (req.query.ratingMin || req.query.ratingMax) {
//       filter.rating = {};
//       if (req.query.ratingMin) filter.rating.$gte = Number(req.query.ratingMin);
//       if (req.query.ratingMax) filter.rating.$lte = Number(req.query.ratingMax);
//     }

//     // Pagination
//     const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
//     const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 20;
//     const skip = (page - 1) * limit;

//     // Sorting
//     const sortField = req.query.sortField as string || "createdAt";
//     const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

//     // --- Redis Caching ---
//     const cacheKey = `properties:${JSON.stringify(req.query)}`;
//     const cached = await redisClient.get(cacheKey);
//     if (cached) {
//       return res.json(JSON.parse(cached));
//     }

//     // Query execution
//     const properties = await Property.find(filter)
//       .sort({ [sortField]: sortOrder })
//       .skip(skip)
//       .limit(limit);

//     const total = await Property.countDocuments(filter);

//     const response = { total, page, limit, properties };

//     // Cache the result for 5 minutes (300 seconds)
//     await redisClient.setEx(cacheKey, 300, JSON.stringify(response));

//     res.json(response);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err });
//   }
// };