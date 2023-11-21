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
import { PaginationResponse } from "../interfaces/generic";
import SanitizedUser from "../serializers/user";
import OrderController from "./OrderController";
import { plainToClass } from "class-transformer";
import SanitizedOrder from "../serializers/order";

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

  getUser = async (userId: string): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneOrFail({
      where: { uuid: userId },
    });
  };

  addRole = async (userId: string, roleId: string): Promise<User> => {
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOneOrFail({
      where: { uuid: roleId },
    });
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: { uuid: userId },
      relations: {
        roles: true,
      },
    });
    user.roles.push(role);
    return await userRepository.save(user);
  };

  removeRole = async (userId: string, roleId: string): Promise<User> => {
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOneOrFail({
      where: { uuid: roleId },
    });
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: { uuid: userId },
      relations: {
        roles: true,
      },
    });
    user.roles = user.roles.filter((userRole) => userRole.id !== role.id);
    return await userRepository.save(user);
  };

  updateUser = async (
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: { uuid: userId },
      relations: {
        roles: true,
      },
    });
    user.firstName = updateUserDto?.firstName ?? user.firstName;
    user.lastName = updateUserDto?.lastName ?? user.lastName;
    user.email = updateUserDto?.email ?? user.email;
    return await userRepository.save(user);
  };

  deleteUser = async (userId: string): Promise<UpdateResult> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({ where: { uuid: userId } });
    return await userRepository.softDelete({ id: user.id });
  };

  listUsers = async (offset: number, limit: number): Promise<PaginationResponse<SanitizedUser>> => {
    const userRepository = AppDataSource.getRepository(User);
    const count = await userRepository.count({ withDeleted: false });
    const pages = Math.ceil(count / limit);
    const users = await userRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.roles", "role")
      .limit(limit)
      .offset(offset)
      .orderBy("user.id", "DESC")
      .getMany();
    const usersForReturn = users.map((user) =>
      new SanitizedUser(user),
    );

    return <PaginationResponse<SanitizedUser>>{
      data: usersForReturn,
      meta: {
        limit: limit,
        offset: offset,
        page: Math.ceil(offset / limit) + 1,
        total: count,
        pages: pages,
      },
    };
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

  listOrders = async (userId: string, limit: number, offset: number): Promise<PaginationResponse<SanitizedOrder>> => {
    const orderController = new OrderController();
    const orders = await orderController.listOrders(offset, limit, userId);
    const sanitizedOrders = orders.data.map((order) => {
      const _order = plainToClass(SanitizedOrder, <Order>order)
      _order.user = plainToClass(SanitizedUser, <User>order.user)
      return _order
    });
    orders.data = sanitizedOrders;
    return orders as PaginationResponse<SanitizedOrder>;
  };

  getOrder = async (userUuid: string, orderUuid: string): Promise<SanitizedOrder> => {
    const user = await AppDataSource.createQueryBuilder(User, "usr")
      .leftJoinAndSelect("usr.orders", "order")
      .leftJoinAndSelect("order.user", "user", "usr.uuid = :uuid", { uuid: userUuid })
      .where("usr.uuid = :uuid", { uuid: userUuid })
      .andWhere("order.uuid = :orderUuid", { orderUuid: orderUuid })
      .getOneOrFail();
    const order = plainToClass(SanitizedOrder, user.orders[0]);
    order.user = plainToClass(SanitizedUser, order.user);
    return order;
  };
}


