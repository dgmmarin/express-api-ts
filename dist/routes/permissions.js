"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PermissionController_1 = __importDefault(require("../controllers/PermissionController"));
var controller = new PermissionController_1.default();
var router = (0, express_1.Router)();
router.get('/', controller.listPermissions);
router.post('/', controller.createPermission);
router.get('/:permissionId', controller.getPermission);
router.put('/:permissionId', controller.updatePermission);
router.delete('/:permissionId', controller.deletePermission);
exports.default = router;
