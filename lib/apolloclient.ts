import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: [],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  link: concat(authMiddleware, new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT })),
});

export default client;
