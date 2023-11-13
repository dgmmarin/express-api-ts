import { Router } from "express";
import authenticateJWT from "../middlewares/auth";
import RoleController from "../controllers/RoleController";

const controller = new RoleController();
const router = Router();
router.get('/', controller.listRoles);
router.post('/', controller.createRole);
router.get('/:roleId', controller.getRole);
router.put('/:roleId', controller.updateRole);
router.delete('/:roleId', controller.deleteRole);
router.post('/:roleId/permissions/:permissionId', controller.addPermission);
export default router;
