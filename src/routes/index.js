import { Router } from 'express';
import adminRoutes from './admin.routes.js';
import blogRoutes from './blog.routes.js';
import contactRoutes from './contact.routes.js';
import galleryRoutes from './gallery.routes.js';
import rateRoutes from './rate-routes.js';
import serviceRoutes from './services.routes.js';
const router = Router();
router.use('/contacts', contactRoutes);
router.use('/gallery', galleryRoutes);
router.use('/blogs', blogRoutes);
router.use('/admin', adminRoutes);
router.use('/services',serviceRoutes);
router.use('/services-rates',rateRoutes);

export default router;
