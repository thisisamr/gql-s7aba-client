import { fetch } from "cross-fetch";
import { config } from "dotenv";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
} from "@apollo/client/core";
config();
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      asd: process.env.APIKEY,
    },
  }));

  return forward(operation);
});
export const Sqlclient = new ApolloClient({
  ssrMode: true,
  link: concat(
    authMiddleware,
    new HttpLink({
      uri: "http://localhost:4001/graphql",
      fetch,
    })
  ),
  cache: new InMemoryCache({ addTypename: false }),
});
export const postgresclient = new ApolloClient({
  ssrMode: true,
  link: concat(
    authMiddleware,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      fetch,
    })
  ),
  credentials: "include",
  cache: new InMemoryCache(),
});
