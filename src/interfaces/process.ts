import { Service } from "./service";

export interface Process {
    name: string;
    services: Service[];
    init(): void;
    start(): void;
    stop(): void;
}
