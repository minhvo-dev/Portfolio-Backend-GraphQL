const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type PersonInfo {
    name: String!
    gender: String!
    location: String!
    skills: [String]!
    availability: Boolean!
  }

  type Query {
    getMyInfo: PersonInfo!
  }

  type Mutation {
    setMyInfo (
      name: String
      gender: String
      location: String
      skills: [String]
      availability: Boolean
    ) : Boolean!

    setMyAvailability (
      available: Boolean!
    ) : Boolean!

    addSkills (
      skills: [String!]!
    ) : [String]!

    removeSkills (
      skills: [String!]!
    ) : [String]!

    login (
      password: String!
    ) : String!

    setLoginPassword (
      password: String!
    ) : Boolean!
  }
`);

module.exports = { schema };