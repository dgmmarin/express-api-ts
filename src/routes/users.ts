import { Router, Request, Response } from 'express';
import UserController  from '../controllers/UserController';
import authenticateJWT, { isPublic } from '../middlewares/auth';
import userCreateValidations from '../validators/user';

const router = Router();
const controller = new UserController(); // pass the instance to the userController function

// router.get('/', (req: Request, res: Response) => {
//     res.json({ message: "Hello World" });
// });

router.post('/', isPublic, userCreateValidations, controller.createUser);
router.get('/', authenticateJWT, controller.listUsers);
router.get('/:userId', authenticateJWT, controller.getUser);
router.put('/:userId', authenticateJWT, controller.updateUser);
router.delete('/:userId', authenticateJWT, controller.deleteUser);

export default router;