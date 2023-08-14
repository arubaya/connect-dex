import { ApolloClient, InMemoryCache } from '@apollo/client';

const ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;

export const client = new ApolloClient({
  uri: ENDPOINT,
  cache: new InMemoryCache(),
});
