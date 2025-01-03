import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
//import Pet from './Pet';

const profileSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 9
    },
    pets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        }
    ]
    },
    {
        toJSON: {
            getters: true
        },
        toObject: {
            getters: true
        }
    }
);

profileSchema.pre('save', async function(next) {
    if (!this.isNew || !this.isModified('password')) {
        next();
    }

    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

profileSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

export default Profile;