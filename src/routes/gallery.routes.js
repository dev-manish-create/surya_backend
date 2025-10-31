import { Router } from 'express';
import { deleteMedia, listMedia, uploadMedia } from '../controllers/gallery.controller.js';
import { protect } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';
const router = Router();
router.post('/upload', protect, upload.single('file'), uploadMedia);
router.get('/list', listMedia);
router.delete('/drop/:id', protect, deleteMedia);
export default router;

