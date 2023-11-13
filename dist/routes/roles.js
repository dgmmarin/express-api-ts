"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var RoleController_1 = __importDefault(require("../controllers/RoleController"));
var controller = new RoleController_1.default();
var router = (0, express_1.Router)();
router.get('/', controller.listRoles);
router.post('/', controller.createRole);
router.get('/:roleId', controller.getRole);
router.put('/:roleId', controller.updateRole);
router.delete('/:roleId', controller.deleteRole);
router.post('/:roleId/permissions/:permissionId', controller.addPermission);
exports.default = router;
