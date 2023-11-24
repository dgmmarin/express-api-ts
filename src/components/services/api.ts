/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from "../../interfaces/service";
import express from "express";
import cors from "cors";
import users from "../../routes/users";
import auth from "../../routes/auth";
import authenticateJWT from "../../middlewares/auth";
import getRequestedUser from "../../middlewares/getUserOnRequest";
import { Process } from "../../interfaces/process";
import roles from "../../routes/roles";
import permissions from "../../routes/permissions";
import categories from "../../routes/categories";
import products from "../../routes/products";
import orders from "../../routes/orders";
import pagniation from "../../middlewares/pagination";
import { create } from "domain";
import { createExpressServer } from "routing-controllers";
import expressListRoutes from "express-list-routes";
import bodyParser from "body-parser";

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
    this.registerRoutes = this.registerRoutes.bind(this);
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
    // this.app = express();
    // this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(cors(corsOptions));
    // this.app.use(pagniation);
    // this.registerRoutes();

    // Routed controllers
    this.app = createExpressServer({
      // routePrefix: '/api',
      cors: corsOptions,
      classTransformer: true,
      validation: true,
      defaultErrorHandler: false,
      controllers: [__dirname + "/../../routed-components/**/*.controller.ts"],
      interceptors: [__dirname + "/../../middlewares/CustomErrorHandler.ts"],
    });
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

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

  registerRoutes(): void {
    this.app.use("/auth", auth);
    this.app.use("/users", authenticateJWT, getRequestedUser, users);
    this.app.use("/roles", authenticateJWT, getRequestedUser, roles);
    this.app.use(
      "/permissions",
      authenticateJWT,
      getRequestedUser,
      permissions,
    );
    this.app.use("/categories", authenticateJWT, getRequestedUser, categories);
    this.app.use("/products", authenticateJWT, getRequestedUser, products);
    this.app.use("/orders", authenticateJWT, getRequestedUser, orders);
  }
}
