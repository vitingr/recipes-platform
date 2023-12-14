"use client"

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:3030/graphql',
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
  });
};
