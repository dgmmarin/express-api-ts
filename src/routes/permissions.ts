import { Router } from "express";
import authenticateJWT from "../middlewares/auth";
import PermissionController from "../controllers/PermissionController";

const controller = new PermissionController();
const router = Router();
router.get('/', controller.listPermissions);
router.post('/', controller.createPermission);
router.get('/:permissionId', controller.getPermission);
router.put('/:permissionId', controller.updatePermission);
router.delete('/:permissionId', controller.deletePermission);

export default router;