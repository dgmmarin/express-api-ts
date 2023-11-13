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
exports.Category = void 0;
var typeorm_1 = require("typeorm");
var Product_1 = __importDefault(require("./Product"));
var uuid_1 = require("uuid");
var Category = /** @class */ (function () {
    function Category() {
    }
    Category.prototype.addUuid = function () {
        this.uuid = (0, uuid_1.v4)();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Category.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], Category.prototype, "uuid", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Category.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Category.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Category.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Category.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", Date)
    ], Category.prototype, "deletedAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Product_1.default; }, function (product) { return product.category; }),
        __metadata("design:type", Array)
    ], Category.prototype, "products", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Category.prototype, "addUuid", null);
    Category = __decorate([
        (0, typeorm_1.Entity)("categories")
    ], Category);
    return Category;
}());
exports.Category = Category;
