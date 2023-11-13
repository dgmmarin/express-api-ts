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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Permission_1 = require("./Permission");
var uuid_1 = require("uuid");
var Role = /** @class */ (function () {
    function Role() {
    }
    Role.prototype.addUuid = function () {
        this.uuid = (0, uuid_1.v4)();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Role.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], Role.prototype, "uuid", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Role.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Role.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Role.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Role.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return User_1.User; }, function (user) { return user.roles; }),
        __metadata("design:type", Array)
    ], Role.prototype, "users", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Permission_1.Permission; }, function (permission) { return permission.roles; }),
        (0, typeorm_1.JoinTable)({
            name: "role_permissions",
            joinColumn: { name: "role_id", referencedColumnName: "id" },
            inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" }
        }),
        __metadata("design:type", Array)
    ], Role.prototype, "permissions", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Role.prototype, "addUuid", null);
    Role = __decorate([
        (0, typeorm_1.Entity)("roles")
    ], Role);
    return Role;
}());
exports.Role = Role;
