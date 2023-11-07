import { Request, Response } from 'express';
import { User } from '../database/entities/User';
import { AppDataSource } from '../data-source';
import SanitizedUser from '../serializers/user';
import { plainToClass } from 'class-transformer';
import AuthService from '../auth/Auth';
import { validationResult } from 'express-validator';
import { log, test } from '../auth/decorators';



class UserController {
    createUser = async (req: Request, res: Response) => {
        try {
            const vr = validationResult(req);
            if (!vr.isEmpty()) {
                return res.status(400).json({ errors: vr.array() });
            }
            const { firstName, lastName, email, password } = req.body;
            const user = new User();
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.password = AuthService.hashPassword(password);
            const result = await AppDataSource.manager.save(user);
            res.json(plainToClass(SanitizedUser, result, {}));
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    getUser = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User)
        try {
            let user = await userRepository.findOneBy({ id: Number(req.params.userId) })
            res.json(plainToClass(SanitizedUser, user, {}));
        } catch (error) {
            res.status(400).json({ message: "User not found" });
        }
    }

    updateUser = (req: Request, res: Response) => {

    }

    deleteUser = (req: Request, res: Response) => {

    }

    listUsers = (req: Request, res: Response) => {

    };

    getUserByEmail = async (email: string): Promise<User | null> => {
        const userRepository = AppDataSource.getRepository(User)
        try {
            let user = await userRepository.findOneBy({ email: email })
            return user;
        } catch (error) {
            return null;
        }
    };
};

export default UserController;