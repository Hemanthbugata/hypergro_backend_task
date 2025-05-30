import { Request, Response } from 'express';
import User from '../models/user';
import Property from '../models/property';


export const recommendProperty = async (req: Request, res: Response) => {
  try {
    const { recipientEmail, propertyId } = req.body;
    const senderId = req.userId; // Set by auth middleware

    // Find recipient
    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      res.status(404).json({ message: 'Recipient not found' });
      return;
    }

    // Check property exists
    const property = await Property.findOne({ id: propertyId });
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    // Prevent duplicate recommendations
    if (!recipient.recommendationsReceived.includes(propertyId)) {
      recipient.recommendationsReceived.push(propertyId);
      await recipient.save();
    }

    res.status(200).json({ message: 'Property recommended successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Fetch property details for all recommended property IDs
    const properties = await Property.find({ id: { $in: user.recommendationsReceived } });

    res.status(200).json({ recommendations: properties });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};