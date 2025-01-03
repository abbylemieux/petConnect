import { Profile } from '../models/index.js';

const cleanDB = async () => {
    try {
        await Profile.deleteMany({});
        console.log('Profiles cleaned.');

        //await Pet.deleteMany({});
        //console.log('Pets cleaned.');
    } catch (err) {
        console.error('Database cleaning error: ', err);
        process.exit(1);
    }
};

export default cleanDB;