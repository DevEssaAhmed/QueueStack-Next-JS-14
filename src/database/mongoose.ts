import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('Missing MongoDB URI');
    }

    if (isConnected) {
      throw new Error('Database is already connected');
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'devoverflow',
    });

    isConnected = true;
    console.log('Database connected');
  } catch (error: any) {
    console.error(`Error connecting to the database: ${error.message}`);
  }
};
