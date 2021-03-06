/**
 * @file File handles server initialization and database connection
 * @author Benard Gathimba <benard.gathimba@metropolia.fi>
 */

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('../config.js');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose
  .connect(MONGODB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 4000 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  });
