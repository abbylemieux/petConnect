import { Schema, model } from 'mongoose';
import calendar from '../utils/googleClient.js';

//import Pet from './Pet';
const eventSchema = new Schema({
    googleEventId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    toObject: {
        getters: true,
        virtuals: true,
    }
});


const calendarSchema = new Schema({
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    events: [eventSchema]
}, {
    toJSON: {
        getters: true
    },
    toObject: {
        getters: true
    }
});

calendarSchema.methods.addEvent = async function(eventData) {
    const event = {
        summary: eventData.title,
        description: eventData.description,
        start: {
            dateTime: eventData.start,
            timeZone: 'UTC'
        },
        end: {
            dateTime: eventData.end,
            timeZone: 'UTC'
        }
    };

    const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event
    });

    const newEvent = {
        googleEventId: response.data.id,
        title: eventData.title,
        description: eventData.description,
        start: eventData.start,
        end: eventData.end
    };

    this.events.push(newEvent);
    await this.save();
    return newEvent;
};

calendarSchema.methods.removeEvent = async function(eventId) {
    const eventIndex = this.events.findIndex(event => event.googleEventId === eventId);
    if (eventIndex === -1) {
        throw new Error('Event not found');
    }

    await calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId
    });

    this.events.splice(eventIndex, 1);
    await this.save();
}

const Calendar = model('Calendar', calendarSchema);

export default Calendar;