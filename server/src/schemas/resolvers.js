import { Profile, Pet, Calendar } from '../models/index.js';
import { signToken } from '../utils/auth.js';
import bcrypt from 'bcrypt';
import { AuthenticationError } from 'apollo-server-express';

const resolvers = {
    Query: {
        profiles: async () => {
            return Profile.find().populate('pets');
        },
        profile: async (parent, { username }) => {
            return Profile.findOne({ username }).populate('pets');
        },
        pets: async (parent, { owner }) => {
            const params = owner ? { owner } : {};
            return Pet.find(params);
        },
        pet: async (parent, { _id }) => {
            return Pet.findById(_id);
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id }).populate('pets');
            }
            throw new AuthenticationError('Not logged in');
        },
        getAuthUrl: () => {
            const scopes = [
                'https://www.googleapis.com/auth/calendar'
            ];

            const authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
            });

            return authUrl;
        }
    },
    Mutation: {
        createPet: async (parent, { petData }, context) => {
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
        },
        addEvent: async (parent, { calendarId, eventData }, context) => {
            if (context.user) {
                const calendar = await Calendar.findById(calendarId);
                if (!calendar) {
                    throw new Error('Calendar not found');
                }
                return await calendar.addEvent(eventData);
            }
            throw new AuthenticationError('Not logged in');
        },
        removeEvent: async (parent, { calendarId, eventId }, context) => {
            if (context.user) {
                const calendar = await Calendar.findById(calendarId);
                if (!calendar) {
                    throw new Error('Calendar not found');
                }
                await calendar.removeEvent(eventId);
                return true;
            }
            throw new AuthenticationError('Not logged in');
        },
        addProfile: async (parent, { username, email, password }) => {
            const profile = new Profile({ username, email, password });
            await profile.save();
            const token = signToken(profile.username, profile._id);
            return { token, profile };
        },
        login: async (parent, { email, password }) => {
            const profile = await Profile.findOne({ email });
            if (!profile) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const validPassword = await bcrypt.compare(password, profile.password);
            if (!validPassword) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(profile.username, profile._id);
            return { token, profile };
        },
        handleOAuth2Callback: async (parent, { code }) => {
            try {
                const { tokens } = await oauth2Client.getToken(code);
                oauth2Client.setCredentials(tokens);
                console.log('Refresh Token:', tokens.refresh_token);
                return 'Authorization successful! You can close this tab.';
            } catch (error) {
                console.error('Error retrieving tokens:', error);
                throw new Error('Error retrieving tokens');
            }
        }
    }
};

export default resolvers;