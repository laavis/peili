/**
 * @file File for graphql type definitions
 * @author Benard Gathimba <benard.gathimba@metropolia.fi>
 */

const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    type: String!
    username: String!
    email: String!
    createdAt: String!
    token: String!
  }
  type Query {
    getUsers: [User]
  }
  input RegisterInput {
    type: String!
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
