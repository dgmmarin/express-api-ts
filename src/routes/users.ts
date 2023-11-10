import { Router, Request, Response } from 'express';
import UserController  from '../controllers/UserController';
import authenticateJWT, { isPublic } from '../middlewares/auth';
import userCreateValidations from '../validators/user';
import getRequestedUser from '../middlewares/getUserOnRequest';

const router = Router();
const controller = new UserController();

router.post('/', isPublic, userCreateValidations, controller.createUser);
router.get('/', isPublic, controller.listUsers);
router.get('/:userId', getRequestedUser, controller.getUser);
router.put('/:userId', getRequestedUser, controller.updateUser);
router.delete('/:userId', getRequestedUser, controller.deleteUser);

export default router;