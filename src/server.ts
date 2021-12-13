import { apollo } from "./apollo";
import dotenv from "dotenv";
/* eslint-disable no-console */
import express from "express";
import logger from "morgan";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || "4000";

app.set("port", port);
app.use(logger("dev"));
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "../public")));

app.get("/health", (_req, res) => {
  res.send("Ok");
});
app.get("/", (_req, res) => {
  res.redirect(301, "/graphql");
});
app.post("/", (_req, res) => {
  res.redirect(308, "/graphql");
});

async function start() {
  app.listen({ port }, () => {
    console.log(
      "🌟 ☄️ 🪐 ✨ 🌘 🚀 ☄️ 🪐 ✨ 🌘 🚀 ☄️ 🪐 ✨ 🌘 🚀 ☄️ 🪐 ✨ 🌘 🚀 ☄️ 🪐 ✨ 🌘 🚀 ☄️ 🪐 ✨ 🌟 "
    );
    console.log("🌟".padEnd(81, " ") + "🌟");
    console.log(
      `🌟      Now browse to http://localhost:${port}${apollo.graphqlPath} for GraphQL Playground`.padEnd(
        81,
        " "
      ) + "🌟"
    );
    console.log(
      `🌟       or http://localhost:${port}/public/visualizer.html for visualizer`.padEnd(
        81,
        " "
      ) + "🌟"
    );
    console.log("🌟".padEnd(81, " ") + "🌟");
    console.log(
      "🌟 ☄️ 🪐 ✨ 🌘 🚀 ☄️ 🪐 ✨ 🌘 🚀 ☄️ 🪐 ✨ 🌘 🚀 ☄️ 🪐 ✨ 🌘 🚀 ☄️ 🪐 ✨ 🌘 🚀 ☄️ 🪐 ✨ 🌟 "
    );
  });

  await apollo.start();
  apollo.applyMiddleware({ app });
}

start();
