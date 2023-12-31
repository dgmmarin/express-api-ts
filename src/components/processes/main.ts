import { Service } from "typedi";
import { Process, Services } from "../../interfaces/process";
import { Service as CustomService } from "../../interfaces/service";
import Api from "../services/api";
import Database from "../services/database";
import QueueWorker from "../services/queue";

@Service()
export default class Main implements Process {
  name: string;
  services: { [key: string]: CustomService };
  constructor() {
    this.name = "Main";
    this.services = <Services>{};
  }
  static getInstance() {
    return this;
  }
  init(): void {
    console.log("Initializing Main Process");
    this.loadServices();
    Object.keys(this.services).forEach((key) => {
      const service = this.services[key];
      service.init();
    });
  }

  start(): void {
    Object.keys(this.services).forEach((key) => {
      const service = this.services[key];
      service.start();
    });
  }

  stop(): void {
    Object.keys(this.services).forEach((key) => {
      const service = this.services[key];
      service.start();
    });
  }

  loadServices(): void {
    this.services["database"] = new Database(this);
    this.services["api"] = new Api(this);
    this.services["queue"] = new QueueWorker(this);
  }

  getService(name: string): CustomService {
    return this.services[name];
  }
}
