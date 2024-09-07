import mongoose from 'mongoose';
import { myConfig } from './config.js';

const { DBURI } = myConfig;

// Connect to MongoDB using Mongoose
const connectMongoDb = async () => {
    try {
        await mongoose.connect(DBURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection failed:', error);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectMongoDb;
