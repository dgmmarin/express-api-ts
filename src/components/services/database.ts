import { AppDataSource } from "../../data-source";
import { Process } from "../../interfaces/process";
import { Service } from "../../interfaces/service";

export default class Database implements Service {
    name: string;
    parent: Process
    constructor(parent: Process) {
        this.name = "Database";
        this.parent = parent;
    }
    async init(): Promise<void> {
        try {
            console.log(`Initializing ${this.name} service`);
            await AppDataSource.initialize();
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    }
    start(): void {
        console.log(`Service ${this.name} started`)
    }
    stop(): void {
        throw new Error("Method not implemented.");
    }

}