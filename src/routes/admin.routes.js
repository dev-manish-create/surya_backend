import { Router } from 'express';
import { initAdmin, login, me } from '../controllers/admin.controller.js';
import { protect } from '../middlewares/auth.js';
const router = Router();
router.post('/init', initAdmin);
router.post('/login', login);
router.get('/me', protect, me);
export default router;
