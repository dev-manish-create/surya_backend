import { Router } from "express";
import { addService, getServices } from "../controllers/service.controller.js";
import { protect } from "../middlewares/auth.js";
const router = Router();
router.get('/get-services',getServices);
router.post('/add-service', protect, addService);
export default router;