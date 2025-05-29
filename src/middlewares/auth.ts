import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'server';

export interface AuthRequest extends Request {
  userId?: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authorization token missing or malformed' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log('Received token:', token); 


  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };
    req.userId = decoded._id;
    console.log('auth middleware passed, user ID:', req.userId);
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
