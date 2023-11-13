"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var OrderController_1 = __importDefault(require("../controllers/OrderController"));
var controller = new OrderController_1.default();
var router = (0, express_1.Router)();
router.get('/', controller.listOrders);
router.post('/', controller.createOrder);
router.get('/:orderId', controller.getOrder);
router.put('/:orderId', controller.updateOrder);
router.delete('/:orderId', controller.deleteOrder);
exports.default = router;
