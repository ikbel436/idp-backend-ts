import mongoose from 'mongoose';
import config from './config';
import appConfig from './config';

const db = appConfig.mongoURI;

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    console.log('Connecting to DB...');
    await mongoose.connect(db, {
   
    });
    console.log('MongoDB Connected...');
  }catch (err: any) {
    throw new Error('Not Connected to Database');
    process.exit(1);
  }
};

export default connectDB;
