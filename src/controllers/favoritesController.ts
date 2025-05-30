import { Request, Response } from 'express';
import User from '../models/user';
import Property from '../models/property';
import { getCache, setCache } from '../utils/redis';


export const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; // Make sure your auth middleware sets req.userId
    const { propertyId } = req.params;

    // Find property by custom id (string)
    const property = await Property.findOne({ id: propertyId });
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Use string comparison for favorites
    if (!user.favorites.includes(propertyId)) {
      user.favorites.push(propertyId);
      await user.save();
    }

    res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  const cacheKey = `favorites:${req.userId}`;
  const cached = await getCache(cacheKey);
  if (cached) {
    res.status(200).json({ favorites: cached });
    return;
  }

  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const properties = await Property.find({ id: { $in: user.favorites } });
    await setCache(cacheKey, properties);
    res.status(200).json({ favorites: properties });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { propertyId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Remove the propertyId string from favorites
    user.favorites = user.favorites.filter((favId) => favId !== propertyId);
    await user.save();

    res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};