import slugify from 'slugify';
import Blog from '../models/Blog.js';
export const createBlog = async (req,res,next)=>{
  try{
    const { title, content, excerpt, tags, coverImage, published } = req.body;
    const baseSlug = slugify(title||Date.now().toString(), { lower:true, strict:true });
    const exists = await Blog.findOne({ slug: baseSlug });
    const slug = exists ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;
    const blog = await Blog.create({ title, slug, content, excerpt, tags, coverImage, published, author: req.user?.name||'Admin' });
    res.status(201).json(blog);
  }catch(err){ next(err); }
};
export const listBlogs = async (req,res,next)=>{
  try{
    const page = parseInt(req.query.page||'1',10) || 1;
    const limit = Math.min(parseInt(req.query.limit||'10',10),50);
    const skip = (page-1)*limit;
    const filter = req.query.published==='true' ? { published:true } : {};
    const [items,total] = await Promise.all([Blog.find(filter).sort({ createdAt:-1 }).skip(skip).limit(limit), Blog.countDocuments(filter)]);
    res.json({ data: items, meta: { page, limit, total } });
  }catch(err){ next(err); }
};
export const getBlog = async (req,res,next)=>{
  try{ const blog = await Blog.findOne({ slug: req.params.slug }); if(!blog) return res.status(404).json({ error:'Not found' }); res.json(blog);}catch(err){next(err);}
};
export const updateBlog = async (req,res,next)=>{
  try{ const blog = await Blog.findById(req.params.id); if(!blog) return res.status(404).json({ error:'Not found' }); Object.assign(blog, req.body, { updatedAt: new Date() }); await blog.save(); res.json(blog);}catch(err){next(err);}
};
export const deleteBlog = async (req,res,next)=>{
  try{ const blog = await Blog.findById(req.params.id); if(!blog) return res.status(404).json({ error:'Not found' }); await blog.remove(); res.json({ message:'Deleted' });}catch(err){next(err);}
};
