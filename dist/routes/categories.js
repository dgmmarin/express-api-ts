"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
var controller = new CategoryController_1.default();
var router = (0, express_1.Router)();
router.get('/', controller.listCategories);
router.post('/', controller.createCategory);
router.get('/:categoryId', controller.getCategory);
router.put('/:categoryId', controller.updateCategory);
router.delete('/:categoryId', controller.deleteCategory);
exports.default = router;
