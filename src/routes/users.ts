import { Router, Request, Response } from 'express';
import UserController  from '../controllers/UserController';
import authenticateJWT, { isPublic } from '../middlewares/auth';
import userCreateValidations from '../validators/user';

const router = Router();
const controller = new UserController();

router.post('/', isPublic, userCreateValidations, controller.createUser);
router.get('/', isPublic, controller.listUsers);
router.get('/:userId', controller.getUser);
router.put('/:userId', controller.updateUser);
router.delete('/:userId', controller.deleteUser);

export default router;