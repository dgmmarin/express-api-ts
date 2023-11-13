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
Object.defineProperty(exports, "__esModule", { value: true });
var data_source_1 = require("../data-source");
var Role_1 = require("../database/entities/Role");
var decorators_1 = require("../auth/decorators");
var Permission_1 = require("../database/entities/Permission");
var RoleController = /** @class */ (function () {
    function RoleController() {
    }
    RoleController.prototype.createRole = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, description, role, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name_1 = _a.name, description = _a.description;
                        role = new Role_1.Role();
                        role.name = name_1;
                        role.description = description;
                        return [4 /*yield*/, data_source_1.AppDataSource.manager.save(role)];
                    case 1:
                        result = _b.sent();
                        res.json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        res.status(400).json({ message: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    RoleController.prototype.listRoles = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var roles, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, data_source_1.AppDataSource.manager.find(Role_1.Role)];
                    case 1:
                        roles = _a.sent();
                        res.json(roles);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(400).json({ message: error_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    RoleController.prototype.getRole = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var roleRepository, role, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        roleRepository = data_source_1.AppDataSource.getRepository(Role_1.Role);
                        return [4 /*yield*/, roleRepository.findOneOrFail({
                                where: { id: Number(req.params.roleId) },
                                relations: ['permissions']
                            })];
                    case 1:
                        role = _a.sent();
                        res.json(role);
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
    ;
    RoleController.prototype.updateRole = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var roleRepository, role, _a, name_2, description, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        roleRepository = data_source_1.AppDataSource.getRepository(Role_1.Role);
                        return [4 /*yield*/, roleRepository.findOneByOrFail({ id: Number(req.params.roleId) })];
                    case 1:
                        role = _b.sent();
                        _a = req.body, name_2 = _a.name, description = _a.description;
                        role.name = name_2 !== null && name_2 !== void 0 ? name_2 : role.name;
                        role.description = description !== null && description !== void 0 ? description : role.description;
                        return [4 /*yield*/, roleRepository.save(role)];
                    case 2:
                        result = _b.sent();
                        res.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        res.status(400).json({ message: error_4 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    RoleController.prototype.deleteRole = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var roleRepository, role, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        roleRepository = data_source_1.AppDataSource.getRepository(Role_1.Role);
                        return [4 /*yield*/, roleRepository.findOneByOrFail({ id: Number(req.params.roleId) })];
                    case 1:
                        role = _a.sent();
                        return [4 /*yield*/, roleRepository.softDelete({ id: Number(role.id) })];
                    case 2:
                        _a.sent();
                        res.json({ message: "Role deleted successfully" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        res.status(400).json({ message: error_5 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    RoleController.prototype.addPermission = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, roleId, permissionId, roleRepository, role, permissionRepository, permission, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.params, roleId = _a.roleId, permissionId = _a.permissionId;
                        roleRepository = data_source_1.AppDataSource.getRepository(Role_1.Role);
                        return [4 /*yield*/, roleRepository.findOneOrFail({
                                where: { id: Number(roleId) },
                                relations: ['permissions']
                            })];
                    case 1:
                        role = _b.sent();
                        permissionRepository = data_source_1.AppDataSource.getRepository(Permission_1.Permission);
                        return [4 /*yield*/, permissionRepository.findOneByOrFail({ id: Number(permissionId) })];
                    case 2:
                        permission = _b.sent();
                        role.permissions.push(permission);
                        return [4 /*yield*/, roleRepository.save(role)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.json(role)];
                    case 4:
                        error_6 = _b.sent();
                        console.log(error_6);
                        res.status(400).json({ message: error_6 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, decorators_1.Roles)(['admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], RoleController.prototype, "createRole", null);
    __decorate([
        (0, decorators_1.Roles)(['admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], RoleController.prototype, "listRoles", null);
    __decorate([
        (0, decorators_1.Roles)(['admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], RoleController.prototype, "getRole", null);
    __decorate([
        (0, decorators_1.Roles)(['admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], RoleController.prototype, "updateRole", null);
    __decorate([
        (0, decorators_1.Roles)(['admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], RoleController.prototype, "deleteRole", null);
    __decorate([
        (0, decorators_1.Roles)(['admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], RoleController.prototype, "addPermission", null);
    return RoleController;
}());
exports.default = RoleController;
