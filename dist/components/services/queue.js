"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("@bull-board/api");
var bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
var express_1 = require("@bull-board/express");
var bullmq_1 = require("bullmq");
var path_1 = __importDefault(require("path"));
var customWorker_1 = __importDefault(require("../../queues/customWorker"));
var generic_1 = require("../../interfaces/generic");
var QueueWorker = /** @class */ (function () {
    function QueueWorker(parent) {
        var _this = this;
        this.createQueues = function () {
            var serverAdapter = _this.serverAdapter;
            _this.defaultQueue = _this.createQueueMQ(generic_1.DefaultQueue);
            _this.ordersQueue = _this.createQueueMQ(generic_1.OrdersQueue);
            _this.emailsQueue = _this.createQueueMQ(generic_1.EmailsQueue);
            (0, api_1.createBullBoard)({
                queues: [
                    new bullMQAdapter_1.BullMQAdapter(_this.defaultQueue),
                    new bullMQAdapter_1.BullMQAdapter(_this.ordersQueue),
                    new bullMQAdapter_1.BullMQAdapter(_this.emailsQueue),
                ],
                serverAdapter: serverAdapter,
            });
            _this.parent.services["api"].app.use('/ui', serverAdapter.getRouter());
        };
        this.attachWorkerTpQueues = function () {
            _this.defaultWorker = new customWorker_1.default(_this, generic_1.DefaultQueue, path_1.default.join(__dirname, "..", "..", "queues/jobs/defaultJob.ts"));
            _this.defaultWorker.init();
            _this.ordersWorker = new customWorker_1.default(_this, generic_1.OrdersQueue, path_1.default.join(__dirname, "..", "..", "queues/jobs/orderJob.ts"));
            _this.ordersWorker.init();
            _this.emailsWorker = new customWorker_1.default(_this, generic_1.EmailsQueue, path_1.default.join(__dirname, "..", "..", "queues/jobs/emailJob.ts"));
            _this.emailsWorker.init();
        };
        this.createQueueMQ = function (name) { return new bullmq_1.Queue(name, { connection: _this.redisOptions }); };
        this.name = "Queue";
        this.parent = parent;
    }
    QueueWorker.prototype.init = function () {
        console.log("Initializing ".concat(this.name, " service"));
        this.redisOptions = {
            port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
            host: process.env.REDIS_HOST || 'localhost',
            password: '',
            tls: false,
        };
        this.serverAdapter = new express_1.ExpressAdapter();
        this.serverAdapter.setBasePath('/ui');
    };
    QueueWorker.prototype.start = function () {
        this.createQueues();
        this.attachWorkerTpQueues();
        console.log("Service ".concat(this.name, " started"));
    };
    QueueWorker.prototype.stop = function () {
        throw new Error("Method not implemented.");
    };
    return QueueWorker;
}());
exports.default = QueueWorker;
