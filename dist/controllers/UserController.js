"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../database/entities/User");
var data_source_1 = require("../data-source");
var user_1 = __importDefault(require("../serializers/user"));
var class_transformer_1 = require("class-transformer");
var Auth_1 = __importDefault(require("../auth/Auth"));
var decorators_1 = require("../auth/decorators");
var Role_1 = require("../database/entities/Role");
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.getUserByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { email: email }, relations: ['roles'] })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.name = "UserController";
    }
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, firstName, lastName, email, password, user, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password;
                        user = new User_1.User();
                        user.firstName = firstName;
                        user.lastName = lastName;
                        user.email = email;
                        user.password = Auth_1.default.hashPassword(password);
                        return [4 /*yield*/, data_source_1.AppDataSource.manager.save(user)];
                    case 1:
                        result = _b.sent();
                        res.json((0, class_transformer_1.plainToClass)(user_1.default, result));
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.log(error_2);
                        res.status(400).json({ message: error_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail({
                                where: { id: Number(req.params.userId) },
                                relations: ['roles', 'orders']
                            })];
                    case 1:
                        user = _a.sent();
                        res.json((0, class_transformer_1.plainToClass)(user_1.default, user, {}));
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(400).json({ message: error_3 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.addRole = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var roleId, userId, roleRepository, role, userRepository, user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        roleId = req.params.roleId;
                        userId = req.params.userId;
                        roleRepository = data_source_1.AppDataSource.getRepository(Role_1.Role);
                        return [4 /*yield*/, roleRepository.findOneOrFail({
                                where: { id: Number(roleId) },
                            })];
                    case 1:
                        role = _a.sent();
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail({
                                where: { id: Number(userId) },
                                relations: {
                                    roles: true,
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        user.roles.push(role);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.json((0, class_transformer_1.plainToClass)(user_1.default, user, {}))];
                    case 4:
                        error_4 = _a.sent();
                        console.log(error_4);
                        res.status(400).json({ message: error_4 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.removeRole = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var roleRepository, roleId, role_1, userRepository, user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        roleRepository = data_source_1.AppDataSource.getRepository(Role_1.Role);
                        roleId = req.params.roleId;
                        return [4 /*yield*/, roleRepository.findOneOrFail({
                                where: { id: Number(roleId) },
                            })];
                    case 1:
                        role_1 = _a.sent();
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail({
                                where: { id: Number(req.params.userId) },
                                relations: {
                                    roles: true,
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        user.roles = user.roles.filter(function (userRole) { return userRole.id !== role_1.id; });
                        return [4 /*yield*/, userRepository.save(user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.json((0, class_transformer_1.plainToClass)(user_1.default, user, {}))];
                    case 4:
                        error_5 = _a.sent();
                        console.log(error_5);
                        res.status(400).json({ message: error_5 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, firstName, lastName, email, userRepository, result, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        user = req['user'];
                        _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email;
                        user.firstName = firstName !== null && firstName !== void 0 ? firstName : user.firstName;
                        user.lastName = lastName !== null && lastName !== void 0 ? lastName : user.lastName;
                        user.email = email !== null && email !== void 0 ? email : user.email;
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 1:
                        result = _b.sent();
                        res.json((0, class_transformer_1.plainToClass)(user_1.default, result));
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _b.sent();
                        console.log(error_6);
                        res.status(400).json({ message: error_6 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneByOrFail({ id: Number(req.params.userId) })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, userRepository.softDelete({ id: Number(user.id) })];
                    case 2:
                        _a.sent();
                        res.json({ message: "User deleted successfully" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        res.status(400).json({ message: "User not found" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.listUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, users, usersForReturn, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.find()];
                    case 1:
                        users = _a.sent();
                        usersForReturn = users.map(function (user) { return (0, class_transformer_1.plainToClass)(user_1.default, user); });
                        res.json(usersForReturn);
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        console.log(error_8);
                        res.status(400).json({ message: "Users not found" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserController.prototype.listOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, userId, users, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        userId = req.params.userId;
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: Number(userId) }, relations: ['orders'] })];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        res.status(400).json({ message: error_9 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, decorators_1.Roles)(['admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "createUser", null);
    __decorate([
        (0, decorators_1.Roles)(['admin', 'user']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "getUser", null);
    __decorate([
        (0, decorators_1.HasRole)('admin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "addRole", null);
    __decorate([
        (0, decorators_1.HasRole)('admin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "removeRole", null);
    __decorate([
        (0, decorators_1.Roles)(['admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "updateUser", null);
    __decorate([
        (0, decorators_1.Roles)(['admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "deleteUser", null);
    __decorate([
        (0, decorators_1.Roles)(['admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "listUsers", null);
    return UserController;
}());
;
exports.default = UserController;
