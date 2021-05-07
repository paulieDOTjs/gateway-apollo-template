import { NODE_ENV, currentEnv } from "../config/nodeEnv";

import dotenv from "dotenv";
dotenv.config();

type GraphQLService = {
  name: string;
  team: string;
  git_repo: string;
  dev_url?: string;
  stage_url?: string;
  prod_url?: string;
};

export const parseServices = (...services: GraphQLService[] | any[]) => {
  const filtered: GraphQLService[] = services.filter((srv) =>
    checkService(srv)
  );

  return filtered.map((srv) => ({
    url: getURL(srv),
    name: srv.name,
  }));
};

const checkService = (service: Partial<GraphQLService>) => {
  if (
    !service.hasOwnProperty("name") ||
    !service.hasOwnProperty("team") ||
    !service.hasOwnProperty("git_repo") ||
    typeof service.name !== "string" ||
    service.name.length < 1 ||
    typeof service.team !== "string" ||
    service.team.length < 1 ||
    typeof service.git_repo !== "string" ||
    service.git_repo.length < 1 ||
    !validURL(service.git_repo) ||
    !service.git_repo.includes("git")
  ) {
    return false;
  }

  switch (currentEnv) {
    case NODE_ENV.DEV:
      return validURL(service.dev_url);

    case NODE_ENV.STAGE:
      return validURL(service.stage_url);

    case NODE_ENV.PROD:
      return validURL(service.prod_url);

    default:
      return validURL(NODE_ENV.DEV);
  }
};

// got from https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
const validURL = (str: any) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return (
    !!pattern.test(str) ||
    //or is running on localhost
    (typeof str === "string" && str.startsWith("http://localhost:"))
  );
};

const getURL = (service: GraphQLService) => {
  switch (currentEnv) {
    case NODE_ENV.DEV:
      return service.dev_url;
    case NODE_ENV.STAGE:
      return service.stage_url;
    case NODE_ENV.PROD:
      return service.prod_url;
    default:
      return service.dev_url;
  }
};
