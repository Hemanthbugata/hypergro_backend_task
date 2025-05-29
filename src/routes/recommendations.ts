import { Router } from 'express';
import { recommendProperty, getRecommendations } from '../controllers/recommendationController';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/recommend', auth, recommendProperty); // POST body: { recipientEmail, propertyId }
router.get('/received', auth, getRecommendations);

export default router;