"use strict";
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
exports.InitialMigration1699631959245 = void 0;
var InitialMigration1699631959245 = /** @class */ (function () {
    function InitialMigration1699631959245() {
        this.name = 'InitialMigration1699631959245';
    }
    InitialMigration1699631959245.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE `permissions` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(255) NOT NULL, `name` varchar(100) NOT NULL, `description` varchar(100) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(255) NOT NULL, `firstName` varchar(100) NOT NULL, `lastName` varchar(100) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `orders` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(255) NOT NULL, `userId` int NOT NULL, `description` varchar(100) NOT NULL, `status` varchar(100) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `user_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `order_products` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(255) NOT NULL, `orderId` int NOT NULL, `productId` int NOT NULL, `quantity` int NOT NULL, `price` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `order_id` int NULL, `product_id` int NULL, PRIMARY KEY (`id`, `orderId`, `productId`)) ENGINE=InnoDB")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `products` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(255) NOT NULL, `name` varchar(100) NOT NULL, `description` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `categories` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(255) NOT NULL, `name` varchar(100) NOT NULL, `description` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `role_permissions` (`role_id` int NOT NULL, `permission_id` int NOT NULL, INDEX `IDX_178199805b901ccd220ab7740e` (`role_id`), INDEX `IDX_17022daf3f885f7d35423e9971` (`permission_id`), PRIMARY KEY (`role_id`, `permission_id`)) ENGINE=InnoDB")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `user_roles` (`user_id` int NOT NULL, `role_id` int NOT NULL, INDEX `IDX_87b8888186ca9769c960e92687` (`user_id`), INDEX `IDX_b23c65e50a758245a33ee35fda` (`role_id`), PRIMARY KEY (`user_id`, `role_id`)) ENGINE=InnoDB")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `product_categories` (`product_id` int NOT NULL, `category_id` int NOT NULL, INDEX `IDX_8748b4a0e8de6d266f2bbc877f` (`product_id`), INDEX `IDX_9148da8f26fc248e77a387e311` (`category_id`), PRIMARY KEY (`product_id`, `category_id`)) ENGINE=InnoDB")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_a922b820eeef29ac1c6800e826a` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `order_products` ADD CONSTRAINT `FK_f258ce2f670b34b38630914cf9e` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `order_products` ADD CONSTRAINT `FK_2d58e8bd11dc840b39f99824d84` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `role_permissions` ADD CONSTRAINT `FK_178199805b901ccd220ab7740ec` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `role_permissions` ADD CONSTRAINT `FK_17022daf3f885f7d35423e9971e` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_87b8888186ca9769c960e926870` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_b23c65e50a758245a33ee35fda1` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `product_categories` ADD CONSTRAINT `FK_8748b4a0e8de6d266f2bbc877f6` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `product_categories` ADD CONSTRAINT `FK_9148da8f26fc248e77a387e3112` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 19:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InitialMigration1699631959245.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE `product_categories` DROP FOREIGN KEY `FK_9148da8f26fc248e77a387e3112`")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `product_categories` DROP FOREIGN KEY `FK_8748b4a0e8de6d266f2bbc877f6`")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_b23c65e50a758245a33ee35fda1`")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_87b8888186ca9769c960e926870`")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `role_permissions` DROP FOREIGN KEY `FK_17022daf3f885f7d35423e9971e`")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `role_permissions` DROP FOREIGN KEY `FK_178199805b901ccd220ab7740ec`")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `order_products` DROP FOREIGN KEY `FK_2d58e8bd11dc840b39f99824d84`")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `order_products` DROP FOREIGN KEY `FK_f258ce2f670b34b38630914cf9e`")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_a922b820eeef29ac1c6800e826a`")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX `IDX_9148da8f26fc248e77a387e311` ON `product_categories`")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX `IDX_8748b4a0e8de6d266f2bbc877f` ON `product_categories`")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `product_categories`")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX `IDX_b23c65e50a758245a33ee35fda` ON `user_roles`")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX `IDX_87b8888186ca9769c960e92687` ON `user_roles`")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `user_roles`")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX `IDX_17022daf3f885f7d35423e9971` ON `role_permissions`")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX `IDX_178199805b901ccd220ab7740e` ON `role_permissions`")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `role_permissions`")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `categories`")];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `products`")];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `order_products`")];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `orders`")];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`")];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `users`")];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `roles`")];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `permissions`")];
                    case 26:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return InitialMigration1699631959245;
}());
exports.InitialMigration1699631959245 = InitialMigration1699631959245;
