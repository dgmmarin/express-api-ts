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
var typeorm_1 = require("typeorm");
var Category_1 = require("./Category");
var uuid_1 = require("uuid");
var OrderProducts_1 = require("./OrderProducts");
var Product = /** @class */ (function () {
    function Product() {
    }
    Product.prototype.addUuid = function () {
        this.uuid = (0, uuid_1.v4)();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Product.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], Product.prototype, "uuid", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Product.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Product.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Product.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Product.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", Date)
    ], Product.prototype, "deletedAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Category_1.Category; }, function (category) { return category.products; }),
        (0, typeorm_1.JoinTable)({
            name: "product_categories",
            joinColumn: { name: "product_id", referencedColumnName: "id" },
            inverseJoinColumn: { name: "category_id", referencedColumnName: "id" }
        }),
        __metadata("design:type", Array)
    ], Product.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return OrderProducts_1.OrderProducts; }, function (orderProduct) { return orderProduct.product; }),
        __metadata("design:type", Array)
    ], Product.prototype, "orderProducts", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Product.prototype, "addUuid", null);
    Product = __decorate([
        (0, typeorm_1.Entity)("products")
    ], Product);
    return Product;
}());
exports.default = Product;
