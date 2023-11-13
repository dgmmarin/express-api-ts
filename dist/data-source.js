"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var path_1 = __importDefault(require("path"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME || "test",
    password: process.env.DB_PASSWORD || "test",
    database: process.env.DB_DATABASE || "test",
    synchronize: process.env.DB_SYNC == "true" ? true : false,
    logging: process.env.DB_LOGGING == "true" ? true : false,
    entities: [path_1.default.join(__dirname, "database/entities", "*.ts")],
    migrations: [path_1.default.join(__dirname, "database/migrations", "*.ts")],
    subscribers: [],
    migrationsTableName: "migrations",
});
