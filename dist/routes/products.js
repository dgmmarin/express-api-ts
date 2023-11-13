"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductController_1 = __importDefault(require("../controllers/ProductController"));
var controller = new ProductController_1.default();
var router = (0, express_1.Router)();
router.get('/', controller.listProducts);
router.post('/', controller.createProduct);
router.get('/:productId', controller.getProduct);
router.put('/:productId', controller.updateProduct);
router.delete('/:productId', controller.deleteProduct);
exports.default = router;
