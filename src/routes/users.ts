import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { validateUserCreate, validateUserUpdate } from '../validators/user';
import { UserHandler } from '../handlers/userHandler';

const router = Router();
const controller = new UserHandler();
router.get('/:userId', controller.getUser);
router.get('/', controller.listUsers);
router.get('/:userId', controller.getUser);
router.post('/', validateUserCreate, controller.createUser);
router.put('/:userId', validateUserUpdate, controller.updateUser);
router.delete('/:userId', controller.deleteUser);
router.post('/:userId/roles/:roleId', controller.addRole);
router.delete('/:userId/roles/:roleId', controller.removeRole);
router.get('/:userId/orders', controller.listOrders);
export default router;