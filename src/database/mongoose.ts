// import mongoose from 'mongoose';

// let isConnected: boolean = false;

// export const connectToDatabase = async () => {
//   try {
//     if (!process.env.MONGODB_URL) {
//       throw new Error('Missing MongoDB URI');
//     }

//     if (isConnected) {
//       throw new Error('Database is already connected');
//     }

//     await mongoose.connect(process.env.MONGODB_URL, {
//       dbName: 'devoverflow',
//     });

//     isConnected = false;
//     console.log('Database connected');
//   } catch (error: any) {
//     console.error(`Error connecting to the database: ${error.message}`);
//   }
// };
import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('Missing MongoDB URI');
    }

    if (isConnected) {
      console.warn('Database is already connected');
      return;
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


