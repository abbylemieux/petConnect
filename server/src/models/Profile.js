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
            getters: true,
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.password; // Remove password field from the output
                return ret;
            }
        },
        toObject: {
            getters: true,
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.password; // Remove password field from the output
                return ret;
            }
        }
    }
);

profileSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

profileSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

export default Profile;