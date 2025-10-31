import mongoose from 'mongoose';
const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['image','video'], required: true },
  url: { type: String, required: true },
  publicId: String,
  description:{
    type : String,
    required : true
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Gallery', gallerySchema);
