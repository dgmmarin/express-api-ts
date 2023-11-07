import { Process } from "../../interfaces/process";
import { Service } from "../../interfaces/service";
import Api from "../services/api";

export default class Main implements Process {
    name: string;
    services: Service[];
    constructor() {
        this.name = "Main";
        this.services = [];
    }
    init(): void {
        console.log("Initializing Main Process");
        this.loadServices();
        this.services.forEach(service => {
            service.init();
        });
    }
    
    start(): void {
        this.services.forEach(service => {
            service.start();
        });
    }

    stop(): void {
        this.services.forEach(service => {
            service.stop();
        });
    }

    loadServices(): void {
        this.services.push(new Api());
    }

}