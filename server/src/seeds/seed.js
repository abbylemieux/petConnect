import db from '../config/connection.js';
import { Pet, Profile, Calendar } from '../models/index.js';
import { resolvers } from '../schemas/index.js';
import cleanDB from './cleanDB.js';

const seedDB = async () => {
    try {
        await db();
        await cleanDB();

        /*const addProf = resolvers.Mutation.addProfile = async (parent, { profileData }) => {
            const profile = new Profile(profileData);
            await profile.save();
            return profile;
        };*/
        

        const profiles = await Profile.insertMany([
            {
                username: 'testUser1',
                email: 'pete@pete.com',
                password: 'password1',
                pets: []
            },
            {
                username: 'testUser2',
                email: 'dave@pete.com',
                password: 'password2',
                pets: []
            }
        ]);
        const profileMap = profiles.reduce((map, profile) => {
            map[profile.username] = profile._id;
            return map;
        }, {});
        console.log('profiles mapped');
        resolvers.Mutation.createPet = async (parent, { petData }) => {
            const pet = new Pet(petData);
            await pet.save();
            return pet;
        };

        const addPt = async (petData) => {
            return await resolvers.Mutation.createPet(null, { petData });
        };
        /*const pets = await Pet.insertMany([
            {
                name: 'Fluffy',
                type: 'Cat',
                //breed: 'Siamese',
                //age: 5,
                owner: profileMap['testUser1'],
            },
            {
                name: 'Spot',
                type: 'Dog',
                //breed: 'Dalmation',
                //age: 3,
                owner: profileMap['testUser2']
            }
        ]);
        const petMap = pets.reduce((map, pet) => {
            map[pet.name] = pet._id;
            return map;
        }, {});*/
        await addPt({ name: 'Fluffy', type: 'Cat', owner: profileMap['testUser1'] });
        await addPt({ name: 'Spot', type: 'Dog', owner: profileMap['testUser2'] });
        console.log('pets added');
        /*profileMap['testUser1'].resolvers.createPet = async (parent, { petData }, context) => {
            if (context.user) {
                const calendar = new Calendar();
                await calendar.save();
                const pet = new Pet({
                    ...petData,
                    owner: context.user._id,
                    calendar: calendar._id
                });
                await pet.save();
                return pet;
            }
            throw new AuthenticationError('Not logged in');
        };*/
        //profileMap['testUser1'].pets.push(petMap['Fluffy']);
        //profileMap['testUser2'].pets.push(petMap['Spot']);
        /*await Calendar.insertMany([
            {
                pet: petMap['Fluffy'],
                events: []
            },
            {
                pet: petMap['Spot'],
                events: []
            }
        ]);*/
    } catch (err) {
        console.error('Database seeding error: ', err);
        process.exit(1);
    }
}

seedDB();