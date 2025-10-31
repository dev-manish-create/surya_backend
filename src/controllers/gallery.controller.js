import cloudinary from '../utils/cloudinary.js';
import Gallery from '../models/Gallery.js';
export const uploadMedia = async (req,res,next)=>{
  try{
    if(!req.file) return res.status(400).json({ error: 'File required' });
    const { originalname, buffer, mimetype } = req.file;
    const type = mimetype.startsWith('video') ? 'video' : 'image';
    const result = await cloudinary.uploadStream(buffer, { resource_type: type==='video' ? 'video' : 'image' });
    const item = await Gallery.create({ title: req.body.title||originalname, type, url: result.secure_url, publicId: result.public_id, description: req.body.description });
    res.status(201).json(item);
  } catch(err){ next(err); }
};
export const listMedia = async (req,res,next)=>{
  try{
    const items = await Gallery.find().sort({ createdAt: -1 }).limit(500);
    res.json({ data: items });
  }catch(err){ next(err); }
};
export const deleteMedia = async (req,res,next)=>{
  try{
    const item = await Gallery.findById(req.params.id);
    if(!item) return res.status(404).json({ error: 'Not found' });
    if(item.publicId) await cloudinary.destroy(item.publicId, { resource_type: item.type==='video' ? 'video' : 'image' });
    await item.remove();
    res.json({ message: 'Deleted' });
  }catch(err){ next(err); }
};
