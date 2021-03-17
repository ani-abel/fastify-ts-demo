//import * as fp from "fastify-plugin";
const fp = require("fastify-plugin");

export default fp(async (server, opts, next) => {
  server.route({
    url: "/status",
    logLevel: "warn",
    //preValidation: fastify.auth([fastify.verifyJWT]),
    method: ["GET", "HEAD"],
    handler: async (request, response) => {
      return response.send({ date: new Date(), works: true });
    },
  });
  next();
});
