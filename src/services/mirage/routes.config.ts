import { Response, Server } from "miragejs";

export const RoutesMirage = (server: Server) => {
  server.get("test-route", () => new Response(200));
  server.post("test-route-post", () => new Response(200));

  server.passthrough();
  return server;
};
