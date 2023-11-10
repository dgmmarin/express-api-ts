import { Router, Request, Response } from 'express';
import UserController  from '../controllers/UserController';
import authenticateJWT, { isPublic } from '../middlewares/auth';
import userCreateValidations, { userUpdateValidations } from '../validators/user';
import getRequestedUser from '../middlewares/getUserOnRequest';

const router = Router();
const controller = new UserController();

router.get('/', controller.listUsers);
router.get('/:userId', getRequestedUser, controller.getUser);
router.post('/', userCreateValidations, controller.createUser);
router.put('/:userId',userUpdateValidations, getRequestedUser, controller.updateUser);
router.delete('/:userId', getRequestedUser, controller.deleteUser);

export default router;