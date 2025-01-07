import { Profile, Pet, Calendar } from '../models/index.js';

const cleanDB = async () => {
    try {
        await Profile.deleteMany({});
        console.log('Profiles cleaned.');
        await Pet.deleteMany({});
        console.log('Pets cleaned.');
        await Calendar.deleteMany({});
        console.log('Calendars cleaned.');
    } catch (err) {
        console.error('Database cleaning error: ', err);
        process.exit(1);
    }
};

export default cleanDB;