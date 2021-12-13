import { NODE_ENV, currentEnv } from "./config/nodeEnv";

import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";
import { readFileSync } from "fs";

const supergraphSdl = readFileSync(
  "./src/models/supergraph.graphql"
).toString();

const gateway = new ApolloGateway({
  supergraphSdl,
});

export const apollo = new ApolloServer({
  gateway,
  introspection: true,
  debug: currentEnv === NODE_ENV.DEV,
  formatError: (err) => {
    if (
      err.message.startsWith("Database Error: ") &&
      currentEnv !== NODE_ENV.DEV
    ) {
      return new Error("Internal server error");
    }
    return err;
  },
});
