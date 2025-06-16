import dotenv from 'dotenv';
dotenv.config(); // this MUST be before using process.env

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB connection error:', error.message);
  }
};

export default connectDB;
