import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/user';
import propertyRoutes from './routes/property';
import favoritesRoutes from './routes/favorites';
import recommendationsRouter from './routes/recommendations';



dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || '', { })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/user', authRoutes);
app.use('/property', propertyRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/recommendations', recommendationsRouter);

app.get('/', (req, res) => {
  res.send('API is running successfully and only Public Accessed routes are available');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app; 