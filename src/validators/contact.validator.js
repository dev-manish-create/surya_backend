import { body, validationResult } from 'express-validator';
export const validateContact = [
  body('name').isLength({ min: 2 }).withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('message').isLength({ min: 5 }).withMessage('Message too short'),
  (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
