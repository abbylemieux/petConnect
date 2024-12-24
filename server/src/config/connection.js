//const dotenv = require('dotenv');
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
//const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const db = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false});
        console.log('Database connection successful.');
        return mongoose.connection;
    } catch(err){
        console.error('Database connection error: ', err);
        throw new Error('Database connection failed.');
    }
};

export default db;