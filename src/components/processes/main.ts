import { Process, Services } from "../../interfaces/process";
import { Service } from "../../interfaces/service";
import Api from "../services/api";
import Database from "../services/database";
import QueueWorker from "../services/queue";
import Queue from "../services/queue";

export default class Main implements Process {
    name: string;
    services: {[key: string]: Service};
    constructor() {
        this.name = "Main";
        this.services = <Services>{};
    }
    init(): void {
        console.log("Initializing Main Process");
        this.loadServices();
        Object.keys(this.services).forEach(key => {
            const service = this.services[key];
            service.init();
        });
    }
    
    start(): void {
        Object.keys(this.services).forEach(key => {
            const service = this.services[key];
            service.start();
        });
    }

    stop(): void {
        Object.keys(this.services).forEach(key => {
            const service = this.services[key];
            service.start();
        });
    }

    loadServices(): void {
        this.services["database"] = new Database(this);
        this.services["api"] = new Api(this);
        this.services["queue"] = new QueueWorker(this);
    }

}