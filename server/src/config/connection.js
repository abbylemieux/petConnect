//const dotenv = require('dotenv');
import dotenv from 'dotenv';
dotenv.config({ path: 'server\\.env' });

import mongoose from 'mongoose';
//const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const db = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose.connect(MONGODB_URI, {});
        console.log('Database connection successful.');
        return mongoose.connection;
    } catch(err){
        console.error('Database connection error: ', err);
        throw new Error('Database connection failed.');
    }
};

export default db;