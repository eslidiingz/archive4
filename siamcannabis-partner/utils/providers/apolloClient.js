import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import Config from "../../configs/config"

const gqlClient = new ApolloClient({
  link: new HttpLink({
    uri: Config.GQL_URI,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Cache-Control": "no-cache",
      "x-hasura-admin-secret": Config.GQL_SECRET,
    },
  }),
  cache: new InMemoryCache(),
})

export { gqlClient }
