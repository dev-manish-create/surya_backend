import { Router } from 'express';
import { createContact, listContacts } from '../controllers/contact.controller.js';
import { protect } from '../middlewares/auth.js';
import { validateContact } from '../validators/contact.validator.js';
const router = Router();
router.post('/create', validateContact, createContact);
router.get('/get', protect, listContacts);
export default router;
