const typeDefs = `
  type Profile {
    _id: ID
    username: String
    password: String
    pets: [Pet]
  }
  type Pet {
    _id: ID
    name: String
    owner: Profile
  }
  type Auth {
    token: ID!
    profile: Profile
  }
  type Query {
    profiles: [Profile]
    profile(_id: ID!): Profile
    pets: [Pet]
    pet(_id: ID!): Pet
    me: Profile
  }
  type Mutation {
    addProfile(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addPet(name: String!): Pet
    removeProfile: Profile
    removePet(petId: ID!): Pet
  }     
`;

export default typeDefs;