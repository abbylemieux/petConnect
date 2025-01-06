import mongoose from 'mongoose';
import { Profile, Pet } from '../models/index.js';
import { profiles, pets } from './seedData.js';
import dotenv from 'dotenv';
dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pet-adoption', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    // await Profile.deleteMany({});
    //await Pet.deleteMany({});

    // Insert profiles
    const createdProfiles = await Profile.insertMany(profiles);

    // Set owner for pets and insert pets
    pets[0].owner = createdProfiles[0]._id;
    pets[1].owner = createdProfiles[1]._id;
    await Pet.insertMany(pets);

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDatabase();