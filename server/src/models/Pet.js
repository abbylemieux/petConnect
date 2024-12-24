import { Schema, model } from 'mongoose';

const petSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
});

const Pet = model('Pet', petSchema);

export default Pet;