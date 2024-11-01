import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createHttpLink } from 'apollo-link-http';
import { provideApolloClient } from '@vue/apollo-composable';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export function createProvider() {
  provideApolloClient(apolloClient);
}
