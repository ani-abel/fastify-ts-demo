import { Model } from "mongoose";
import * as Mongoose from "mongoose";
import { Vehicle, VehicleModel } from "./models/vehicle";

// import * as fp from "fastify-plugin";
// const fpo = fp.default;
const fp = require("fastify-plugin");

export enum MongooseEvent {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
}

export interface Models {
  Vehicle: Model<VehicleModel>;
}

export interface Db {
  models: Models;
}

export default fp(async (fastify, opts: { uri: string }, next) => {
  Mongoose.connection.on(MongooseEvent.CONNECTED, () => {
    fastify.log.info({ actor: "MongoDB" }, "Connected");
  });

  Mongoose.connection.on(MongooseEvent.DISCONNECTED, () => {
    fastify.log.error({ actor: "MongoDB" }, "Disconnected");
  });

  await Mongoose.connect(opts.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const models: Models = {
    Vehicle: Vehicle,
  };

  fastify.decorate("db", { models });

  next();
});
