import { Server } from "miragejs";
import { APP } from "#/constants";
import { RoutesMirage } from "#/services/mirage/routes.config";

export const MirageServer = () => {
  const server = new Server({
    urlPrefix: APP.BFF_URL,
    environment: APP.ENV,
    trackRequests: true,
  });

  return RoutesMirage(server);
};
