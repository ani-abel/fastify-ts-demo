//import * as fastify from "fastify";
import fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

import { Db } from "../modules/db";
declare module "fastify" {
  export interface FastifyInstance {
    db: Db;
  }
}

//---
// import fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
// import { Server, IncomingMessage, ServerResponse } from "http";

// import { Db } from "../modules/db";
// declare module "fastify" {
//   export interface FastifyInstance<
//     HttpServer = Server,
//     HttpRequest = IncomingMessage,
//     HttpResponse = ServerResponse
//   > {
//     blipp(): void;
//     db: Db;
//   }
// }
