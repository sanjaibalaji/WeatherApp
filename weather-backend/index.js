const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  mongoose.connect('mongodb://localhost:27017/weather', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      return app.listen({ port: 4000 });
    })
    .then(() => {
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    })
    .catch(error => {
      console.error('Error connecting to MongoDB', error);
    });
}
startServer();
