// import * as fp from "fastify-plugin";
import { Vehicle } from "modules/db/models/vehicle";
const fp = require("fastify-plugin");

export default fp(async (server, opts, next) => {
  //Get
  server.get("/vehicles/:id", {}, async (request, response) => {
    try {
      const _id: string = request.params.id;

      const vehicle = await server.db.models.Vehicle.findOne({
        _id,
      });
      if (!vehicle) {
        return response.send(404);
      }

      return response.code(200).send(vehicle);
    } catch (ex) {
      request.log.error(ex);
      return response.send(400);
    }
  });

  //Get, Use this style
  server.route({
    url: "/vehicles",
    logLevel: "warn",
    //preValidation: fastify.auth([fastify.verifyJWT]),
    method: ["GET"],
    handler: async (request, response) => {
      try {
        return await server.db.models.Vehicle.find({});
      } catch (ex) {
        request.log.error(ex);
        return response.send(400);
      }
    },
  });

  server.route({
    url: "/vehicles-strain",
    logLevel: "warn",
    method: ["GET"],
    handler: async (request, response) => {
      return { Message: "This is a test Message", Date: new Date() };
    },
  });

  //Post
  server.post("/vehicles", {}, async (request, response) => {
    try {
      const { Vehicle } = server.db.models;
      const vehicle = await Vehicle.create(request.body);

      return response.code(201).send(vehicle);
    } catch (ex) {
      request.log.error(ex);
      return response.send(500);
    }
  });

  next();
});
