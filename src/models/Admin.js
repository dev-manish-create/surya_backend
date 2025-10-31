import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  role: { type: String, enum: ['admin'], default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
adminSchema.methods.matchPassword = function(entered) {
  return bcrypt.compare(entered, this.password);
};
export default mongoose.model('Admin', adminSchema);
