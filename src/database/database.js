import mongoose from 'mongoose';

import { DB_URI, NODE_ENV } from '../config/env.js';

if(!DB_URI){
    throw new Error('Please enter a valid Database URI');
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI)

        console.log(`DB Connection successful on ${NODE_ENV} mode!`)
    } catch (error) {
        console.log('Something went wrong', error)
        process.exit(1)
    }

    mongoose.connection.on('disconnected', () => {
      log('DB Disconnected!!');
    });
}

export default connectDB;
