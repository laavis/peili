/**
 * @file exports the user resolvers for queries and mutations
 * @author Benard Gathimba <benard.gathimba@metropolia.fi>
 */

const usersResolvers = require('./users');

module.exports = {
  Query: {
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
};
