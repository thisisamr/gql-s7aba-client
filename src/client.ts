import { fetch } from "cross-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";

export const Sqlclient = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: "http://localhost:4001/graphql",
    fetch,
  }),
  cache: new InMemoryCache({ addTypename: false }),
});
export const postgresclient = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    fetch,
  }),
  cache: new InMemoryCache(),
});
