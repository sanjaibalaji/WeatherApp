import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createHttpLink } from 'apollo-link-http';
import { DefaultApolloClient } from '@vue/apollo-composable';
import './index.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp(App);

app.use(router);
app.provide(DefaultApolloClient, apolloClient);
app.mount('#app');
