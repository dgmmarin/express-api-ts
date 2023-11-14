import { User } from '../database/entities/User';
import { AppDataSource } from '../data-source';
import AuthService from '../auth/Auth';
import { Role } from '../database/entities/Role';
import { Order } from '../database/entities/Order';
import { Process } from '../interfaces/process';
import QueueWorker from '../components/services/queue';
import {App} from '../index';

class UserController {
    name: string;
    app: Process;
    queue: QueueWorker;
    constructor() {
        this.name = "UserController";
    }

    createUser = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ): Promise<User> => {
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = AuthService.hashPassword(password);
        let _user = await AppDataSource.manager.save(user);
        await (App.services['queue'] as QueueWorker).getEmailsQueue().add('sendEmail', {"emailJob": "userAdded", "user":_user} )
        return _user;
    }

    getUser = async (userId: number): Promise<User> => {
        let userRepository = AppDataSource.getRepository(User);
        return await userRepository.findOneOrFail({
            where: { id: userId },
            relations: ['roles', 'orders']
        })
    }

    addRole = async (userId: number, roleId: number): Promise<User> => {
        let roleRepository = AppDataSource.getRepository(Role);
        let role = await roleRepository.findOneOrFail({
            where: { id: roleId },
        });
        let userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOneOrFail({
            where: { id: userId },
            relations: {
                roles: true,
            }
        });
        user.roles.push(role);
        return await userRepository.save(user);
    }

    removeRole = async (userId: number, roleId: number): Promise<User> => {
        let roleRepository = AppDataSource.getRepository(Role);
        let role = await roleRepository.findOneOrFail({
            where: { id: roleId },
        });
        let userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOneOrFail({
            where: { id: userId },
            relations: {
                roles: true,
            }
        });
        user.roles = user.roles.filter((userRole) => userRole.id !== role.id);
        return await userRepository.save(user);
    }

    updateUser = async (userId: number, firstName: string, lastName: string, email: string): Promise<User> => {
        let userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOneOrFail({
            where: { id: userId },
            relations: {
                roles: true,
            }
        });
        user.firstName = firstName ?? user.firstName;
        user.lastName = lastName ?? user.lastName;
        user.email = email ?? user.email;
        return await userRepository.save(user);
    }


    deleteUser = async (userId: number): Promise<void> => {
        let userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOneOrFail({ where: { id: userId } })
        await userRepository.softDelete({ id: user.id });
    }

    listUsers = async (): Promise<User[]> => {
        console.log("Listing users");
        let userRepository = AppDataSource.getRepository(User);
        return await userRepository.find();
    };

    getUserByEmail = async (email: string): Promise<User | null> => {
        try {
            let userRepository = AppDataSource.getRepository(User);
            let user = await userRepository.findOneOrFail({ where: { email: email }, relations: ['roles'] })
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    listOrders = async (userId: number): Promise<Order[]> => {
        const userRepository = AppDataSource.getRepository(User);
        return (await userRepository.findOneOrFail({ where: { id: Number(userId) }, relations: ['orders'] })).orders;
    }
};

export default UserController;