import { HasRole, Roles } from "../auth/decorators";
import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { plainToClass } from 'class-transformer';
import SanitizedUser from "../serializers/user";
import { User } from "../database/entities/User";
import UserController from "../controllers/UserController";

export class UserHandler {
    controller: UserController
    constructor() {
        this.controller = new UserController();
    }

    @Roles(['admin'])
    async createUser(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password } = req.body;
            let user = await this.controller.createUser(firstName, lastName, email, password);
            res.json(plainToClass(SanitizedUser, user));
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    @Roles(['admin', 'user'])
    async getUser(req: Request, res: Response) {
        try {
            let userRepository = AppDataSource.getRepository(User);
            let user = await userRepository.findOneOrFail({
                where: { id: Number(req.params.userId) },
                relations: ['roles', 'orders']
            })
            res.json(plainToClass(SanitizedUser, user, {}));
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    @HasRole('admin')
    async addRole(req: Request, res: Response) {
        try {
            let user = this.controller.addRole(Number(req.params.userId), Number(req.params.roleId));
            return res.json(plainToClass(SanitizedUser, user, {}));
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    @HasRole('admin')
    async removeRole(req: Request, res: Response) {
        try {
           let user = this.controller.removeRole(Number(req.params.userId), Number(req.params.roleId));
            return res.json(plainToClass(SanitizedUser, user, {}));
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    @Roles(['admin'])
    async updateUser(req: Request, res: Response) {
        try {
            let { firstName, lastName, email } = req.body;
            let result = await this.controller.updateUser(
                Number(req.params.userId),
                firstName,
                lastName,
                email
            );
            res.json(plainToClass(SanitizedUser, result));
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    @Roles(['admin'])
    async deleteUser(req: Request, res: Response) {
        try {
            await this.controller.deleteUser(Number(req.params.userId));
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: "User not found" });
        }
    }

    // @Roles(['admin'])
    listUsers = async (req: Request, res: Response) =>{
        try {
            console.log(this.controller);
            let users = await this.controller.listUsers();
            console.log(users);
            let usersForReturn = users.map((user) => plainToClass(SanitizedUser, user));
            res.json(usersForReturn);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Users not found" });
        }
    };

    getUserByEmail = async (email: string): Promise<User | null> => {
        try {
            let user = await this.controller.getUserByEmail(email);
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    async listOrders(req: Request, res: Response) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const { userId } = req.params; 
            let orders = await this.controller.listOrders(Number(userId));
            res.json(orders);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}