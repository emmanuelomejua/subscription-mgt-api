import mongoose, { set } from 'mongoose';

import { DB_URI, NODE_ENV } from '../config/env.js';

if(!DB_URI){
    throw new Error('Please enter a valid Database URI');
}

const connectDB = async () => {
    try {
        set('strictQuery', true);
        
        await mongoose.connect(DB_URI)

        console.log(`DB Connection successful on ${NODE_ENV} mode!`)
    } catch (error) {
        console.log('DB connection error', error?.message)
        process.exit(1)
    }

    mongoose.connection.on('disconnected', () => {
      console.log('DB Disconnected!!');
    });
}

export default connectDB;
