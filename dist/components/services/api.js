"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var users_1 = __importDefault(require("../../routes/users"));
var auth_1 = __importDefault(require("../../routes/auth"));
var auth_2 = __importDefault(require("../../middlewares/auth"));
var getUserOnRequest_1 = __importDefault(require("../../middlewares/getUserOnRequest"));
var roles_1 = __importDefault(require("../../routes/roles"));
var permissions_1 = __importDefault(require("../../routes/permissions"));
var categories_1 = __importDefault(require("../../routes/categories"));
var products_1 = __importDefault(require("../../routes/products"));
var orders_1 = __importDefault(require("../../routes/orders"));
var Api = /** @class */ (function () {
    function Api(parent) {
        this.name = "Api";
        this.parent = parent;
    }
    Api.prototype.init = function () {
        this.port = process.env.NODE_PORT ? Number(process.env.NODE_PORT) : 3000;
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.registerRoutes();
        console.log("Initializing ".concat(this.name, " service"));
    };
    Api.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Service ".concat(_this.name, " at http://localhost:").concat(_this.port));
        });
    };
    Api.prototype.stop = function () {
        throw new Error("Method not implemented.");
    };
    Api.prototype.registerRoutes = function () {
        this.app.use('/auth', auth_1.default);
        this.app.use('/users', auth_2.default, getUserOnRequest_1.default, users_1.default);
        this.app.use('/roles', auth_2.default, getUserOnRequest_1.default, roles_1.default);
        this.app.use('/permissions', auth_2.default, getUserOnRequest_1.default, permissions_1.default);
        this.app.use('/categories', auth_2.default, getUserOnRequest_1.default, categories_1.default);
        this.app.use('/products', auth_2.default, getUserOnRequest_1.default, products_1.default);
        this.app.use('/orders', auth_2.default, getUserOnRequest_1.default, orders_1.default);
        this.app.use(function (err, req, res, next) {
            console.error(err.stack);
            res.status(500).send('Something went wrong');
        });
    };
    return Api;
}());
exports.default = Api;
