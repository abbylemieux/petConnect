//import gql from 'graphql';

import { gql } from 'apollo-server-express';

const typeDefs = gql `
    type Profile {
        id: ID!
        username: String!
        email: String!
        password: String!
        pets: [Pet]
    }

    type Pet {
        id: ID!
        name: String!
        owner: Profile
        calendar: Calendar
    }

    type Calendar {
        id: ID!
        events: [Event]
    }

    type Event {
        id: ID!
        googleEventId: String!
        title: String!
        description: String
        start: String!
        end: String!
    }

    type Auth {
        token: String!
        profile: Profile!
    }

    input EventInput {
        title: String!
        description: String
        start: String!
        end: String!
    }

    input PetInput {
        name: String!
        owner: ID
    }

    type Query {
        profiles: [Profile]
        profile(username: String!): Profile
        pets(owner: ID): [Pet]
        pet(_id: ID!): Pet
        me: Profile
        getAuthUrl: String
    }

    type Mutation {
        createPet(petData: PetInput): Pet
        addEvent(calendarId: ID!, eventData: EventInput): Event
        removeEvent(calendarId: ID!, eventId: ID!): Boolean
        removePet(_id: ID!): Boolean
        removeProfile: Boolean
        addProfile(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        handleOAuth2Callback(code: String!): String
    }
`;

export default typeDefs;