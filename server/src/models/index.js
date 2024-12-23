// filepath: /C:/Users/Kimani/petConnect/server/src/models/index.js
import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: String,
  building: String,
  creditHours: Number,
  // Add other fields as necessary
});

const Class = mongoose.model('Class', classSchema);

export { Class };