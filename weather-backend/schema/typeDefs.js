const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Weather {
    id: ID!
    city: String!
    description: String!
    temperature: Float!
    feels_like: Float!
    sunset: Int!
    icon: String!
    date: String!
    hourly: [Hourly]
  }

  type Hourly {
    dt: Int!
    temp: Float!
    icon: String!
  }

  type Query {
    getWeather(city: String!): Weather
    getHistoricalWeather(city: String!, from: String!, to: String!): [Weather]
  }

  type Mutation {
    addWeather(city: String!, description: String!, temperature: Float!, feels_like: Float!, sunset: Int!, icon: String!): Weather
  }
`;

module.exports = typeDefs;
