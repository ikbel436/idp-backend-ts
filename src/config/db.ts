import mongoose from 'mongoose';
import config from './default.json';

const db = config.mongoUri;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {});
    console.log('MongoDB Connected...');
  } catch (err: any) {
    throw new Error('Not Connected to Database');
    // Sortie du processus avec échec
    process.exit(1);
  }
};

export default connectDB;
