import { Server } from "miragejs";
import { APP } from "#/constants";
import { RoutesMirage } from "#/controllers/mirage/routes";

export const MirageServer = () => {
  const server = new Server({
    urlPrefix: APP.BFF_URL,
    environment: APP.ENV,
    trackRequests: true,
  });

  return RoutesMirage(server);
};
