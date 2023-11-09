import { Request, Response } from 'express';
import { User } from '../database/entities/User';
import { AppDataSource } from '../data-source';
import SanitizedUser from '../serializers/user';
import { plainToClass } from 'class-transformer';
import AuthService from '../auth/Auth';
import { validationResult } from 'express-validator';
import { log, test } from '../auth/decorators';
import { EntityManager, Repository } from 'typeorm';
import { tryCatch } from 'bullmq';


function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class UserController {
    name: string;
    constructor() {
        this.name = "UserController";
    }

    get userRepository():Repository<User>{
        return AppDataSource.getRepository(User);
    }

    get manager():EntityManager{
        return AppDataSource.manager;
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
            const result = await this.manager.save(user);
            res.json(plainToClass(SanitizedUser, result, {}));
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            let user = await this.userRepository.findOneBy({ id: Number(req.params.userId) })
            res.json(plainToClass(SanitizedUser, user, {}));
        } catch (error) {
            res.status(400).json({ message: "User not found" });
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            let user = await this.userRepository.findOneBy({ id: Number(req.params.userId) })
            if (user) {
                const { firstName, lastName, email, password } = req.body;
                user.firstName = firstName ?? user.firstName;
                user.lastName = lastName ?? user.lastName;
                user.email = email ?? user.email;
                const result = await this.manager.save(user);
                res.json(plainToClass(SanitizedUser, result, {}));
            } else {
                res.status(400).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ message: "User not found" });
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            let user = await this.userRepository.findOneByOrFail({ id: Number(req.params.userId) })
            await this.userRepository.softDelete({ id: Number(user.id)});
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: "User not found" });
        }
    }

    @test()
    async listUsers(req: Request, res: Response){
        try {
            let users = await this.userRepository.find()
            let usersForReturn = users.map((user)=> plainToClass(SanitizedUser, user, {}));
            res.json(usersForReturn);
        } catch (error) {
            res.status(400).json({ message: "User not found" });
        }
    };

    getUserByEmail = async (email: string): Promise<User | null> => {
        try {
            let user = await this.userRepository.findOneBy({ email: email })
            return user;
        } catch (error) {
            return null;
        }
    };
};

export default UserController;