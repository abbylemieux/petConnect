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
    },
    type: {
        type: String,
        required: true,
        enum: ['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Insect', 'Horse', 'Rabbit', 'Other'],
        trim: true
    },
    calendar: {
        type: Schema.Types.ObjectId,
        ref: 'Calendar'
    }
});

const Pet = model('Pet', petSchema);

export default Pet;