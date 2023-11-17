import { User } from "../database/entities/User";
import { AppDataSource } from "../data-source";
import AuthService from "../auth/Auth";
import { Role } from "../database/entities/Role";
import { Order } from "../database/entities/Order";
import { Process } from "../interfaces/process";
import QueueWorker from "../components/services/queue";
// import { App } from "../index";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { UpdateResult } from "typeorm";

export default class UserController {
  name: string;
  app: Process;
  queue: QueueWorker;

  constructor() {
    this.name = "UserController";
  }

  createUser = async (usr: CreateUserDto): Promise<User> => {
    const user = new User();
    user.firstName = usr.firstName;
    user.lastName = usr.lastName;
    user.email = usr.email;
    user.password = AuthService.hashPassword(usr.password);
    const _user = await AppDataSource.manager.save(user);
    // await (App.services["queue"] as QueueWorker)
    //   .getEmailsQueue()
    //   .add("sendEmail", { emailJob: "userAdded", user: _user });
    return _user;
  };

  getUser = async (userId: number): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneOrFail({
      where: { id: userId },
      relations: ["roles", "orders"],
    });
  };

  addRole = async (userId: number, roleId: number): Promise<User> => {
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOneOrFail({
      where: { id: roleId },
    });
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: { id: userId },
      relations: {
        roles: true,
      },
    });
    user.roles.push(role);
    return await userRepository.save(user);
  };

  removeRole = async (userId: number, roleId: number): Promise<User> => {
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOneOrFail({
      where: { id: roleId },
    });
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: { id: userId },
      relations: {
        roles: true,
      },
    });
    user.roles = user.roles.filter((userRole) => userRole.id !== role.id);
    return await userRepository.save(user);
  };

  updateUser = async (
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: { id: userId },
      relations: {
        roles: true,
      },
    });
    user.firstName = updateUserDto?.firstName ?? user.firstName;
    user.lastName = updateUserDto?.lastName ?? user.lastName;
    user.email = updateUserDto?.email ?? user.email;
    return await userRepository.save(user);
  };

  deleteUser = async (userId: number): Promise<UpdateResult> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({ where: { id: userId } });
    return await userRepository.softDelete({ id: user.id });
  };

  listUsers = async (): Promise<User[]> => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.find({ relations: ["roles"] });
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneOrFail({
        where: { email: email },
        relations: ["roles"],
      });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  listOrders = async (userId: string): Promise<Order[]> => {
    const userRepository = AppDataSource.getRepository(User);
    return (
      await userRepository.findOneOrFail({
        where: { uuid: userId },
        relations: ["orders"],
      })
    ).orders;
  };

  getOrder = async (userUuid: string, orderUuid: string): Promise<Order> => {
    const user = await AppDataSource.createQueryBuilder(User, "user")
      .leftJoinAndSelect("user.orders", "order")
      .where("user.uuid = :uuid", { uuid: userUuid })
      .andWhere("order. = :orderUuid", { orderUuid: orderUuid })
      .getOneOrFail();
    return user.orders[0];
  };
}


