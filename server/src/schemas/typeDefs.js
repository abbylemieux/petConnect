import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Profile {
    id: ID!
    username: String!
    name: String!
    email: String!
  }

  type Pet {
    id: ID!
    name: String!
    type: String!
    breed: String!
    age: Int!
    owner: Profile!
  }

  type Query {
    profiles: [Profile]
    pets: [Pet]
  }

  type Mutation {
    addProfile(username: String!, name: String!, email: String!): Profile
    addPet(name: String!, type: String!, breed: String!, age: Int!, ownerId: ID!): Pet
  }
`;