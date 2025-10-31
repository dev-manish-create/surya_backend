import mongoose from 'mongoose';
import logger from './logger.js';
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('DB connection error: ' + err.message);
    process.exit(1);
  }
};
