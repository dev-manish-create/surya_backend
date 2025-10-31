import mongoose from 'mongoose';
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true, unique: true },
  excerpt: String,
  content: { type: String, required: true },
  author: String,
  coverImage: {
          type : String,
  },
  tags: [String],
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});
export default mongoose.model('Blog', blogSchema);
