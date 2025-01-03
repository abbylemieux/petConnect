import { Profile, Pet } from '../models/index.js';
import { signToken } from '../utils/auth.js';

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
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation: {
        addProfile: async (parent, args) => {
            const profile = await Profile.create(args);
            const token = signToken(profile);
            return { token, profile };
        },
        login: async (parent, { username, password }) => {
            const profile = await Profile.findOne({ username });
            if(!profile) {
                throw AuthenticationError;
            }
            const correctPw = await profile.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(profile);
            return { token, profile };
        },
        addPet: async (parent, args, context) => {
            if (context.user) {
                const pet = await Pet.create({ ...args, owner: context.user._id });
                await Profile.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { pets: pet._id } }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeProfile: async (parent, args, context) => {
            if(context.user) {
                return await Profile.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removePet: async (parent, { petId }, context) => {
            if (context.user) {
                const pet = await Pet.findOneAndDelete({
                    _id: petId,
                    owner: context.user._id
                });
                await Profile.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { pets: pet._id } }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
}

export default resolvers;