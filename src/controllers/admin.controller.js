import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
export const generateToken = (id)=> jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN||'7d' });
export const initAdmin = async (req,res,next)=>{
  try{
    const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if(exists) return res.status(400).json({ error: 'Admin exists' });
    const admin = await Admin.create({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, name: 'Admin' });
    res.json({ message: 'Admin created', email: admin.email });
  }catch(err){ next(err); }
};
export const login = async (req,res,next)=>{
  try{
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if(!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await admin.matchPassword(password);
    if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ token: generateToken(admin._id), user: { email: admin.email, name: admin.name } });
  }catch(err){ next(err); }
};
export const me = async (req,res,next)=>{ res.json({ user: req.user }); };
