"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("../services/api"));
var database_1 = __importDefault(require("../services/database"));
var queue_1 = __importDefault(require("../services/queue"));
var Main = /** @class */ (function () {
    function Main() {
        this.name = "Main";
        this.services = {};
    }
    Main.prototype.init = function () {
        var _this = this;
        console.log("Initializing Main Process");
        this.loadServices();
        Object.keys(this.services).forEach(function (key) {
            var service = _this.services[key];
            service.init();
        });
    };
    Main.prototype.start = function () {
        var _this = this;
        Object.keys(this.services).forEach(function (key) {
            var service = _this.services[key];
            service.start();
        });
    };
    Main.prototype.stop = function () {
        var _this = this;
        Object.keys(this.services).forEach(function (key) {
            var service = _this.services[key];
            service.start();
        });
    };
    Main.prototype.loadServices = function () {
        this.services["database"] = new database_1.default(this);
        this.services["api"] = new api_1.default(this);
        this.services["queue"] = new queue_1.default(this);
    };
    return Main;
}());
exports.default = Main;
