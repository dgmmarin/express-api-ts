import { Service } from "./service";

export interface Services {
  [key: string]: Service;
}

export interface Process {
  name: string;
  services: Services;
  init(): void;
  start(): void;
  stop(): void;
}
