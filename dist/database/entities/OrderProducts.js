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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProducts = void 0;
var typeorm_1 = require("typeorm");
var Order_1 = require("./Order");
var Product_1 = __importDefault(require("./Product"));
var OrderProducts = /** @class */ (function () {
    function OrderProducts() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], OrderProducts.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], OrderProducts.prototype, "uuid", void 0);
    __decorate([
        (0, typeorm_1.PrimaryColumn)({ nullable: false }),
        __metadata("design:type", Number)
    ], OrderProducts.prototype, "orderId", void 0);
    __decorate([
        (0, typeorm_1.PrimaryColumn)({ nullable: false }),
        __metadata("design:type", Number)
    ], OrderProducts.prototype, "productId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", Number)
    ], OrderProducts.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", Number)
    ], OrderProducts.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], OrderProducts.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], OrderProducts.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", Date)
    ], OrderProducts.prototype, "deletedAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Order_1.Order; }, function (order) { return order.orderProducts; }),
        (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
        __metadata("design:type", Order_1.Order)
    ], OrderProducts.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Product_1.default; }, function (product) { return product.orderProducts; }),
        (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
        __metadata("design:type", Product_1.default)
    ], OrderProducts.prototype, "product", void 0);
    OrderProducts = __decorate([
        (0, typeorm_1.Entity)("order_products")
    ], OrderProducts);
    return OrderProducts;
}());
exports.OrderProducts = OrderProducts;
