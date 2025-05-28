import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/user';
import propertyRoutes from './routes/property';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || '', { })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/user', authRoutes);
app.use('/property', propertyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));