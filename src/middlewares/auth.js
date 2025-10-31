import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
export const protect = async (req, res, next) => {
  try {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ error: 'Not authorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) return res.status(401).json({ error: 'Invalid token' });
    req.user = admin;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token error' });
  }
};
