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
exports.Order = void 0;
var typeorm_1 = require("typeorm");
var OrderProducts_1 = require("./OrderProducts");
var User_1 = require("./User");
var uuid_1 = require("uuid");
var Order = /** @class */ (function () {
    function Order() {
    }
    Order.prototype.addUuid = function () {
        this.uuid = (0, uuid_1.v4)();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Order.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], Order.prototype, "uuid", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", Number)
    ], Order.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Order.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Order.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Order.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Order.prototype, "desc", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Order.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Order.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", Date)
    ], Order.prototype, "deletedAt", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return OrderProducts_1.OrderProducts; }, function (orderProduct) { return orderProduct.order; }),
        __metadata("design:type", Array)
    ], Order.prototype, "orderProducts", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.orders; }),
        __metadata("design:type", User_1.User)
    ], Order.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Order.prototype, "addUuid", null);
    Order = __decorate([
        (0, typeorm_1.Entity)("orders")
    ], Order);
    return Order;
}());
exports.Order = Order;
