export interface Service {
    name: string;
    init(): void;
    start(): void;
    stop(): void;
}