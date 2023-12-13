/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from "../../interfaces/service";
import express from "express";
import { Process } from "../../interfaces/process";// import paginate from 'express-paginate';
import { createExpressServer } from "routing-controllers";
import expressListRoutes from "express-list-routes";
import bodyParser from "body-parser";
import { CustomPagination } from "../../middlewares/CustomPagination";
import { ContextMiddleware } from "../../middlewares/ContextMiddleware";
import { CustomErrorHandler } from "../../middlewares/CustomErrorHandler";


export default class Api implements Service {
  name: string;
  app: ReturnType<typeof express>;
  port: number;
  parent: Process;
  constructor(parent: Process) {
    this.name = "Api";
    this.parent = parent;
    this.init = this.init.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  get App(): ReturnType<typeof express> {
    return this.app;
  }

  init(): void {
    this.port = process.env.NODE_PORT ? Number(process.env.NODE_PORT) : 3000;
    const corsOptions = {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204
    }

    // Routed controllers
    this.app = createExpressServer({
      // routePrefix: '/api',
      cors: corsOptions,
      classTransformer: true,
      validation: true,
      defaultErrorHandler: false,
      middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        ContextMiddleware,
        CustomErrorHandler,
        CustomPagination,
      ],
      controllers: [__dirname + "/../../controllers/**/*.controller.ts"],
      interceptors: [__dirname + "/../../interceptors/**/*.ts"],
    });
    console.log(`Initializing ${this.name} service`);
  }

  start(): void {
    this.app.listen(this.port, () => {
      console.log(`Service ${this.name} at http://localhost:${this.port}`);
      expressListRoutes(this.app, {
        prefix: '', // A prefix for router Path
        spacer: 7,   // Spacer between router Method and Path
        logger: console.info, // A custom logger function
        color: true // If the console log should color the method name
      });
    });
  }

  startTest(): void {
    this.app.listen(3000, () => {
      console.log(`Service ${this.name} at http://localhost:3000`);
    });
  }

  stop(): void {
    throw new Error("Method not implemented.");
  }

}
