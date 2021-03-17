import fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import * as fastifyBlipp from "fastify-blipp";
import * as fastifyOas from "fastify-oas";
import { Server, IncomingMessage, ServerResponse } from "http";
import statusRoutes from "./modules/routes/status";
import vehicleRoutes from "./modules/routes/vehicles";
import db from "./modules/db";

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({});

server.register(require("fastify-swagger"), {
  routePrefix: "/api-docs",
  swagger: {
    info: {
      title: "Fastify Typescript",
      description: "testing the fastify swagger api",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "vehicles", description: "Vehicle related end-points" },
      { name: "code", description: "Code related end-points" },
    ],
    definitions: {
      Vehicle: {
        $id: "Vehicle",
        type: "object",
        required: ["number", "name"],
        properties: {
          _id: { type: "string" },
          name: { type: "string", required: true },
          number: { type: "string", required: true },
        },
      },
    },
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "header",
      },
    },
  },
  exposeRoute: true,
});
server.register(fastifyBlipp.default);
server.register(statusRoutes);

//after server was created
server.register(db, { uri: "mongodb://localhost:27017/vehicles" });
server.register(vehicleRoutes);

server.addHook("onResponse", async (request, reply) => {
  // Some code
  console.log("GOODO HEHEHE");
  return;
});

server.addHook("onRequest", async (request, reply) => {
  // Some code
  console.log("REQ GOODO HEHEHE");
  return;
});

//function to start the server
const start = async () => {
  try {
    await server.listen(parseInt(process.env.PORT) || 3000, "0.0.0.0");
    server.blipp();
  } catch (ex) {
    console.error(ex);
    server.log.error(ex);
    process.exit(1);
  }
};

process.on("uncaughtException", (ex) => {
  console.error(ex);
});

process.on("unhandledRejection", (ex) => {
  console.error(ex);
});

start();
