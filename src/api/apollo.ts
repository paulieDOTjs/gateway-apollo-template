import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";
import { serviceList } from "./services/serviceList";
import { NODE_ENV, currentEnv } from "./config/nodeEnv";

// create apollo instance
export const apollo = new ApolloServer({
  gateway: new ApolloGateway({ serviceList }),

  //allow introspection in every environment
  introspection: true,

  //turn debug on for dev
  debug: currentEnv === NODE_ENV.DEV,

  //turn tracing on for dev and stage
  tracing: currentEnv === NODE_ENV.DEV || currentEnv === NODE_ENV.STAGE,

  //allow playground in every environment
  playground: {
    faviconUrl: "/public/favicon.ico",
    title: "My App",

    settings: {
      "editor.fontFamily":
        "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
      "editor.fontSize": 16,
    },
  },

  // Do not show database errors unless in dev environment.
  formatError: (err) => {
    if (
      err.message.startsWith("Database Error: ") &&
      currentEnv !== NODE_ENV.DEV
    ) {
      return new Error("Internal server error");
    }
    return err;
  },

  //subscriptions not supported in federation
  subscriptions: false,
});
