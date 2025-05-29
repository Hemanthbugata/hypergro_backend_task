import { Router } from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favoritesController';
import {auth} from '../middlewares/auth'; // Your JWT/auth middleware

const router = Router();

router.post('/:propertyId', auth, addFavorite);
router.get('/', auth, getFavorites);
router.delete('/:propertyId', auth, removeFavorite);

export default router;