import { Process } from "./process";

export interface Service {
    name: string;
    parent: Process;
    init(): void;
    start(): void;
    stop(): void;
}