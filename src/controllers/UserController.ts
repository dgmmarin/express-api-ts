import { Request, Response } from 'express';
import { User } from '../database/entities/User';
import { AppDataSource } from '../data-source';
import SanitizedUser from '../serializers/user';
import { plainToClass } from 'class-transformer';
import AuthService from '../auth/Auth';
import { validationResult } from 'express-validator';
import { log, test } from '../auth/decorators';
import { EntityManager, Repository } from 'typeorm';
import { Queue, tryCatch } from 'bullmq';
import { CustomRequest } from '../middlewares/auth';


function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

class UserController {
    name: string;
    constructor() {
        this.name = "UserController";
    }

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
            res.json(plainToClass(SanitizedUser, result));
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    getUser(req: Request, res: Response) {
        try {
            let user = (req as CustomRequest)['user'];
            res.json(plainToClass(SanitizedUser, user, {}));
        } catch (error) {
            res.status(400).json({ message: "User not found" });
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const vr = validationResult(req);
            if (!vr.isEmpty()) {
                return res.status(400).json({ errors: vr.array() });
            }
            let user = (req as CustomRequest)['user'];
            const { firstName, lastName, email } = req.body;
            user.firstName = firstName ?? user.firstName;
            user.lastName = lastName ?? user.lastName;
            user.email = email ?? user.email;
            let userRepository = AppDataSource.getRepository(User);
            const result = await userRepository.save(user);
            res.json(plainToClass(SanitizedUser, result));
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }



    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            let userRepository = AppDataSource.getRepository(User);
            let user = await userRepository.findOneByOrFail({ id: Number(req.params.userId) })
            await userRepository.softDelete({ id: Number(user.id) });
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: "User not found" });
        }
    }

    @test()
    async listUsers(req: Request, res: Response) {
        try {
            let userRepository = AppDataSource.getRepository(User);
            let users = await userRepository.find();
            let usersForReturn = users.map((user) => plainToClass(SanitizedUser, user));
            res.json(usersForReturn);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Users not found" });
        }
    };

    getUserByEmail = async (email: string): Promise<User | null> => {
        try {
            let userRepository = AppDataSource.getRepository(User);
            let user = await userRepository.findOneBy({ email: email })
            return user;
        } catch (error) {
            return null;
        }
    };
};

export default UserController;